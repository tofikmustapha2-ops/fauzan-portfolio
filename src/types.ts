export type ServiceType = 
  | 'Flyer & Poster Design'
  | 'Social Media Graphics'
  | 'Simple Business Website';

export type PortfolioCategory = 'All' | 'Flyers' | 'Social Media' | 'Websites' | 'Videos';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Flyers' | 'Social Media' | 'Websites' | 'Videos';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  clientType: string;
  serviceType: ServiceType;
  image: string;
  accentColor: string;
  tags: string[];
  dimensions?: string;
  isVideo?: boolean;
  videoDuration?: string;
  samplePrice?: string; // in GH₵ for sample estimate
  features?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: ServiceType;
  message: string;
}

export interface OwnerSettings {
  name: string;
  title: string;
  profileImage: string;
  logoType: 'initials' | 'image';
  logoInitials: string;
  logoColorGradient: string;
  logoImage: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  location: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutBio1: string;
  aboutBio2: string;
  passcode: string;
}

export const DEFAULT_OWNER_SETTINGS: OwnerSettings = {
  name: 'Adam Suhuyini Fauzan',
  title: 'Digital Designer • Tamale, Ghana',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  logoType: 'initials',
  logoInitials: 'AF',
  logoColorGradient: 'from-emerald-500 to-teal-700',
  logoImage: '',
  phone: '0204328042',
  whatsappNumber: '233204328042',
  email: 'suhuyinifauzanadam@gmail.com',
  location: 'Tamale, Northern Region, Ghana',
  heroHeadline: 'Helping Tamale Businesses Look Professional Online.',
  heroSubheadline: 'I help small businesses, shops, and entrepreneurs promote their services with attractive flyer designs, high-impact social media graphics, and clean, mobile-friendly websites.',
  aboutBio1: 'Hello! I am Adam Suhuyini Fauzan, a dedicated digital skills student and beginner digital designer based in Tamale, Ghana.',
  aboutBio2: 'I am actively developing my craft in graphic design and modern web development. My primary mission is to help local small businesses, shops, salons, restaurants, and young entrepreneurs create attractive promotional materials, eye-catching flyers, and clean one-page websites.',
  passcode: '1234',
};
