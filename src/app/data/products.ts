import { Decor, PanelType } from '../types';

// Base de données des décors disponibles
export const DECORS: Decor[] = [
  // Stratifié - Uniti
  { id: 's-u1', name: 'Blanc Pur', category: 'Uniti', panelType: 'stratifie' },
  { id: 's-u2', name: 'Gris Béton', category: 'Uniti', panelType: 'stratifie' },
  { id: 's-u3', name: 'Noir Profond', category: 'Uniti', panelType: 'stratifie' },
  { id: 's-u4', name: 'Sable', category: 'Uniti', panelType: 'stratifie' },
  
  // Stratifié - Classic Woods
  { id: 's-cw1', name: 'Chêne Naturel', category: 'Classic Woods', panelType: 'stratifie' },
  { id: 's-cw2', name: 'Noyer Américain', category: 'Classic Woods', panelType: 'stratifie' },
  { id: 's-cw3', name: 'Teck Doré', category: 'Classic Woods', panelType: 'stratifie' },
  { id: 's-cw4', name: 'Ébène', category: 'Classic Woods', panelType: 'stratifie' },
  
  // Stratifié - Marmi
  { id: 's-m1', name: 'Carrare Blanc', category: 'Marmi', panelType: 'stratifie' },
  { id: 's-m2', name: 'Calacatta Or', category: 'Marmi', panelType: 'stratifie' },
  { id: 's-m3', name: 'Emperador Foncé', category: 'Marmi', panelType: 'stratifie' },
  
  // Stratifié - Digital
  { id: 's-d1', name: 'Béton Architectonique', category: 'Digital', panelType: 'stratifie' },
  { id: 's-d2', name: 'Métal Brossé', category: 'Digital', panelType: 'stratifie' },
  { id: 's-d3', name: 'Terrazzo Milano', category: 'Digital', panelType: 'stratifie' },
  
  // Compact - Uniti
  { id: 'c-u1', name: 'Blanc Alpin', category: 'Uniti', panelType: 'compact' },
  { id: 'c-u2', name: 'Gris Anthracite', category: 'Uniti', panelType: 'compact' },
  { id: 'c-u3', name: 'Noir Mat', category: 'Uniti', panelType: 'compact' },
  
  // Compact - Classic Woods
  { id: 'c-cw1', name: 'Chêne Rustique', category: 'Classic Woods', panelType: 'compact' },
  { id: 'c-cw2', name: 'Pin Nordique', category: 'Classic Woods', panelType: 'compact' },
  
  // Compact - Marmi
  { id: 'c-m1', name: 'Marbre Statuaire', category: 'Marmi', panelType: 'compact' },
  { id: 'c-m2', name: 'Travertin', category: 'Marmi', panelType: 'compact' },
  
  // Compact - Digital
  { id: 'c-d1', name: 'Acier Inox', category: 'Digital', panelType: 'compact' },
  { id: 'c-d2', name: 'Cuivre Patiné', category: 'Digital', panelType: 'compact' },
];

// Épaisseurs disponibles par type de panneau
export const THICKNESSES: Record<PanelType, number[]> = {
  stratifie: [0.8, 1.0, 1.2, 1.5],
  compact: [2, 3, 4, 6, 8, 10, 12, 13],
};

// Prix de base au m² (simulé)
export const BASE_PRICES: Record<PanelType, number> = {
  stratifie: 45.0,
  compact: 85.0,
};

// Coûts des options
export const OPTION_PRICES = {
  digitalPrinting: 12.5,
  fireResistant: 8.0,
  protectiveFilm: 2.5,
  blackCore: 5.0,
  ac3: 0.65,
  ac5: 0.65,
};

// Calcul de la surface d'un panneau en m²
export function getPanelArea(format: string): number {
  const [width, height] = format.replace('mm', '').split('x').map(Number);
  return (width * height) / 1000000; // Conversion mm² -> m²
}
