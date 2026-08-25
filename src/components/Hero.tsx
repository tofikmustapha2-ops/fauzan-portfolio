import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, Layout, Image as ImageIcon, Globe, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { OwnerSettings, DEFAULT_OWNER_SETTINGS } from '../types';

interface HeroProps {
  ownerSettings?: OwnerSettings;
}

export const Hero: React.FC<HeroProps> = ({
  ownerSettings = DEFAULT_OWNER_SETTINGS,
}) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Tamale Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-emerald-400 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-emerald-400 inline" />
              <span>Available for Local Businesses in {ownerSettings.location}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
              {ownerSettings.heroHeadline || (
                <>Helping <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Tamale Businesses</span> Look Professional Online.</>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {ownerSettings.heroSubheadline ? (
                <span>{ownerSettings.heroSubheadline}</span>
              ) : (
                <>Hi, I’m <strong className="text-white font-semibold">{ownerSettings.name}</strong>. I help small businesses, shops, and entrepreneurs promote their services with attractive flyer designs, high-impact social media graphics, and clean, mobile-friendly websites.</>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#portfolio"
                id="hero-view-work-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 text-white border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Affordable Local Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mobile-First Formats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Quick WhatsApp Communication</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Digital Design Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900/90 p-3 sm:p-4 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                
                {/* Visual Header bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-950/60 rounded-lg mb-3 border border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                    portfolio_design_studio.af
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>

                {/* Digital Design Showcase Cards Stack */}
                <div className="space-y-3">
                  {/* Card 1: Flyer Sample Mockup */}
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-700 flex flex-col items-center justify-center text-white shrink-0 shadow-md">
                        <ImageIcon className="w-5 h-5 mb-0.5" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Flyer</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate">Promotional Flyers & Posters</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">Print & Status</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          High-contrast event flyers, barbering salon ads, and restaurant food specials.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Social Media Card */}
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center text-white shrink-0 shadow-md">
                        <Layout className="w-5 h-5 mb-0.5" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Social</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate">WhatsApp & Social Media Ads</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">Story & Feed</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          Optimized for WhatsApp Status, Facebook, and Instagram marketing in Ghana.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: 1-Page Business Website */}
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col items-center justify-center text-white shrink-0 shadow-md">
                        <Globe className="w-5 h-5 mb-0.5" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Web</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate">Simple 1-Page Business Sites</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-semibold border border-blue-500/20">Mobile 1st</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          Fast, clean online presence with menu/services, pricing in GH₵, and WhatsApp booking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer bar inside mockup */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Tailored for Tamale Businesses</span>
                  </span>
                  <a href="#portfolio" className="text-emerald-400 hover:underline font-medium text-xs">
                    Explore Samples →
                  </a>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900/95 border border-slate-700 text-white px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                {ownerSettings.profileImage ? (
                  <img
                    src={ownerSettings.profileImage}
                    alt={ownerSettings.name}
                    className="w-9 h-9 rounded-lg object-cover border border-emerald-400/50 shadow"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    GH
                  </div>
                )}
                <div className="text-left">
                  <p className="text-xs font-bold leading-none text-white">{ownerSettings.name}</p>
                  <p className="text-[11px] text-slate-400">{ownerSettings.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
