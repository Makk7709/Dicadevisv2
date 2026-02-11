import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Trash2, FileText, Plus } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getAllQuotes, deleteQuote } from '../utils/storage';
import { seedDemoQuotes } from '../utils/seedData';
import { Quote } from '../types';

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    seedDemoQuotes();
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    const allQuotes = getAllQuotes();
    setQuotes(allQuotes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      deleteQuote(id);
      loadQuotes();
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.decor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.department.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Mes Devis</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gérez et consultez tous vos devis DICA
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par client, décor ou département..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quotes Grid */}
        {filteredQuotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote) => (
              <Card key={quote.id} className="p-6 hover:shadow-xl transition-all duration-200 bg-white border-border hover:border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {quote.clientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(quote.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge 
                    className={quote.panelType === 'stratifie' ? 'bg-primary shadow-sm' : 'bg-accent shadow-sm'}
                  >
                    {quote.panelType === 'stratifie' ? 'STRATIFIÉ' : 'COMPACT'}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Décor</span>
                    <span className="font-medium text-foreground">{quote.decor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-medium text-foreground">{quote.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quantité</span>
                    <span className="font-medium text-foreground">{quote.quantity} panneaux</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Département</span>
                    <span className="font-medium text-foreground">{quote.department}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    onClick={() => navigate(`/devis/${quote.id}`)}
                    className="flex-1 shadow-sm"
                    variant="default"
                  >
                    Ouvrir
                  </Button>
                  <Button
                    onClick={() => handleDelete(quote.id)}
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {searchTerm ? 'Aucun devis trouvé' : 'Aucun devis enregistré'}
            </h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {searchTerm 
                ? 'Essayez avec d\'autres termes de recherche'
                : 'Commencez par créer votre premier devis pour vos clients'
              }
            </p>
            {!searchTerm && (
              <Link to="/nouveau">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                  <Plus className="w-5 h-5" />
                  Créer mon premier devis
                </Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}