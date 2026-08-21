import React from 'react';
import { X, Mail, Phone, Image, Globe, CheckSquare, Sparkles, Terminal, Copy, Check } from 'lucide-react';

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 text-white max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Owner Setup & Customization Guide</h3>
              <p className="text-xs text-slate-400">Step-by-step instructions for Adam Suhuyini Fauzan to configure this portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Tabs / Scrollable Guide */}
        <div className="p-6 overflow-y-auto space-y-8 text-sm leading-relaxed">
          
          {/* Section 1: Replace Email */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Mail className="w-4 h-4" />
              <span>1. How to Connect Contact Form to Your Real Email Inbox</span>
            </div>
            <p className="text-xs text-slate-300">
              In your <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">.env</code> file (or host environment variables), set your real email address:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <code>CONTACT_RECEIVER_EMAIL="yourname@gmail.com"</code>
              <button
                onClick={() => copyToClipboard('CONTACT_RECEIVER_EMAIL="yourname@gmail.com"', 'env-email')}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                title="Copy"
              >
                {copiedKey === 'env-email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <p><strong>To enable real automated delivery via Gmail / SMTP:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Go to Google Account Security &gt; 2-Step Verification &gt; App Passwords.</li>
                <li>Generate a 16-character App Password (e.g. <code>abcd efgh ijkl mnop</code>).</li>
                <li>Fill in <code>SMTP_HOST="smtp.gmail.com"</code>, <code>SMTP_USER="yourname@gmail.com"</code>, and <code>SMTP_PASS="your_16_char_app_password"</code>.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Replace WhatsApp Number */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Phone className="w-4 h-4" />
              <span>2. How to Set Your Real WhatsApp Number</span>
            </div>
            <p className="text-xs text-slate-300">
              In <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">.env</code> (or in your host environment settings):
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <code>VITE_WHATSAPP_NUMBER="233XXXXXXXXX"</code>
              <button
                onClick={() => copyToClipboard('VITE_WHATSAPP_NUMBER="233XXXXXXXXX"', 'env-wa')}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                title="Copy"
              >
                {copiedKey === 'env-wa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Use the Ghana international format starting with <code>233</code> without the <code>+</code> sign or leading zero (e.g., <code>233241234567</code>).
            </p>
          </div>

          {/* Section 3: Replace Sample Work with Real Work */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Image className="w-4 h-4" />
              <span>3. How to Update or Add Portfolio Projects</span>
            </div>
            <p className="text-xs text-slate-300">
              Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">/src/data/portfolioData.ts</code>.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-1">
              <li>Each project in <code>PORTFOLIO_ITEMS</code> has a title, image URL, shortDescription, fullDescription, and tags.</li>
              <li>You can drop your flyer photos or export images into <code className="bg-slate-800 px-1 text-slate-300">/public/images/</code> and change the <code>image: '/images/my-flyer.png'</code> path.</li>
              <li>When you complete real client work, you can update the status or title accordingly!</li>
            </ul>
          </div>

          {/* Section 4: Pre-Launch Checklist */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckSquare className="w-4 h-4" />
              <span>4. Launch Checklist Before Sharing With Clients</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Replace <code>YOUR_EMAIL@example.com</code> with your personal or business email</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Replace <code>YOUR_WHATSAPP_NUMBER</code> with your active Ghana WhatsApp number</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Test sending a sample message through the contact form to confirm delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Add your own designed flyers or project screenshots to <code>/src/data/portfolioData.ts</code></span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Got it, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
