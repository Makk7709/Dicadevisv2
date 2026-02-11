import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Quote, PanelType, Finish, Format, ACLevel } from '../types';
import { DECORS, THICKNESSES } from '../data/products';
import { saveQuote, generateQuoteId } from '../utils/storage';

export default function NewQuote() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    department: '',
    panelType: 'stratifie' as PanelType,
    decor: '',
    finish: 'Standard' as Finish,
    format: '2440x1220mm' as Format,
    thickness: 0.8,
    quantity: 1,
    digitalPrinting: false,
    fireResistant: false,
    protectiveFilm: false,
    blackCore: false,
    acLevel: 'Aucun' as ACLevel,
    salesCoefficient: 1.5,
  });

  const availableDecors = useMemo(() => 
    DECORS.filter(d => d.panelType === formData.panelType),
    [formData.panelType]
  );

  const availableThicknesses = useMemo(() => 
    THICKNESSES[formData.panelType],
    [formData.panelType]
  );

  const handlePanelTypeChange = (value: PanelType) => {
    setFormData(prev => ({
      ...prev,
      panelType: value,
      decor: '',
      thickness: THICKNESSES[value][0],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.clientName.trim()) {
      newErrors.push('Le nom du client est requis');
    }
    if (!formData.department.trim()) {
      newErrors.push('Le département de livraison est requis');
    }
    if (!formData.decor) {
      newErrors.push('Veuillez sélectionner un décor');
    }
    if (formData.quantity < 1) {
      newErrors.push('La quantité doit être supérieure à 0');
    }
    if (formData.salesCoefficient < 1) {
      newErrors.push('Le coefficient de vente doit être au minimum 1.0');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const selectedDecor = DECORS.find(d => d.id === formData.decor);
    
    const quote: Quote = {
      id: generateQuoteId(),
      clientName: formData.clientName,
      date: formData.date,
      department: formData.department,
      panelType: formData.panelType,
      decor: selectedDecor?.name || '',
      decorCategory: selectedDecor?.category || 'Uniti',
      finish: formData.finish,
      format: formData.format,
      thickness: formData.thickness,
      quantity: formData.quantity,
      digitalPrinting: formData.digitalPrinting,
      fireResistant: formData.fireResistant,
      protectiveFilm: formData.protectiveFilm,
      blackCore: formData.blackCore,
      acLevel: formData.acLevel,
      salesCoefficient: formData.salesCoefficient,
      createdAt: new Date().toISOString(),
    };
    
    saveQuote(quote);
    navigate(`/devis/${quote.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Nouveau Devis</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Créez un nouveau devis pour votre client
          </p>
        </div>

        {errors.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 - Client & Logistique */}
          <Card className="p-6 bg-white shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-foreground">Client & Logistique</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientName">Nom du client *</Label>
                <Input
                  id="clientName"
                  placeholder="Ex: Menuiserie Durand"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  className="bg-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date du devis</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="department">Département de livraison *</Label>
                  <Input
                    id="department"
                    placeholder="Ex: 69"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2 - Configuration Produit */}
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-xl font-bold text-foreground">Configuration Produit</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="panelType">Type de panneau *</Label>
                <Select value={formData.panelType} onValueChange={handlePanelTypeChange}>
                  <SelectTrigger id="panelType" className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stratifie">Stratifié (HPL)</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="decor">Décor *</Label>
                <Select value={formData.decor} onValueChange={(value) => setFormData(prev => ({ ...prev, decor: value }))}>
                  <SelectTrigger id="decor" className="bg-white">
                    <SelectValue placeholder="Sélectionnez un décor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDecors.map(decor => (
                      <SelectItem key={decor.id} value={decor.id}>
                        {decor.name} — {decor.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="finish">Finition</Label>
                <Select value={formData.finish} onValueChange={(value: Finish) => setFormData(prev => ({ ...prev, finish: value }))}>
                  <SelectTrigger id="finish" className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Mat (Anti-traces)">Mat (Anti-traces)</SelectItem>
                    <SelectItem value="Brillant (Lucidato)">Brillant (Lucidato)</SelectItem>
                    <SelectItem value="Roche (Pietra)">Roche (Pietra)</SelectItem>
                    <SelectItem value="Grainé">Grainé</SelectItem>
                    <SelectItem value="Satiné">Satiné</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select value={formData.format} onValueChange={(value: Format) => setFormData(prev => ({ ...prev, format: value }))}>
                    <SelectTrigger id="format" className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2440x1220mm">2440x1220mm</SelectItem>
                      <SelectItem value="2800x1300mm">2800x1300mm</SelectItem>
                      <SelectItem value="3050x1300mm">3050x1300mm</SelectItem>
                      <SelectItem value="4200x1300mm">4200x1300mm</SelectItem>
                      <SelectItem value="4200x1610mm">4200x1610mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="thickness">Épaisseur (mm)</Label>
                  <Select value={String(formData.thickness)} onValueChange={(value) => setFormData(prev => ({ ...prev, thickness: parseFloat(value) }))}>
                    <SelectTrigger id="thickness" className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableThicknesses.map(t => (
                        <SelectItem key={t} value={String(t)}>{t}mm</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantité (panneaux)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3 - Options & Spécificités */}
          <Card className="p-6 bg-secondary/50 border-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-xl font-bold text-foreground">Options & Spécificités</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digitalPrinting" className="cursor-pointer">
                      Impression Digitale
                    </Label>
                    <p className="text-sm text-muted-foreground">+12.50€/m²</p>
                  </div>
                  <Switch
                    id="digitalPrinting"
                    checked={formData.digitalPrinting}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, digitalPrinting: checked }))}
                  />
                </div>
              </Card>
              
              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fireResistant" className="cursor-pointer">
                      Traitement Ignifuge
                    </Label>
                    <p className="text-sm text-muted-foreground">+8.00€/m²</p>
                  </div>
                  <Switch
                    id="fireResistant"
                    checked={formData.fireResistant}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fireResistant: checked }))}
                  />
                </div>
              </Card>
              
              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="protectiveFilm" className="cursor-pointer">
                      Film de protection
                    </Label>
                    <p className="text-sm text-muted-foreground">+2.50€/m²</p>
                  </div>
                  <Switch
                    id="protectiveFilm"
                    checked={formData.protectiveFilm}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, protectiveFilm: checked }))}
                  />
                </div>
              </Card>
              
              <Card className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="blackCore" className="cursor-pointer">
                      Âme Noire (Black Core)
                    </Label>
                    <p className="text-sm text-muted-foreground">+5.00€/m²</p>
                  </div>
                  <Switch
                    id="blackCore"
                    checked={formData.blackCore}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, blackCore: checked }))}
                  />
                </div>
              </Card>
            </div>
            
            <div>
              <Label htmlFor="acLevel">Niveau de résistance AC</Label>
              <Select value={formData.acLevel} onValueChange={(value: ACLevel) => setFormData(prev => ({ ...prev, acLevel: value }))}>
                <SelectTrigger id="acLevel" className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aucun">Aucun</SelectItem>
                  <SelectItem value="AC3">AC3 (+0.65€/m²)</SelectItem>
                  <SelectItem value="AC5">AC5 (+0.65€/m²)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Section 4 - Coefficient de vente */}
          <Card className="p-6 bg-white border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                4
              </div>
              <h2 className="text-xl font-bold text-foreground">Coefficient de vente</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <Label htmlFor="salesCoefficient">Coefficient multiplicateur</Label>
                <Input
                  id="salesCoefficient"
                  type="number"
                  step="0.1"
                  min="1"
                  value={formData.salesCoefficient}
                  onChange={(e) => setFormData(prev => ({ ...prev, salesCoefficient: parseFloat(e.target.value) || 1 }))}
                  className="bg-white"
                />
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">
                  × {formData.salesCoefficient.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full text-lg py-6 shadow-lg">
            GÉNÉRER LE DEVIS
          </Button>
        </form>
      </main>
    </div>
  );
}