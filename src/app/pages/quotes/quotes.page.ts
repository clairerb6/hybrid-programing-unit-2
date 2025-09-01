import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService } from 'src/app/services/quotes';
import { IonContent, IonToolbar, IonHeader, IonButton, IonTitle, IonButtons, IonCardContent, IonCard } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { Quote } from 'src/app/models/quote.model';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  imports: [IonCard, IonCardContent, IonButtons, IonToolbar, IonContent, IonHeader, IonButton, IonTitle, FormsModule, CommonModule, RouterLink],
})
export class QuotesPage implements OnInit {
  allowDeleteOnRandom: boolean = false;
  randomQuote!: Quote;

  constructor(private quotesService: QuotesService) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'allowDeleteOnRandom' });
    this.allowDeleteOnRandom = value === 'true';
    this.loadRandomQuote();
  }

  async loadRandomQuote() {
    await this.quotesService.getRandomQuote().then((quote) => {
      this.randomQuote = quote as Quote;
    });
  }

  async deleteQuote() {
    if (this.randomQuote) {
      await this.quotesService.deleteQuote(this.randomQuote.id);
      await this.loadRandomQuote();
    }
  }

  getRandomQuote() {
    this.loadRandomQuote();
  }
}
