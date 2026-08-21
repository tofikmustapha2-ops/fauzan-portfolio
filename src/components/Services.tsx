import React from 'react';
import { Layers, Image as ImageIcon, Share2, Globe, ArrowRight, Check, Sparkles } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const servicesList: {
    id: ServiceType;
    title: string;
    icon: React.ReactNode;
    subtitle: string;
    description: string;
    items: string[];
    idealFor: string;
    accentBg: string;
    accentBorder: string;
    iconBg: string;
    tag: string;
  }[] = [
    {
      id: 'Flyer & Poster Design',
      title: 'Flyer & Poster Design',
      icon: <ImageIcon className="w-6 h-6 text-amber-400" />,
      subtitle: 'Print & Digital Marketing Designs',
      description: 'I create attractive flyers, posters, promotional graphics, event flyers, business advertisements, and other marketing designs for local businesses.',
      items: [
        'Grand opening & anniversary flyers',
        'Restaurant food & weekend special menus',
        'Barbershop & salon grooming posters',
        'Sales discount & promotion adverts',
        'High-resolution print-ready files (A4 / A5)',
      ],
      idealFor: 'Salons, food joints, phone shops, churches & local events',
      accentBg: 'from-amber-500/10 via-slate-900 to-slate-950',
      accentBorder: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      tag: 'Print & Social',
    },
    {
      id: 'Social Media Graphics',
      title: 'Social Media Graphics',
      icon: <Share2 className="w-6 h-6 text-emerald-400" />,
      subtitle: 'WhatsApp Status, Instagram & Facebook Graphics',
      description: 'I create graphics that businesses can use on WhatsApp, Facebook, Instagram, and other social-media platforms to promote their products and services.',
      items: [
        'WhatsApp status promo graphics (9:16 vertical)',
        'Instagram & Facebook square posts (1:1)',
        'Product price slash & flash sale flyers',
        'New arrival & lookbook social cards',
        'Consistent colors and readable phone text',
      ],
      idealFor: 'Boutiques, tailors, tech stores & delivery businesses',
      accentBg: 'from-emerald-500/10 via-slate-900 to-slate-950',
      accentBorder: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      tag: 'High Engagement',
    },
    {
      id: 'Simple Business Website',
      title: 'Simple Business Websites',
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      subtitle: 'Fast, Mobile-Friendly One-Page Websites',
      description: 'I create clean, mobile-friendly one-page websites for small businesses such as barbering salons, hairdressers, fashion designers, restaurants, shops, tailors, and other local businesses.',
      items: [
        'Clean single-page responsive design',
        'Tap-to-call & WhatsApp booking integration',
        'Service menu with prices in Ghana Cedis (GH₵)',
        'Photo gallery & location map guidance',
        'Optimized for fast mobile loading on phone data',
      ],
      idealFor: 'Barbers, hairdressers, restaurants, tailors & shops',
      accentBg: 'from-blue-500/10 via-slate-900 to-slate-950',
      accentBorder: 'hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      tag: 'Online Presence',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-950 text-white relative">
      {/* Background Decor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>My Core Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Digital Services for Local Businesses
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Simple, focused, and affordable digital solutions designed to help your brand stand out in Tamale and beyond.
          </p>
        </div>

        {/* 3 Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${index + 1}`}
              className={`rounded-2xl bg-gradient-to-b ${service.accentBg} p-6 sm:p-8 border border-slate-800 ${service.accentBorder} transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 relative group`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-xl border ${service.iconBg}`}>
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-emerald-400/90 mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    What is Included:
                  </p>
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal For */}
                <div className="mb-6 p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400">
                  <strong className="text-slate-300">Great for: </strong> {service.idealFor}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service.id)}
                id={`request-service-btn-${index + 1}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 hover:border-emerald-400 transition-all duration-200 group-hover:shadow-md"
              >
                <span>Request This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Note Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center max-w-2xl mx-auto text-xs text-slate-400">
          Need something custom for your shop or brand? Reach out and let’s discuss what fits your budget in Ghana Cedis (GH₵).
        </div>

      </div>
    </section>
  );
};
