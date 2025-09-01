import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Quote } from '../models/quote.model';

const isWeb = Capacitor.getPlatform() === 'web';
const STORAGE_KEY = 'quotes_storage';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotesForEmptyDB: Quote[] = [
          { id: 1, text: 'La vida es un 10% lo que me ocurre y 90% cómo reacciono a ello.', author: 'Charles R. Swindoll', createdAt: new Date().getTime() },
          { id: 2, text: 'El conocimiento es poder.', author: 'Francis Bacon', createdAt: new Date().getTime() },
          { id: 3, text: 'La imaginación lo es todo. Es la vista previa de lo que la vida va a traer.', author: 'Albert Einstein', createdAt: new Date().getTime() },
          { id: 4, text: 'La vida es sueño.', author: 'Calderón de la Barca', createdAt: new Date().getTime() },
          { id: 5, text: 'Pienso, luego existo.', author: 'Descartes', createdAt: new Date().getTime() },
          { id: 6, text: 'Sé tú el cambio que quieres ver en el mundo.', author: 'Gandhi', createdAt: new Date().getTime() }
        ];  
  private quotes: Quote[] = [];
  private db!: SQLiteDBConnection;

  constructor() {
    if (isWeb) {
      this.loadFromStorage();
    } else {
      this.initSQLite();
    }
  }

  // ======================
  // Inicializar SQLite
  // ======================
  private async initSQLite() {
    try {
      const sqlite = CapacitorSQLite;
      this.db = (await sqlite.createConnection({
        database: 'quotes_db',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      }) as unknown) as SQLiteDBConnection;

      await this.db.open();

      // Crear tabla si no existe
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          author TEXT NOT NULL,
          createdAt INTEGER NOT NULL
        );
      `);

      // Si está vacía, insertar iniciales
      const result = await this.db.query('SELECT COUNT(*) as count FROM quotes');
      if (result.values && result.values[0].count === 0) {
        const initialQuotes: Quote[] = this.quotesForEmptyDB;

        for (let q of initialQuotes) {
          await this.db.run('INSERT INTO quotes (text, author, createdAt) VALUES (?, ?, ?)', [q.text, q.author, q.createdAt]);
        }
      }

      await this.loadFromSQLite();
    } catch (err) {
      console.error('Error inicializando SQLite:', err);
    }
  }

  // ======================
  // WEB: localStorage
  // ======================
  private loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.quotes = JSON.parse(data);
    } else {
      // Cargar iniciales en web
      this.quotes = this.quotesForEmptyDB;
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    if (isWeb) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.quotes));
    }
  }

  // ======================
  // Carga desde SQLite
  // ======================
  private async loadFromSQLite() {
    const result = await this.db.query('SELECT * FROM quotes');
    this.quotes = result.values ? result.values as Quote[] : [];
  }

  // ======================
  // Métodos públicos
  // ======================
  async getAllQuotes(): Promise<Quote[]> {
    if (isWeb) {
      return [...this.quotes];
    } else {
      await this.loadFromSQLite();
      return [...this.quotes];
    }
  }

  async getRandomQuote(): Promise<Quote> {
    if (this.quotes.length === 0) {
      if (!isWeb) await this.loadFromSQLite();
    }
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  async addQuote(quote: Quote) {
    quote.createdAt = new Date().getTime();

    if (isWeb) {
      quote.id = this.quotes.length ? Math.max(...this.quotes.map(q => q.id)) + 1 : 1;
      this.quotes.push(quote);
      this.saveToStorage();
    } else {
      await this.db.run('INSERT INTO quotes (text, author, createdAt) VALUES (?, ?, ?)', [quote.text, quote.author, quote.createdAt]);
      await this.loadFromSQLite();
    }
  }

  async deleteQuote(id: number) {
    if (isWeb) {
      this.quotes = this.quotes.filter(q => q.id !== id);
      this.saveToStorage();
    } else {
      await this.db.run('DELETE FROM quotes WHERE id = ?', [id]);
      await this.loadFromSQLite();
    }
  }
}
