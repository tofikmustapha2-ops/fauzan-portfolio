import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  KeyRound, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Type, 
  Palette, 
  Lock, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { OwnerSettings, DEFAULT_OWNER_SETTINGS } from '../types';

interface OwnerSettingsModalProps {
  isOpen: boolean;
  settings: OwnerSettings;
  onClose: () => void;
  onSave: (newSettings: OwnerSettings) => void;
  onResetDefaults: () => void;
}

const GRADIENT_PRESETS = [
  { name: 'Emerald & Teal (Default)', value: 'from-emerald-500 to-teal-700' },
  { name: 'Indigo & Blue', value: 'from-indigo-500 to-blue-700' },
  { name: 'Violet & Purple', value: 'from-violet-500 to-purple-700' },
  { name: 'Amber & Orange', value: 'from-amber-500 to-orange-700' },
  { name: 'Rose & Crimson', value: 'from-rose-500 to-pink-700' },
  { name: 'Cyan & Sky', value: 'from-cyan-500 to-sky-700' },
];

export const OwnerSettingsModal: React.FC<OwnerSettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'logo' | 'passcode' | 'contact' | 'content'>('logo');
  
  // Form states
  const [name, setName] = useState(settings.name);
  const [title, setTitle] = useState(settings.title);
  const [logoType, setLogoType] = useState<'initials' | 'image'>(settings.logoType);
  const [logoInitials, setLogoInitials] = useState(settings.logoInitials);
  const [logoColorGradient, setLogoColorGradient] = useState(settings.logoColorGradient);
  const [logoImage, setLogoImage] = useState(settings.logoImage);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email);
  const [location, setLocation] = useState(settings.location);
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(settings.heroSubheadline);
  const [aboutBio1, setAboutBio1] = useState(settings.aboutBio1);
  const [aboutBio2, setAboutBio2] = useState(settings.aboutBio2);

  // Passcode change states
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(settings.name);
      setTitle(settings.title);
      setLogoType(settings.logoType);
      setLogoInitials(settings.logoInitials);
      setLogoColorGradient(settings.logoColorGradient);
      setLogoImage(settings.logoImage);
      setPhone(settings.phone);
      setWhatsappNumber(settings.whatsappNumber);
      setEmail(settings.email);
      setLocation(settings.location);
      setHeroHeadline(settings.heroHeadline);
      setHeroSubheadline(settings.heroSubheadline);
      setAboutBio1(settings.aboutBio1);
      setAboutBio2(settings.aboutBio2);

      // Reset pin inputs
      setCurrentPinInput('');
      setNewPin('');
      setConfirmNewPin('');
      setPasscodeError(null);
      setPasscodeSuccess(false);
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLogoImage(reader.result);
          setLogoType('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(null);
    setPasscodeSuccess(false);

    if (currentPinInput !== settings.passcode) {
      setPasscodeError('Current passcode is incorrect.');
      return;
    }

    if (!/^\d{4}$/.test(newPin)) {
      setPasscodeError('New passcode must be exactly 4 numeric digits (e.g. 5678).');
      return;
    }

    if (newPin !== confirmNewPin) {
      setPasscodeError('New passcodes do not match.');
      return;
    }

    // Save with updated passcode
    const updated: OwnerSettings = {
      ...settings,
      passcode: newPin,
    };
    onSave(updated);
    setPasscodeSuccess(true);
    setCurrentPinInput('');
    setNewPin('');
    setConfirmNewPin('');
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: OwnerSettings = {
      ...settings,
      name: name.trim() || DEFAULT_OWNER_SETTINGS.name,
      title: title.trim() || DEFAULT_OWNER_SETTINGS.title,
      logoType,
      logoInitials: logoInitials.trim().slice(0, 3).toUpperCase() || 'AF',
      logoColorGradient,
      logoImage: logoImage.trim(),
      phone: phone.trim() || DEFAULT_OWNER_SETTINGS.phone,
      whatsappNumber: whatsappNumber.trim().replace(/[^0-9]/g, '') || DEFAULT_OWNER_SETTINGS.whatsappNumber,
      email: email.trim() || DEFAULT_OWNER_SETTINGS.email,
      location: location.trim() || DEFAULT_OWNER_SETTINGS.location,
      heroHeadline: heroHeadline.trim() || DEFAULT_OWNER_SETTINGS.heroHeadline,
      heroSubheadline: heroSubheadline.trim() || DEFAULT_OWNER_SETTINGS.heroSubheadline,
      aboutBio1: aboutBio1.trim() || DEFAULT_OWNER_SETTINGS.aboutBio1,
      aboutBio2: aboutBio2.trim() || DEFAULT_OWNER_SETTINGS.aboutBio2,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div
      id="owner-settings-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="owner-settings-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-owner-settings-modal-btn"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Owner Customization & Brand Settings</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold uppercase">
                Owner Only
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Customize your brand logo, change your 4-digit passcode, and update your personal info.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            id="tab-logo-branding"
            onClick={() => setActiveTab('logo')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'logo'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Logo & Branding</span>
          </button>

          <button
            type="button"
            id="tab-change-passcode"
            onClick={() => setActiveTab('passcode')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'passcode'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Change Passcode</span>
          </button>

          <button
            type="button"
            id="tab-contact-info"
            onClick={() => setActiveTab('contact')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            type="button"
            id="tab-content-bio"
            onClick={() => setActiveTab('content')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'content'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Hero & Bio Text</span>
          </button>
        </div>

        {/* TAB 1: LOGO & BRANDING */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            {/* Live Logo Preview Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Logo Preview</span>
                <h4 className="text-sm font-semibold text-white">How your logo appears in the Header & Profile</h4>
                <p className="text-xs text-slate-400">Visitors will see this branding across the whole site.</p>
              </div>

              {/* Logo Preview Element */}
              <div className="flex items-center gap-3 bg-slate-900 px-5 py-3.5 rounded-2xl border border-slate-800 shadow-inner">
                {logoType === 'image' && logoImage ? (
                  <img
                    src={logoImage}
                    alt="Logo Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shadow-md"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${logoColorGradient} flex items-center justify-center text-white font-black text-xl shadow-md border border-white/20`}
                  >
                    {logoInitials || 'AF'}
                  </div>
                )}
                <div>
                  <span className="text-sm font-bold text-white block">{name || 'Adam Suhuyini Fauzan'}</span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {title || 'Digital Designer • Tamale, Ghana'}
                  </span>
                </div>
              </div>
            </div>

            {/* Logo Style Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Initials Badge */}
              <div
                onClick={() => setLogoType('initials')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  logoType === 'initials'
                    ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-emerald-400" />
                    <span>Option A: Initials / Monogram Badge</span>
                  </span>
                  <input
                    type="radio"
                    checked={logoType === 'initials'}
                    onChange={() => setLogoType('initials')}
                    className="accent-emerald-500"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Initials Text (1-3 Letters):</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={logoInitials}
                      onChange={(e) => setLogoInitials(e.target.value.toUpperCase())}
                      placeholder="AF"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Color Gradient Theme:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {GRADIENT_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setLogoColorGradient(preset.value)}
                          className={`p-1.5 rounded-lg text-[10px] text-left border flex items-center gap-1.5 transition-colors ${
                            logoColorGradient === preset.value
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                              : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${preset.value} shrink-0`} />
                          <span className="truncate">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Option B: Custom Image / Picture Logo */}
              <div
                onClick={() => setLogoType('image')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  logoType === 'image'
                    ? 'bg-slate-950 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Option B: Custom Logo Picture / Avatar</span>
                  </span>
                  <input
                    type="radio"
                    checked={logoType === 'image'}
                    onChange={() => setLogoType('image')}
                    className="accent-emerald-500"
                  />
                </div>

                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="owner-logo-file-input"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl bg-slate-900/50 hover:bg-slate-900 flex flex-col items-center justify-center gap-1 text-xs text-slate-300 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Upload Logo from Phone or PC</span>
                    <span className="text-[10px] text-slate-500">Supports PNG (with transparency), JPG, WEBP</span>
                  </button>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Or Paste Image URL:</label>
                    <input
                      type="url"
                      value={logoImage}
                      onChange={(e) => {
                        setLogoImage(e.target.value);
                        setLogoType('image');
                      }}
                      placeholder="https://example.com/my-logo.png"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANGE PASSCODE (PIN) */}
        {activeTab === 'passcode' && (
          <div className="space-y-5">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <Lock className="w-4 h-4" />
                <span>Change Your Owner 4-Digit Passcode</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose a private 4-digit PIN known only to you. You will use this code to unlock owner editing mode and modify pictures or projects anytime.
              </p>

              {passcodeError && (
                <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}

              {passcodeSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Passcode updated successfully! Your new PIN is saved.</span>
                </div>
              )}

              <form onSubmit={handleChangePasscode} className="mt-5 space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Passcode (PIN)
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    required
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Enter current 4 digits"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    New 4-Digit Passcode (PIN)
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 5678"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    required
                    value={confirmNewPin}
                    onChange={(e) => setConfirmNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Re-enter new 4 digits"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  id="save-new-pin-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Save New Passcode</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT & WHATSAPP */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Owner Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adam Suhuyini Fauzan"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Professional Title / Subtitle</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digital Designer • Tamale, Ghana"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phone Display Number</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0204328042"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Number (Country code included)</span>
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="233204328042"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="suhuyinifauzanadam@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Location / City</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Tamale, Northern Region, Ghana"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HERO & BIO TEXT */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="Helping Tamale Businesses Look Professional Online."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                placeholder="Brief description under the headline..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                About Me - Main Paragraph
              </label>
              <textarea
                rows={3}
                value={aboutBio1}
                onChange={(e) => setAboutBio1(e.target.value)}
                placeholder="Introduction paragraph in About section..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                About Me - Secondary Paragraph
              </label>
              <textarea
                rows={3}
                value={aboutBio2}
                onChange={(e) => setAboutBio2(e.target.value)}
                placeholder="Mission and goals paragraph in About section..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>
          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all brand and owner settings back to original defaults?')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Original Defaults</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              id="save-all-owner-settings-btn"
              onClick={handleSubmitAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition-all duration-200"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
