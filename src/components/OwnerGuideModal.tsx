import React from 'react';
import { X, Mail, Phone, Image, Globe, CheckSquare, Sparkles, Terminal, Copy, Check, Lock, Edit3 } from 'lucide-react';

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
              <span>1. Configured Email Address (suhuyinifauzanadam@gmail.com)</span>
            </div>
            <p className="text-xs text-slate-300">
              Your contact form is already configured to deliver directly to your email. In your <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">.env</code> file:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <code>CONTACT_RECEIVER_EMAIL="suhuyinifauzanadam@gmail.com"</code>
              <button
                onClick={() => copyToClipboard('CONTACT_RECEIVER_EMAIL="suhuyinifauzanadam@gmail.com"', 'env-email')}
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
                <li>Fill in <code>SMTP_HOST="smtp.gmail.com"</code>, <code>SMTP_USER="suhuyinifauzanadam@gmail.com"</code>, and <code>SMTP_PASS="your_16_char_app_password"</code>.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: WhatsApp & Call Number */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Phone className="w-4 h-4" />
              <span>2. Active WhatsApp & Phone (0204328042)</span>
            </div>
            <p className="text-xs text-slate-300">
              Configured in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">.env</code>:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <code>VITE_WHATSAPP_NUMBER="233204328042"</code>
              <button
                onClick={() => copyToClipboard('VITE_WHATSAPP_NUMBER="233204328042"', 'env-wa')}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                title="Copy"
              >
                {copiedKey === 'env-wa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Users can call <code>0204328042</code> directly or tap the WhatsApp button to chat instantly.
            </p>
          </div>

          {/* Section 3: Owner Picture, Logo & Passcode Customization */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Edit3 className="w-4 h-4" />
              <span>3. Live Profile Picture, Logo & Passcode Customization (Owner Portal)</span>
            </div>
            <p className="text-xs text-slate-300">
              Your visitors can freely read and browse your whole website without any password. When YOU want to customize your profile picture, brand logo, replace pictures, or change your passcode:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-1">
              <li>Click the small <strong>Lock icon</strong> hidden in the navbar or at the bottom of the page.</li>
              <li>Enter your 4-digit PIN (default is <code>1234</code>) to unlock Owner Mode.</li>
              <li>Click <strong>Profile Photo & Info</strong> (or the camera button on your About profile photo) to upload your personal picture from your phone/computer or paste an image URL.</li>
              <li>Upload your own custom logo graphic, switch gradient monogram styles, change your 4-digit passcode PIN, or modify your bio.</li>
              <li>Click <strong>Edit Picture & Details</strong> on any portfolio card to upload a new picture directly from your phone/computer or paste an image URL.</li>
              <li>Click <strong>+ Add Project</strong> to add new design samples to your showcase anytime.</li>
              <li>Changes are automatically saved to your browser. Click <strong>Lock</strong> when you are done.</li>
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
                <span>Contact email set to <code>suhuyinifauzanadam@gmail.com</code></span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>WhatsApp and direct call set to <code>0204328042</code></span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Public visitors can freely browse and read all sections</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded accent-emerald-500" readOnly />
                <span>Owner picture editing secured with PIN</span>
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
