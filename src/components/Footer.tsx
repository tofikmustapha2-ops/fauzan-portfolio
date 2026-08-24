import React from 'react';
import { ArrowUp, Heart, MapPin, Phone, Mail, Lock, Unlock, ShieldCheck, KeyRound } from 'lucide-react';

interface FooterProps {
  onOpenOwnerGuide: () => void;
  isOwnerMode?: boolean;
  onOpenOwnerLogin?: () => void;
  onLock?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOwnerGuide,
  isOwnerMode = false,
  onOpenOwnerLogin,
  onLock,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                AF
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Adam Suhuyini Fauzan
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Digital skills student and beginner digital designer dedicated to creating attractive promotional flyers, social media graphics, and clean 1-page websites for local businesses in Tamale, Ghana.
            </p>
            <div className="flex flex-col gap-1.5 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Tamale, Northern Region, Ghana</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:0204328042" className="hover:text-emerald-400">0204328042 (WhatsApp / Call)</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <a href="mailto:suhuyinifauzanadam@gmail.com" className="hover:text-emerald-400">suhuyinifauzanadam@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">My 3 Services</a></li>
              <li><a href="#portfolio" className="hover:text-emerald-400 transition-colors">Sample Projects</a></li>
              <li><a href="#why-me" className="hover:text-emerald-400 transition-colors">Why Work With Me</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Form</a></li>
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Offerings</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Flyer & Poster Design</li>
              <li>• Social Media Graphics</li>
              <li>• Simple Business Websites</li>
            </ul>

            <div className="pt-3 border-t border-slate-900">
              <button
                onClick={onOpenOwnerGuide}
                className="text-[11px] text-slate-500 hover:text-slate-300 hover:underline inline-flex items-center gap-1"
              >
                Owner Guide & Setup
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Discreet Owner Entry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-center sm:text-left">
            <span>© 2026 Adam Suhuyini Fauzan. All rights reserved.</span>
            
            {/* Hidden / Discreet Owner Lock Entry at the bottom */}
            {isOwnerMode ? (
              <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                <ShieldCheck className="w-3 h-3" />
                <span>Owner Mode Active</span>
                <button
                  onClick={onLock}
                  className="ml-1 text-rose-400 hover:text-rose-300 underline font-medium"
                >
                  (Lock)
                </button>
              </span>
            ) : (
              <button
                onClick={onOpenOwnerLogin}
                id="hidden-footer-owner-btn"
                title="Owner Portal"
                aria-label="Owner Access"
                className="p-1 rounded text-slate-700 hover:text-slate-400 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Crafted with care in Tamale, Ghana</span>
            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
