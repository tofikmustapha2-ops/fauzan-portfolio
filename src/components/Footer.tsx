import React from 'react';
import { ArrowUp, Heart, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenOwnerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerGuide }) => {
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
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>Tamale, Northern Region, Ghana</span>
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

          {/* Col 3: Services Summary & Helper */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Offerings</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Flyer & Poster Design</li>
              <li>• Social Media Graphics</li>
              <li>• Simple Business Websites</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenOwnerGuide}
                className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                Owner Setup & Customization Guide
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © 2026 Adam Suhuyini Fauzan. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Designed with passion for Tamale Businesses</span>
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
