import { Quote, QuoteCalculation } from '../types';
import { BASE_PRICES, OPTION_PRICES, getPanelArea } from '../data/products';

export function calculateQuote(quote: Quote): QuoteCalculation {
  const panelArea = getPanelArea(quote.format);
  const totalArea = panelArea * quote.quantity;
  
  // Prix de base
  const basePricePerM2 = BASE_PRICES[quote.panelType];
  const baseCost = basePricePerM2 * totalArea;
  
  // Calcul des options
  let optionsCost = 0;
  const breakdown: QuoteCalculation['breakdown'] = [];
  
  // Panneau de base
  breakdown.push({
    label: `Panneaux ${quote.panelType === 'stratifie' ? 'STRATIFIÉ' : 'COMPACT'} ${quote.decor}`,
    unitPrice: basePricePerM2,
    quantity: quote.quantity,
    costPerM2: basePricePerM2,
    totalHT: baseCost,
  });
  
  // Options
  if (quote.digitalPrinting) {
    const cost = OPTION_PRICES.digitalPrinting * totalArea;
    optionsCost += cost;
    breakdown.push({
      label: 'Impression Digitale',
      costPerM2: OPTION_PRICES.digitalPrinting,
      totalHT: cost,
      isOption: true,
    });
  }
  
  if (quote.fireResistant) {
    const cost = OPTION_PRICES.fireResistant * totalArea;
    optionsCost += cost;
    breakdown.push({
      label: 'Traitement Ignifuge',
      costPerM2: OPTION_PRICES.fireResistant,
      totalHT: cost,
      isOption: true,
    });
  }
  
  if (quote.protectiveFilm) {
    const cost = OPTION_PRICES.protectiveFilm * totalArea;
    optionsCost += cost;
    breakdown.push({
      label: 'Film de protection',
      costPerM2: OPTION_PRICES.protectiveFilm,
      totalHT: cost,
      isOption: true,
    });
  }
  
  if (quote.blackCore) {
    const cost = OPTION_PRICES.blackCore * totalArea;
    optionsCost += cost;
    breakdown.push({
      label: 'Âme Noire (Black Core)',
      costPerM2: OPTION_PRICES.blackCore,
      totalHT: cost,
      isOption: true,
    });
  }
  
  if (quote.acLevel === 'AC3' || quote.acLevel === 'AC5') {
    const cost = OPTION_PRICES.ac3 * totalArea;
    optionsCost += cost;
    breakdown.push({
      label: `Résistance ${quote.acLevel}`,
      costPerM2: OPTION_PRICES.ac3,
      totalHT: cost,
      isOption: true,
    });
  }
  
  const subtotalBeforeCoef = baseCost + optionsCost;
  const subtotalAfterCoef = subtotalBeforeCoef * quote.salesCoefficient;
  
  // Logistique (simulation : 5% du total produits)
  const logistics = subtotalAfterCoef * 0.05;
  
  const totalHT = subtotalAfterCoef + logistics;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;
  
  return {
    panelArea,
    totalArea,
    basePricePerM2,
    optionsCost,
    subtotalBeforeCoef,
    subtotalAfterCoef,
    logistics,
    totalHT,
    tva,
    totalTTC,
    breakdown,
  };
}
