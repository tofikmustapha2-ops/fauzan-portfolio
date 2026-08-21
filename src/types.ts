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
