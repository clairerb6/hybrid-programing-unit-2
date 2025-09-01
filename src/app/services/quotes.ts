import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotes: Quote[] = [
    { id: 1, text: 'La vida es un 10% lo que me ocurre y 90% cómo reacciono a ello.', author: 'Charles R. Swindoll', createdAt: new Date().getTime() },
    { id: 2, text: 'El conocimiento es poder.', author: 'Francis Bacon', createdAt: new Date().getTime() },
    { id: 3, text: 'La imaginación lo es todo. Es la vista previa de lo que la vida va a traer.', author: 'Albert Einstein', createdAt: new Date().getTime() },
    { id: 4, text: 'La vida es sueño.', author: 'Calderón de la Barca', createdAt: new Date().getTime() },
    { id: 5, text: 'Pienso, luego existo.', author: 'Descartes', createdAt: new Date().getTime() },
    { id: 6, text: 'Sé tú el cambio que quieres ver en el mundo.', author: 'Gandhi', createdAt: new Date().getTime() }
  ];

  getAllQuotes() {
    return [...this.quotes];
  }

  getRandomQuote(): Quote {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  addQuote(quote: Quote) {
    quote.id = this.quotes.length + 1;
    quote.createdAt = new Date().getTime();
    this.quotes.push(quote);
  }

  deleteQuote(index: number) {
    const quote = this.quotes.find(q => q.id === index);
    if (!quote) return;
    this.quotes.splice(this.quotes.indexOf(quote), 1);
  }
}
