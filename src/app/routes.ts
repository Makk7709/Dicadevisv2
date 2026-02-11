import { createBrowserRouter } from 'react-router';
import Dashboard from './pages/Dashboard';
import NewQuote from './pages/NewQuote';
import QuoteView from './pages/QuoteView';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/nouveau',
    Component: NewQuote,
  },
  {
    path: '/devis/:id',
    Component: QuoteView,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);