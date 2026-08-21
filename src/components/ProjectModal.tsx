import React, { useState } from 'react';
import { X, ExternalLink, Play, Tag, Check, Info, MessageSquare, Sparkles, Volume2, Pause } from 'lucide-react';
import { PortfolioItem, ServiceType } from '../types';

interface ProjectModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onRequestService: (service: ServiceType) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  item,
  onClose,
  onRequestService,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  if (!item) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-project-modal-btn"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Section */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-950 overflow-hidden">
          {item.isVideo ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/50 p-6 text-center">
              <img
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity ${
                  isPlayingVideo ? 'opacity-40 filter blur-xs' : ''
                }`}
              />
              <div className="relative z-10 max-w-md">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-semibold">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Sample Motion Graphic & Video Promo</span>
                </div>
                
                {/* Simulated video playback controller */}
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    id="video-play-simulation-btn"
                    className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  >
                    {isPlayingVideo ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                  </button>
                  <p className="text-xs text-slate-300 font-mono">
                    {isPlayingVideo ? '▶ Playing Concept Reel Demo (30s)' : 'Click to preview promotional video animation'}
                  </p>
                </div>

                {isPlayingVideo && (
                  <div className="mt-4 p-3 rounded-lg bg-slate-900/90 border border-slate-700 text-left text-xs space-y-1 animate-pulse">
                    <div className="flex items-center justify-between text-rose-400 font-mono text-[11px]">
                      <span>00:14 / 00:30</span>
                      <span className="flex items-center gap-1"><Volume2 className="w-3 h-3" /> Audio Beat Synced</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full w-1/2"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
            </div>
          )}

          {/* Badge Label */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500 text-slate-950">
              {item.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-800/90 text-slate-200 border border-slate-700 backdrop-blur-sm">
              Concept / Sample Design
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
              <span>Client Category: {item.clientType}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>{item.fullDescription}</p>
          </div>

          {/* Features / Specifications Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {item.features && item.features.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Design Highlights</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Format & Pricing Scope</span>
              </h4>
              <div className="text-xs space-y-2">
                {item.dimensions && (
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Format/Dimensions:</span>
                    <span className="font-semibold text-slate-200">{item.dimensions}</span>
                  </div>
                )}
                {item.samplePrice && (
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Sample Estimate:</span>
                    <span className="font-bold text-emerald-400">{item.samplePrice}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Turnaround:</span>
                  <span className="font-semibold text-slate-200">24 – 48 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Disclaimer Label */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Sample Concept Notice:</strong> This project is an original concept mockup showcasing design layout, typography, and styling capability for businesses in Tamale.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestService(item.serviceType);
              }}
              id="modal-request-service-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Similar Design for Your Business</span>
            </button>

            <button
              onClick={onClose}
              id="modal-close-btn"
              className="py-3 px-5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
