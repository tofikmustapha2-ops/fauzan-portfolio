import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Phone, HelpCircle, Lock, Unlock, Edit3, ShieldCheck, Sliders } from 'lucide-react';
import { OwnerSettings, DEFAULT_OWNER_SETTINGS } from '../types';

interface NavbarProps {
  onOpenOwnerGuide: () => void;
  isOwnerMode: boolean;
  onOpenOwnerLogin: () => void;
  onLock: () => void;
  ownerSettings?: OwnerSettings;
  onOpenOwnerSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOwnerGuide,
  isOwnerMode,
  onOpenOwnerLogin,
  onLock,
  ownerSettings = DEFAULT_OWNER_SETTINGS,
  onOpenOwnerSettings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Me', href: '#why-me' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleWhatsAppClick = () => {
    const waNum = ownerSettings.whatsappNumber || '233204328042';
    window.open(`https://wa.me/${waNum}?text=Hello%20${encodeURIComponent(ownerSettings.name)},%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20inquire%20about%20your%20services.`, '_blank');
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800/80 py-3 text-white'
          : 'bg-slate-900/85 backdrop-blur-sm border-b border-slate-800/50 py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="brand-logo"
          >
            {ownerSettings.logoType === 'image' && ownerSettings.logoImage ? (
              <img
                src={ownerSettings.logoImage}
                alt={ownerSettings.name}
                className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shadow-inner group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ownerSettings.logoColorGradient || 'from-emerald-500 to-teal-700'} flex items-center justify-center text-white font-bold text-lg shadow-inner group-hover:scale-105 transition-transform duration-200 border border-white/10`}
              >
                {ownerSettings.logoInitials || 'AF'}
              </div>
            )}
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
                {ownerSettings.name}
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {ownerSettings.title}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 rounded-lg transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={handleWhatsAppClick}
              id="nav-whatsapp-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-all duration-200"
              title={`Chat on WhatsApp (${ownerSettings.phone})`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{ownerSettings.phone}</span>
            </button>

            <a
              href="#contact"
              id="nav-contact-cta"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm transition-all duration-200 hover:shadow-emerald-500/20 hover:shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>

            {/* Active Owner Controls (When Unlocked) */}
            {isOwnerMode && (
              <>
                <button
                  onClick={onOpenOwnerSettings}
                  id="nav-owner-settings-btn"
                  title="Owner Brand & Logo Settings"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-150"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Edit Logo & Info</span>
                </button>

                <button
                  onClick={onLock}
                  id="nav-lock-portfolio-btn"
                  title="Exit owner edit mode & lock"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500 hover:text-white transition-all duration-150"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Lock</span>
                </button>
              </>
            )}

            <button
              onClick={onOpenOwnerGuide}
              id="nav-owner-guide-btn"
              title="Setup Guide"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            {isOwnerMode && (
              <>
                <button
                  onClick={onOpenOwnerSettings}
                  id="mobile-owner-settings-btn"
                  title="Brand & Logo Settings"
                  className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                >
                  <Sliders className="w-4 h-4" />
                </button>
                <button
                  onClick={onLock}
                  id="mobile-lock-portfolio-btn"
                  title="Lock / Exit Edit Mode"
                  className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40"
                >
                  <Lock className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/80"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp / Call ({ownerSettings.phone})</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold bg-emerald-500 text-slate-950"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Me</span>
            </a>

            {isOwnerMode && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOwnerSettings?.();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                >
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Owner Brand & Logo Settings</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLock();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40"
                >
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Exit Owner Edit Mode & Lock</span>
                </button>
              </>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerGuide();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Setup Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
