import { Quote } from '../types';
import { saveQuote } from './storage';

export function seedDemoQuotes() {
  // Ne créer les données que si le localStorage est vide
  const existingData = localStorage.getItem('dica_quotes');
  if (existingData) return;

  const demoQuotes: Quote[] = [
    {
      id: 'A7F3B2C1',
      clientName: 'Menuiserie Durand',
      date: '2026-02-10',
      department: '69',
      panelType: 'stratifie',
      decor: 'Chêne Naturel',
      decorCategory: 'Classic Woods',
      finish: 'Mat (Anti-traces)',
      format: '2440x1220mm',
      thickness: 0.8,
      quantity: 25,
      digitalPrinting: false,
      fireResistant: true,
      protectiveFilm: true,
      blackCore: false,
      acLevel: 'AC3',
      salesCoefficient: 1.5,
      createdAt: '2026-02-10T10:30:00.000Z',
    },
    {
      id: '9D2E8K4F',
      clientName: 'Architecture Moderne SARL',
      date: '2026-02-08',
      department: '75',
      panelType: 'compact',
      decor: 'Marbre Statuaire',
      decorCategory: 'Marmi',
      finish: 'Brillant (Lucidato)',
      format: '3050x1300mm',
      thickness: 12,
      quantity: 15,
      digitalPrinting: true,
      fireResistant: false,
      protectiveFilm: true,
      blackCore: true,
      acLevel: 'AC5',
      salesCoefficient: 1.8,
      createdAt: '2026-02-08T14:15:00.000Z',
    },
    {
      id: 'C5H1N7P3',
      clientName: 'BTP Solutions Lyon',
      date: '2026-02-05',
      department: '69',
      panelType: 'stratifie',
      decor: 'Gris Béton',
      decorCategory: 'Uniti',
      finish: 'Standard',
      format: '2800x1300mm',
      thickness: 1.0,
      quantity: 40,
      digitalPrinting: false,
      fireResistant: false,
      protectiveFilm: false,
      blackCore: false,
      acLevel: 'Aucun',
      salesCoefficient: 1.4,
      createdAt: '2026-02-05T09:00:00.000Z',
    },
  ];

  demoQuotes.forEach(quote => saveQuote(quote));
}
