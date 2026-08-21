import React, { useState } from 'react';
import { Sparkles, Filter, Eye, Play, ArrowUpRight, Info, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioCategory, PortfolioItem, ServiceType } from '../types';
import { ProjectModal } from './ProjectModal';

interface PortfolioProps {
  onRequestService: (service: ServiceType) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onRequestService }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories: PortfolioCategory[] = ['All', 'Flyers', 'Social Media', 'Websites', 'Videos'];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Projects & Concept Designs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Portfolio Gallery
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Explore sample designs, marketing flyers, social media cards, and website layouts crafted to demonstrate how I can help local businesses stand out.
          </p>

          {/* Explicit Notice Badge as requested */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-amber-300">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Transparency Note:</strong> All items shown are <em>Sample Projects / Concept Designs</em> created to showcase design capabilities.
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="portfolio-filters">
          {categories.map((category) => {
            const count = category === 'All' 
              ? PORTFOLIO_ITEMS.length 
              : PORTFOLIO_ITEMS.filter(i => i.category === category).length;

            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`portfolio-item-${item.id}`}
              onClick={() => setSelectedItem(item)}
              className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden group flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Video Play Overlay if video */}
                {item.isVideo && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                    <span className="mt-2 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-rose-300 border border-rose-500/30">
                      Sample Promo Video (30s)
                    </span>
                  </div>
                )}

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-900/90 text-emerald-400 border border-slate-700/80 backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover Quick View Trigger */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Bar inside image */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    {item.clientType}
                  </span>
                  {item.samplePrice && (
                    <span className="font-bold text-emerald-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                      Est. {item.samplePrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Bottom Tags & View CTA */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onRequestService={onRequestService}
        />

        {/* Bottom CTA block */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white">Like what you see in the sample collection?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              I can create customized flyers, social graphics, or a 1-page website tailored to your brand in Tamale.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shrink-0 shadow-md"
          >
            <span>Start a Project with Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
