import type { CertificateFont } from '../types/certificate';

export const FONT_CATALOG: CertificateFont[] = [
  // User favorite requested fonts
  {
    id: 'magnolia',
    name: 'Magnolia Script',
    category: 'Signature',
    fontFamily: "'Alex Brush', 'Pinyon Script', cursive",
    className: 'font-magnolia',
    styleBadge: 'Requested Favorite',
    isRecommendedFor: ['rising-yoga', 'classical-academy'],
  },
  {
    id: 'higuen',
    name: 'Higuen Elegant Serif',
    category: 'Elegant',
    fontFamily: "'Bodoni Moda', 'Playfair Display', Didot, serif",
    className: 'font-higuen',
    styleBadge: 'Requested Favorite',
    isRecommendedFor: ['rising-yoga', 'modern-gold'],
  },
  // Elegant Serifs
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Elegant',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    className: 'font-cormorant',
    styleBadge: 'Luxury Classical',
    isRecommendedFor: ['classical-academy'],
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Elegant',
    fontFamily: "'Playfair Display', Georgia, serif",
    className: 'font-playfair',
    styleBadge: 'High Contrast',
    isRecommendedFor: ['rising-yoga'],
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Elegant',
    fontFamily: "'Cinzel', serif",
    className: 'font-cinzel',
    styleBadge: 'Roman Inscriptional',
    isRecommendedFor: ['classical-academy'],
  },
  // Signature & Calligraphy
  {
    id: 'greatvibes',
    name: 'Great Vibes',
    category: 'Signature',
    fontFamily: "'Great Vibes', cursive",
    className: 'font-greatvibes',
    styleBadge: 'Flowing Script',
    isRecommendedFor: ['rising-yoga'],
  },
  {
    id: 'allura',
    name: 'Allura',
    category: 'Signature',
    fontFamily: "'Allura', cursive",
    className: 'font-allura',
    styleBadge: 'Clean Calligraphy',
    isRecommendedFor: ['modern-gold'],
  },
  {
    id: 'pinyon',
    name: 'Pinyon Script',
    category: 'Signature',
    fontFamily: "'Pinyon Script', cursive",
    className: 'font-pinyon',
    styleBadge: 'Vintage Diplomatic',
  },
  // Modern & Clean
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Modern',
    fontFamily: "'Montserrat', sans-serif",
    className: 'font-montserrat',
    styleBadge: 'Bold Modern',
    isRecommendedFor: ['modern-gold'],
  },
  {
    id: 'baskerville',
    name: 'Libre Baskerville',
    category: 'Modern',
    fontFamily: "'Libre Baskerville', Georgia, serif",
    className: 'font-baskerville',
    styleBadge: 'Editorial Clean',
  },
];

export const FONT_CATEGORIES = ['All', 'Elegant', 'Signature', 'Modern'] as const;
