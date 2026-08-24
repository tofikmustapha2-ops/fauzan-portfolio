import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, Check, Trash2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { PortfolioItem, PortfolioCategory, ServiceType } from '../types';

interface EditProjectModalProps {
  isOpen: boolean;
  item: PortfolioItem | null;
  isNew?: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  onDelete?: (id: string) => void;
}

const CATEGORY_MAP: Record<string, { label: string; service: ServiceType; defaultColor: string }> = {
  'Flyers': {
    label: 'Flyer Design',
    service: 'Flyer & Poster Design',
    defaultColor: '#d97706',
  },
  'Social Media': {
    label: 'Social Media Graphic',
    service: 'Social Media Graphics',
    defaultColor: '#059669',
  },
  'Websites': {
    label: 'Website Layout',
    service: 'Simple Business Website',
    defaultColor: '#2563eb',
  },
  'Videos': {
    label: 'Promotional Video',
    service: 'Social Media Graphics',
    defaultColor: '#e11d48',
  },
};

const SAMPLE_IMAGE_PRESETS = [
  { name: 'Barbershop Flyer', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80' },
  { name: 'Restaurant / Food Menu', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80' },
  { name: 'Fashion & Tailoring', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Beauty & Hair Salon', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80' },
  { name: 'Phone & Tech Accessories', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80' },
  { name: 'WhatsApp Status Promo', url: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=900&q=80' },
  { name: '1-Page Business Website', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80' },
];

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  item,
  isNew = false,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Flyers' | 'Social Media' | 'Websites' | 'Videos'>('Flyers');
  const [clientType, setClientType] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [image, setImage] = useState('');
  const [samplePrice, setSamplePrice] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [imageTab, setImageTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setCategory(item.category);
      setClientType(item.clientType);
      setShortDescription(item.shortDescription);
      setFullDescription(item.fullDescription);
      setImage(item.image);
      setSamplePrice(item.samplePrice || '');
      setTagsInput(item.tags ? item.tags.join(', ') : '');
    } else {
      // Default new project
      setTitle('');
      setCategory('Flyers');
      setClientType('Local Business in Tamale');
      setShortDescription('');
      setFullDescription('');
      setImage(SAMPLE_IMAGE_PRESETS[0].url);
      setSamplePrice('GH₵ 80 - 150');
      setTagsInput('Tamale, Custom Design, Fast Delivery');
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title.');
      return;
    }
    if (!image.trim()) {
      alert('Please provide or upload an image for this project.');
      return;
    }

    const config = CATEGORY_MAP[category] || CATEGORY_MAP['Flyers'];
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedItem: PortfolioItem = {
      id: item ? item.id : `custom-project-${Date.now()}`,
      title: title.trim(),
      category: category,
      categoryLabel: config.label,
      clientType: clientType.trim() || 'Tamale Business',
      serviceType: config.service,
      shortDescription: shortDescription.trim() || 'Custom design project by Adam Suhuyini Fauzan.',
      fullDescription: fullDescription.trim() || shortDescription.trim() || 'Custom design tailored to client requirements.',
      image: image.trim(),
      accentColor: config.defaultColor,
      tags: tags.length > 0 ? tags : ['Design', 'Tamale'],
      samplePrice: samplePrice.trim() || undefined,
      isVideo: category === 'Videos',
      features: item?.features || [
        'Custom layout according to client needs',
        'Direct WhatsApp integration',
        'Delivered in high-resolution ready formats',
      ],
    };

    onSave(updatedItem);
    onClose();
  };

  return (
    <div
      id="edit-project-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="edit-project-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-edit-project-modal-btn"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {isNew ? 'Add New Portfolio Project' : 'Edit Project & Picture'}
            </h2>
            <p className="text-xs text-slate-400">
              Only you (the owner) can customize portfolio images and details.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* IMAGE SELECTION SECTION */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Project Picture / Design Image *</span>
              </label>

              {/* Image Input Mode Tabs */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    imageTab === 'upload' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    imageTab === 'url' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('presets')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    imageTab === 'presets' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Presets
                </button>
              </div>
            </div>

            {/* Current Image Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-44 aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                    No Image
                  </div>
                )}
                <span className="absolute bottom-1 right-1 text-[9px] px-1.5 py-0.5 rounded bg-slate-950/80 text-emerald-400 border border-slate-700">
                  Live Preview
                </span>
              </div>

              <div className="flex-1 w-full">
                {imageTab === 'upload' && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                      id="project-image-file-input"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-xl bg-slate-900/50 hover:bg-slate-900 flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300 transition-all cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-emerald-400" />
                      <span className="font-semibold">Click to choose image from phone or computer</span>
                      <span className="text-[10px] text-slate-500">Supports JPG, PNG, WEBP (stored instantly)</span>
                    </button>
                  </div>
                )}

                {imageTab === 'url' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-400">Direct Web Image Link:</label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/my-flyer.jpg"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                )}

                {imageTab === 'presets' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-400">Choose from sample design presets:</label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-28 overflow-y-auto pr-1">
                      {SAMPLE_IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setImage(preset.url)}
                          className={`text-left p-1.5 rounded-lg text-[10px] truncate border transition-colors ${
                            image === preset.url
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PROJECT DETAILS FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Royal Cut Barbering - Grand Opening Flyer"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="Flyers">Flyers (Flyer & Poster Design)</option>
                <option value="Social Media">Social Media Graphics</option>
                <option value="Websites">Websites (1-Page Layouts)</option>
                <option value="Videos">Videos (Promotional Promo)</option>
              </select>
            </div>

            {/* Client / Business Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Client / Business Type
              </label>
              <input
                type="text"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                placeholder="e.g. Barbering Salon, Restaurant, Tailoring"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {/* Sample Price in GH₵ */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Estimated Price (GH₵)
              </label>
              <input
                type="text"
                value={samplePrice}
                onChange={(e) => setSamplePrice(e.target.value)}
                placeholder="e.g. GH₵ 80 - 150"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Print Ready, Tamale, A5 Flyer"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {/* Short Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Short Summary (Shown on Card)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief 1-sentence summary of the design..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            {/* Full Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Description (Shown in Details Modal)
              </label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detailed breakdown of layout, typography, colors, and client goals..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            {/* Delete button (if editing existing) */}
            {!isNew && onDelete && item ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                    onDelete(item.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-project-changes-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition-all duration-200"
              >
                <Check className="w-4 h-4" />
                <span>{isNew ? 'Add Project to Portfolio' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
