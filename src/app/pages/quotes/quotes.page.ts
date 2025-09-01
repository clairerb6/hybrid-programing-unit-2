import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService } from 'src/app/services/quotes';
import { IonContent, IonToolbar, IonHeader, IonButton, IonTitle, IonButtons, IonCardContent, IonCard } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { Quote } from 'src/app/models/quote.model';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  imports: [IonCard, IonCardContent, IonButtons, IonToolbar, IonContent, IonHeader, IonButton, IonTitle, FormsModule, CommonModule, RouterLink],
})
export class QuotesPage implements OnInit {
  randomQuote!: Quote;

  constructor(private quotesService: QuotesService) {}

  ngOnInit() {
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.randomQuote = this.quotesService.getRandomQuote();
  }
}
