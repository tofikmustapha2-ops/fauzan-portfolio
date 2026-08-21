/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OwnerGuideModal } from './components/OwnerGuideModal';
import { ServiceType } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('Flyer & Poster Design');
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);

  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Header */}
      <Navbar onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)} />

      {/* Main Single-Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* My Three Main Services */}
        <Services onSelectService={handleSelectService} />

        {/* Portfolio / Sample Projects */}
        <Portfolio onRequestService={handleSelectService} />

        {/* Why Work With Me */}
        <WhyWorkWithMe />

        {/* Contact Me Form & WhatsApp */}
        <Contact
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)} />

      {/* Owner Setup Guide Modal */}
      <OwnerGuideModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
      />
    </div>
  );
}
