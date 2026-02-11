import { Quote } from '../types';

const STORAGE_KEY = 'dica_quotes';

export function saveQuote(quote: Quote): void {
  const quotes = getAllQuotes();
  const existingIndex = quotes.findIndex(q => q.id === quote.id);
  
  if (existingIndex >= 0) {
    quotes[existingIndex] = quote;
  } else {
    quotes.push(quote);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

export function getAllQuotes(): Quote[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getQuoteById(id: string): Quote | null {
  const quotes = getAllQuotes();
  return quotes.find(q => q.id === id) || null;
}

export function deleteQuote(id: string): void {
  const quotes = getAllQuotes();
  const filtered = quotes.filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function generateQuoteId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}
