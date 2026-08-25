import React from 'react';
import { MapPin, User, Sparkles, BookOpen, Target, HeartHandshake, CheckCircle2, Camera, Edit3 } from 'lucide-react';
import { OwnerSettings, DEFAULT_OWNER_SETTINGS } from '../types';

interface AboutProps {
  ownerSettings?: OwnerSettings;
  isOwnerMode?: boolean;
  onOpenOwnerSettings?: (tab?: 'profile' | 'logo' | 'passcode' | 'contact' | 'content') => void;
  onOpenOwnerLogin?: () => void;
}

export const About: React.FC<AboutProps> = ({
  ownerSettings = DEFAULT_OWNER_SETTINGS,
  isOwnerMode = false,
  onOpenOwnerSettings,
  onOpenOwnerLogin,
}) => {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Passionate About Digital Skills & Design
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Empowering local Tamale entrepreneurs to look sharp, confident, and professional in the digital space.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Profile Card / Bio Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                {/* Profile Picture / Headshot Container */}
                <div className="relative group shrink-0">
                  {ownerSettings.profileImage ? (
                    <img
                      src={ownerSettings.profileImage}
                      alt={ownerSettings.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-xl"
                    />
                  ) : ownerSettings.logoType === 'image' && ownerSettings.logoImage ? (
                    <img
                      src={ownerSettings.logoImage}
                      alt={ownerSettings.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-xl"
                    />
                  ) : (
                    <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${ownerSettings.logoColorGradient || 'from-emerald-500 via-teal-600 to-slate-900'} flex items-center justify-center text-white font-extrabold text-2xl shadow-xl border-2 border-emerald-400/40`}>
                      {ownerSettings.logoInitials || 'AF'}
                    </div>
                  )}

                  {/* Quick Edit Camera Button when in Owner Mode or button to unlock */}
                  {isOwnerMode ? (
                    <button
                      type="button"
                      onClick={() => onOpenOwnerSettings?.('profile')}
                      id="owner-change-profile-pic-btn"
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md transition-transform hover:scale-110 flex items-center justify-center"
                      title="Change Profile Picture (Owner Mode)"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenOwnerLogin}
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-700 shadow transition-all opacity-0 group-hover:opacity-100"
                      title="Unlock with password to change profile picture"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white truncate">{ownerSettings.name}</h3>
                  <p className="text-xs sm:text-sm text-emerald-400 font-medium truncate">
                    {ownerSettings.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Based in {ownerSettings.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {ownerSettings.aboutBio1 || (
                    <>Hello! I am <strong className="text-white">{ownerSettings.name}</strong>, a dedicated digital skills student and beginner digital designer based in <span className="text-emerald-400 font-medium">{ownerSettings.location}</span>.</>
                  )}
                </p>
                <p>
                  {ownerSettings.aboutBio2 || (
                    <>I am actively developing my craft in graphic design and modern web development. My primary mission is to help local small businesses, shops, salons, restaurants, and young entrepreneurs create attractive promotional materials, eye-catching flyers, and clean one-page websites.</>
                  )}
                </p>
                <p>
                  I believe that every local business in Tamale deserves to look professional and reach more customers, without having to spend a fortune on complicated agency fees.
                </p>
              </div>

              {/* Status Pill & Owner Quick Button */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Current Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Open for Local Projects
                  </span>
                </div>

                {isOwnerMode && (
                  <button
                    onClick={() => onOpenOwnerSettings?.('profile')}
                    id="about-edit-profile-photo-btn"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Change Profile Picture</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Values & Learning Journey */}
          <div className="lg:col-span-7 space-y-5">
            {/* Card 1 */}
            <div className="bg-slate-950/60 rounded-xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Continuous Skill Development</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    I continuously practice modern visual design principles, typography, mobile responsiveness, and layout hierarchy so your business materials look fresh, sharp, and contemporary.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-950/60 rounded-xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Dedicated to Local Business Growth</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Living and working in Tamale gives me direct insight into what local customers look for—whether it's bold price tags in Ghana Cedis (GH₵), clear WhatsApp order links, or clean location landmarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-950/60 rounded-xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Honest & Collaborative Communication</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    I value straightforward communication, patient collaboration, and delivering on commitments. I listen closely to your ideas and refine them into designs you are proud to share.
                  </p>
                </div>
              </div>
            </div>

            {/* What I Stand For Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Honest Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast WhatsApp Replies</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Mobile Ready</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
