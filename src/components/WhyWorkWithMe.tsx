import React from 'react';
import { DollarSign, Sparkles, Smartphone, MessageCircle, Store, Check, Shield } from 'lucide-react';

export const WhyWorkWithMe: React.FC = () => {
  const reasons = [
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
      title: 'Affordable Digital Solutions',
      description: 'Transparent, budget-friendly pricing structured for small business owners, startups, and solo entrepreneurs in Tamale.',
      badge: 'Cost-Effective',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Creative and Clean Designs',
      description: 'Modern visual hierarchy, balanced colors, and crisp typography that help your business look polished and trustworthy.',
      badge: 'Sharp Aesthetics',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: 'Mobile-Friendly Formats',
      description: 'Every design and website is built to display perfectly on smartphones, WhatsApp status, and low-data connections.',
      badge: '100% Mobile Ready',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-teal-400" />,
      title: 'Friendly & Clear Communication',
      description: 'Patient, respectful collaboration via WhatsApp or phone call. I listen carefully to your requirements and keep you updated.',
      badge: 'Direct WhatsApp',
    },
    {
      icon: <Store className="w-6 h-6 text-purple-400" />,
      title: 'Focus on Helping Local Businesses',
      description: 'Deep commitment to uplifting local Tamale shops, salons, tailors, eateries, and service providers with practical digital presence.',
      badge: 'Tamale Focused',
    },
  ];

  return (
    <section id="why-me" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Why Choose Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Work With Me
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            A reliable, practical, and grounded approach to helping your brand make an impact online.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              id={`why-work-card-${index + 1}`}
              className={`bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {reason.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {reason.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Dedicated Service for Ghana</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
