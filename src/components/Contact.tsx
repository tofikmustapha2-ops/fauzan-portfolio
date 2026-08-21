import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { ContactFormData, ServiceType } from '../types';

interface ContactProps {
  selectedService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  onOpenOwnerGuide: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  selectedService,
  onServiceChange,
  onOpenOwnerGuide,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: selectedService,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  // Keep internal service synced with prop when requested from service card
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setResponseMsg('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('loading');
    setResponseMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setResponseMsg(data.message || "Thank you! Your message has been sent successfully. I'll get back to you soon.");
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Flyer & Poster Design',
          message: '',
        });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'There was an issue sending your message. Please try again or reach out on WhatsApp.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setResponseMsg('Network connection error. Please verify your connection or contact me directly on WhatsApp.');
    }
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || 'YOUR_WHATSAPP_NUMBER';

  const handleWhatsAppDirect = () => {
    if (whatsappNumber === 'YOUR_WHATSAPP_NUMBER') {
      onOpenOwnerGuide();
    } else {
      const text = encodeURIComponent(
        `Hello Adam, my name is ${formData.name || 'a prospective client'}. I would like to discuss ${formData.service || 'a design project'} with you.`
      );
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let’s Build Something Great for Your Business
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Have a question, need a promotional flyer, social media graphics, or a simple business website? Send a message below or chat directly on WhatsApp.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Adam Suhuyini Fauzan</h3>
                <p className="text-xs text-emerald-400 font-medium">Digital Designer & Skills Student</p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 pt-2">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Location:</p>
                    <p className="text-sm font-semibold text-white">Tamale, Ghana</p>
                    <span className="text-[11px] text-slate-400">Northern Region</span>
                  </div>
                </div>

                {/* Email Info */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Direct Email:</p>
                    <p className="text-sm font-semibold text-white">
                      YOUR_EMAIL@example.com
                    </p>
                    <button
                      onClick={onOpenOwnerGuide}
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Click to see how to replace with your real email</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Info */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">WhatsApp / Phone:</p>
                    <p className="text-sm font-semibold text-white">
                      {whatsappNumber === 'YOUR_WHATSAPP_NUMBER' ? 'YOUR_WHATSAPP_NUMBER' : whatsappNumber}
                    </p>
                    <span className="text-[11px] text-slate-400">Fastest response for quotes & inquiries</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Response Time:</p>
                    <p className="text-sm font-semibold text-white">Usually within a few hours</p>
                    <span className="text-[11px] text-slate-400">Monday to Saturday</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  id="direct-whatsapp-contact-btn"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat With Me on WhatsApp</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Preferred for quick local inquiries in Tamale
                </p>
              </div>
            </div>

            {/* Privacy & Trust Badge */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Your message is sent securely. No spam, just honest project discussions.
              </span>
            </div>
          </div>

          {/* Right Column: Active Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Send Me a Direct Message</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the details below, and your request will be delivered directly to my inbox.
              </p>

              {/* Success Notification */}
              {status === 'success' && (
                <div
                  id="contact-success-alert"
                  className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3 animate-fadeIn"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{responseMsg}</p>
                    <p className="text-xs text-emerald-400/80 mt-1">
                      I have received your details and will review your request promptly.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {status === 'error' && (
                <div
                  id="contact-error-alert"
                  className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3 animate-fadeIn"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Notice</p>
                    <p className="text-xs text-rose-300/90 mt-0.5">{responseMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" id="portfolio-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ibrahim Mohammed"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@gmail.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp Input */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 054 XXX XXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Service Needed Dropdown (strictly the 3 services only) */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Service Needed <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    >
                      <option value="Flyer & Poster Design">Flyer & Poster Design</option>
                      <option value="Social Media Graphics">Social Media Graphics</option>
                      <option value="Simple Business Website">Simple Business Website</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message / Project Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about your business and what you would like to design (e.g. A grand opening flyer for my barbering salon in Tamale)..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  id="submit-contact-btn"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-emerald-500/20"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
