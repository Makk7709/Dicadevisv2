// Types pour l'application DICA Devis

export type PanelType = 'stratifie' | 'compact';

export type DecorCategory = 'Uniti' | 'Classic Woods' | 'Marmi' | 'Digital';

export type Finish = 'Standard' | 'Mat (Anti-traces)' | 'Brillant (Lucidato)' | 'Roche (Pietra)' | 'Grainé' | 'Satiné';

export type Format = '2440x1220mm' | '2800x1300mm' | '3050x1300mm' | '4200x1300mm' | '4200x1610mm';

export type ACLevel = 'Aucun' | 'AC3' | 'AC5';

export interface Decor {
  id: string;
  name: string;
  category: DecorCategory;
  panelType: PanelType;
}

export interface Quote {
  id: string;
  clientName: string;
  date: string;
  department: string;
  panelType: PanelType;
  decor: string;
  decorCategory: DecorCategory;
  finish: Finish;
  format: Format;
  thickness: number;
  quantity: number;
  digitalPrinting: boolean;
  fireResistant: boolean;
  protectiveFilm: boolean;
  blackCore: boolean;
  acLevel: ACLevel;
  salesCoefficient: number;
  createdAt: string;
}

export interface QuoteCalculation {
  panelArea: number;
  totalArea: number;
  basePricePerM2: number;
  optionsCost: number;
  subtotalBeforeCoef: number;
  subtotalAfterCoef: number;
  logistics: number;
  totalHT: number;
  tva: number;
  totalTTC: number;
  breakdown: {
    label: string;
    unitPrice?: number;
    quantity?: number;
    costPerM2?: number;
    totalHT: number;
    isOption?: boolean;
  }[];
}
