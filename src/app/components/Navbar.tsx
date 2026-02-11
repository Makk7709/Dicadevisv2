import { Link, useLocation } from 'react-router';
import { Logo } from './Logo';
import { FileText, Plus } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0 transition-opacity hover:opacity-80">
            <Logo />
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/"
              className={`text-xs sm:text-sm font-medium transition-all hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Mes Devis</span>
              </div>
            </Link>
            
            <Link to="/nouveau">
              <Button className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 shadow-sm hover:shadow-md transition-shadow">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nouveau Devis</span>
                <span className="sm:hidden">Nouveau</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}