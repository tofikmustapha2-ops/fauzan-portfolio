/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OwnerGuideModal } from './components/OwnerGuideModal';
import { PasscodeLock } from './components/PasscodeLock';
import { EditProjectModal } from './components/EditProjectModal';
import { OwnerSettingsModal } from './components/OwnerSettingsModal';
import { PORTFOLIO_ITEMS } from './data/portfolioData';
import { PortfolioItem, ServiceType, OwnerSettings, DEFAULT_OWNER_SETTINGS } from './types';
import { Lock, ShieldCheck, Clock, Plus, RefreshCw, CheckCircle2, Sliders } from 'lucide-react';

const STORAGE_KEY = 'af_portfolio_items_v1';
const OWNER_SETTINGS_KEY = 'af_owner_settings_v1';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('Flyer & Poster Design');
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [isOwnerSettingsOpen, setIsOwnerSettingsOpen] = useState(false);
  const [ownerSettingsTab, setOwnerSettingsTab] = useState<'profile' | 'logo' | 'passcode' | 'contact' | 'content'>('profile');
  
  // Public by default: Everyone can see and read immediately without passcode
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  
  // Owner brand & security settings state (Logo, name, title, contact, passcode)
  const [ownerSettings, setOwnerSettings] = useState<OwnerSettings>(() => {
    try {
      const saved = localStorage.getItem(OWNER_SETTINGS_KEY);
      if (saved) {
        return { ...DEFAULT_OWNER_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading owner settings from storage:', e);
    }
    return DEFAULT_OWNER_SETTINGS;
  });

  // Portfolio items with local storage persistence
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading portfolio items from storage:', e);
    }
    return PORTFOLIO_ITEMS;
  });

  // Project editing state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-lock timer for Owner Edit Mode (5 minutes)
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const timerRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLock = useCallback(() => {
    setIsOwnerMode(false);
    setIsEditModalOpen(false);
    setIsOwnerSettingsOpen(false);
    showToast('🔒 Owner Edit Mode locked.');
  }, []);

  const handleUnlock = () => {
    setIsOwnerMode(true);
    showToast('✨ Owner Mode unlocked! You can now edit pictures, logo, projects & settings.');
    resetAutoLockTimer();
  };

  const resetAutoLockTimer = useCallback(() => {
    setSecondsRemaining(300);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    if (isOwnerMode) {
      countdownIntervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = setTimeout(() => {
        handleLock();
      }, 300 * 1000);
    }
  }, [isOwnerMode, handleLock]);

  // Track user activity to refresh auto-lock timer when in owner mode
  useEffect(() => {
    if (!isOwnerMode) return;

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleUserActivity = () => {
      resetAutoLockTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetAutoLockTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isOwnerMode, resetAutoLockTimer, handleLock]);

  // Save changes to owner brand & passcode settings
  const handleSaveOwnerSettings = (updated: OwnerSettings) => {
    setOwnerSettings(updated);
    try {
      localStorage.setItem(OWNER_SETTINGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving owner settings to localStorage:', e);
    }
    showToast('✅ Brand logo, info, and passcode updated successfully.');
  };

  // Reset owner settings to defaults
  const handleResetOwnerSettings = () => {
    if (confirm('Reset logo and owner settings back to original defaults?')) {
      setOwnerSettings(DEFAULT_OWNER_SETTINGS);
      localStorage.removeItem(OWNER_SETTINGS_KEY);
      showToast('Brand settings reset to original defaults.');
    }
  };

  // Save changes to a project
  const handleSaveProject = (updatedItem: PortfolioItem) => {
    let updatedList: PortfolioItem[];
    const exists = portfolioItems.some((item) => item.id === updatedItem.id);
    
    if (exists) {
      updatedList = portfolioItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      showToast(`Updated "${updatedItem.title}" picture & details.`);
    } else {
      updatedList = [updatedItem, ...portfolioItems];
      showToast(`Added new project "${updatedItem.title}" to portfolio.`);
    }

    setPortfolioItems(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving portfolio to localStorage:', e);
    }
  };

  // Delete a project
  const handleDeleteProject = (id: string) => {
    const updatedList = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving portfolio to localStorage:', e);
    }
    showToast('Project removed from portfolio.');
  };

  // Reset to original preset samples
  const handleResetToDefaults = () => {
    if (confirm('Reset portfolio back to default sample designs? All custom edits will be restored.')) {
      setPortfolioItems(PORTFOLIO_ITEMS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Portfolio reset to default samples.');
    }
  };

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOpenOwnerSettings = (tab: 'profile' | 'logo' | 'passcode' | 'contact' | 'content' = 'profile') => {
    setOwnerSettingsTab(tab);
    setIsOwnerSettingsOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Owner Passcode Unlock Modal (Protected by PIN) */}
      <PasscodeLock
        isOpen={isPasscodeModalOpen}
        onClose={() => setIsPasscodeModalOpen(false)}
        onSuccess={handleUnlock}
        correctPasscode={ownerSettings.passcode}
      />

      {/* Owner Brand & Security Settings Modal (Profile Picture, Logo, PIN, Bio, Contact) */}
      <OwnerSettingsModal
        isOpen={isOwnerSettingsOpen}
        initialTab={ownerSettingsTab}
        onClose={() => setIsOwnerSettingsOpen(false)}
        settings={ownerSettings}
        onSave={handleSaveOwnerSettings}
        onResetDefaults={handleResetOwnerSettings}
      />

      {/* Edit Project / Picture Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        item={editingItem}
        isNew={isNewProject}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed top-20 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Floating Owner Toolbar (Visible only in Owner Edit Mode) */}
      {isOwnerMode && (
        <aside
          aria-label="Owner toolbar"
          className="fixed bottom-5 right-5 z-40 bg-slate-900/95 border-2 border-emerald-500/60 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md flex flex-wrap items-center gap-2.5 text-xs text-slate-300 transition-all duration-200"
        >
          <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white hidden sm:inline">Owner Mode</span>
            <span className="text-slate-400 font-mono text-[11px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              {formatTime(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => handleOpenOwnerSettings('profile')}
            id="floating-profile-photo-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Profile Photo & Info</span>
          </button>

          <button
            onClick={() => {
              setEditingItem(null);
              setIsNewProject(true);
              setIsEditModalOpen(true);
            }}
            id="floating-add-project-btn"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 text-xs shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>

          <button
            onClick={handleResetToDefaults}
            title="Reset to default sample designs"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLock}
            id="floating-lock-now-btn"
            title="Lock edit mode now"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold transition-colors duration-150"
          >
            <Lock className="w-3 h-3" />
            <span>Lock</span>
          </button>
        </aside>
      )}

      {/* Sticky Header */}
      <Navbar
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        isOwnerMode={isOwnerMode}
        onOpenOwnerLogin={() => setIsPasscodeModalOpen(true)}
        onLock={handleLock}
        ownerSettings={ownerSettings}
        onOpenOwnerSettings={() => handleOpenOwnerSettings('logo')}
      />

      {/* Main Single-Page Sections (Visible & readable to everyone) */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero ownerSettings={ownerSettings} />

        {/* About Me Section with Profile Picture and Owner Photo Controls */}
        <About
          ownerSettings={ownerSettings}
          isOwnerMode={isOwnerMode}
          onOpenOwnerSettings={handleOpenOwnerSettings}
          onOpenOwnerLogin={() => setIsPasscodeModalOpen(true)}
        />

        {/* My Three Main Services */}
        <Services onSelectService={handleSelectService} />

        {/* Portfolio / Sample Projects with Owner Picture & Detail Editing */}
        <Portfolio
          items={portfolioItems}
          isOwnerMode={isOwnerMode}
          onRequestService={handleSelectService}
          onEditItem={(item) => {
            setEditingItem(item);
            setIsNewProject(false);
            setIsEditModalOpen(true);
          }}
          onDeleteItem={handleDeleteProject}
          onAddNewItem={() => {
            setEditingItem(null);
            setIsNewProject(true);
            setIsEditModalOpen(true);
          }}
        />

        {/* Why Work With Me */}
        <WhyWorkWithMe />

        {/* Contact Me Form & WhatsApp */}
        <Contact
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
          ownerSettings={ownerSettings}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        isOwnerMode={isOwnerMode}
        onOpenOwnerLogin={() => setIsPasscodeModalOpen(true)}
        onLock={handleLock}
        ownerSettings={ownerSettings}
        onOpenOwnerSettings={() => setIsOwnerSettingsOpen(true)}
      />

      {/* Owner Setup Guide Modal */}
      <OwnerGuideModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
      />
    </div>
  );
}
