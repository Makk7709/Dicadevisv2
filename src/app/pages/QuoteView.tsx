import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getQuoteById } from '../utils/storage';
import { calculateQuote } from '../utils/calculations';
import { Quote, QuoteCalculation } from '../types';

export default function QuoteView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [calculation, setCalculation] = useState<QuoteCalculation | null>(null);

  useEffect(() => {
    if (id) {
      const foundQuote = getQuoteById(id);
      if (foundQuote) {
        setQuote(foundQuote);
        setCalculation(calculateQuote(foundQuote));
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (quote && calculation) {
      const data = {
        quote,
        calculation,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis-${quote.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!quote || !calculation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/30">
      {/* Action Bar - Hidden on print */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="outline" onClick={() => navigate('/')} className="gap-2 shadow-sm" size="sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour</span>
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportJSON} className="gap-2 shadow-sm" size="sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export JSON</span>
              </Button>
              <Button onClick={handlePrint} className="gap-2 shadow-md" size="sm">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimer PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Document */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 print:px-12 print:py-8">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-border">
            <Logo className="print:scale-125" />
            <div className="text-right">
              <h1 className="text-2xl font-bold text-foreground mb-2">DEVIS DICA</h1>
              <div className="inline-block bg-secondary px-4 py-2 rounded-lg">
                <p className="text-sm text-muted-foreground">Référence</p>
                <p className="font-mono font-bold text-lg text-foreground">{quote.id}</p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">{quote.clientName}</h2>
            <p className="text-muted-foreground">
              Date: {new Date(quote.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} • Département: {quote.department}
            </p>
          </div>

          {/* Technical Summary */}
          <div className="mb-8 bg-secondary/50 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">TECHNOLOGIE</p>
                <Badge className={quote.panelType === 'stratifie' ? 'bg-primary' : 'bg-accent'}>
                  {quote.panelType === 'stratifie' ? 'STRATIFIÉ' : 'COMPACT'}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">DÉCOR</p>
                <p className="font-bold text-foreground">{quote.decor}</p>
                <p className="text-xs text-muted-foreground">{quote.decorCategory}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">FINITION</p>
                <p className="font-bold text-foreground">{quote.finish}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">FORMAT</p>
                <p className="font-bold text-foreground">{quote.format}</p>
                <p className="text-xs text-muted-foreground">{quote.thickness}mm</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">VOLUME</p>
                <p className="font-bold text-foreground">{calculation.totalArea.toFixed(2)} m²</p>
                <p className="text-xs text-muted-foreground">{quote.quantity} panneaux</p>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Détail des Postes</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-bold text-foreground">Détail des Postes</th>
                    <th className="text-right px-4 py-3 text-sm font-bold text-foreground">P.U. (€)</th>
                    <th className="text-right px-4 py-3 text-sm font-bold text-foreground">Quantité</th>
                    <th className="text-right px-4 py-3 text-sm font-bold text-foreground">Coût/m² HT</th>
                    <th className="text-right px-4 py-3 text-sm font-bold text-foreground">Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  {calculation.breakdown.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-secondary/20'}>
                      <td className={`px-4 py-3 ${item.isOption ? 'text-primary italic' : 'font-medium text-foreground'}`}>
                        {item.isOption && <span className="text-primary mr-2">+</span>}
                        {item.label}
                      </td>
                      <td className="text-right px-4 py-3 text-foreground">
                        {item.unitPrice ? `${item.unitPrice.toFixed(2)} €` : '—'}
                      </td>
                      <td className="text-right px-4 py-3 text-foreground">
                        {item.quantity || '—'}
                      </td>
                      <td className="text-right px-4 py-3 text-foreground">
                        {item.costPerM2 ? `${item.costPerM2.toFixed(2)} €` : '—'}
                      </td>
                      <td className="text-right px-4 py-3 font-bold text-foreground">
                        {item.totalHT.toFixed(2)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Coût de revient moyen</p>
                <p className="text-3xl font-bold text-primary">
                  {calculation.basePricePerM2.toFixed(2)} €/m²
                </p>
              </Card>
              
              <Card className="p-4 border-dashed">
                <p className="text-sm text-muted-foreground mb-1">Total HT Brut (avant coefficient)</p>
                <p className="text-xl font-bold text-foreground">
                  {calculation.subtotalBeforeCoef.toFixed(2)} €
                </p>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-foreground">Sous-total Panneaux & Options</span>
                <span className="font-bold text-foreground">{calculation.subtotalBeforeCoef.toFixed(2)} €</span>
              </div>
              
              <Card className="p-3 bg-primary text-white">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Coefficient multiplicateur</span>
                  <span className="text-2xl font-bold">× {quote.salesCoefficient.toFixed(2)}</span>
                </div>
              </Card>
              
              <div className="flex justify-between items-center py-2 border-t border-border">
                <span className="text-foreground">Poste Produits HT (après coef.)</span>
                <span className="font-bold text-foreground">{calculation.subtotalAfterCoef.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-foreground">Logistique & Transport HT</span>
                <span className="font-bold text-foreground">{calculation.logistics.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-t-2 border-border">
                <span className="text-xl font-bold text-foreground">TOTAL HT FINAL</span>
                <span className="text-2xl font-bold text-foreground">{calculation.totalHT.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">TVA 20%</span>
                <span className="text-muted-foreground">{calculation.tva.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t-4 border-primary bg-primary/5 px-4 rounded-lg">
                <span className="text-xl font-bold text-foreground">TOTAL TTC</span>
                <span className="text-3xl font-bold text-primary">{calculation.totalTTC.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground italic text-center">
              Ce devis est valable 30 jours à compter de sa date d'émission. 
              Les prix sont indiqués en euros HT et TTC. Conditions générales de vente disponibles sur demande.
              DICA France - Panneaux décoratifs industriels - Stratifié HPL & Compact.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}