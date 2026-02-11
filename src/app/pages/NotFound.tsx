import { Link } from 'react-router';
import { FileQuestion, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-6">
            <FileQuestion className="w-16 h-16 text-muted-foreground" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Page introuvable
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <Link to="/">
            <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-shadow">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
