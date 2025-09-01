import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService } from 'src/app/services/quotes';
import { IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList, IonText } from "@ionic/angular/standalone";  
import { Quote } from 'src/app/models/quote.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  imports: [IonText, 
    IonList,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonHeader,
    FormsModule,
    CommonModule,
  ],
})
export class ManagePage implements OnInit {
  quotes: Quote[] = [];
  newQuote: Quote = { id: 0, text: '', author: '', createdAt: new Date().getTime() };
  errorMessages: string[] = [];

  constructor(private quotesService: QuotesService) {}
  

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quotes = this.quotesService.getAllQuotes();
  }

  addQuote() {
    this.errorMessages = [];

    if (!this.newQuote.text || this.newQuote.text.trim().length < 5) {
      this.errorMessages.push('La frase debe tener al menos 5 caracteres.');
    }

    if (!this.newQuote.author || this.newQuote.author.trim().length < 2) {
      this.errorMessages.push('El autor debe tener al menos 2 caracteres.');
    }
    if (this.errorMessages) return;

    this.quotesService.addQuote({ ...this.newQuote });
    this.newQuote = { id: 0, text: '', author: '', createdAt: new Date().getTime() };
    this.loadQuotes();
  }

  deleteQuote(index: number | undefined) {
    this.quotesService.deleteQuote(index as number);
    this.loadQuotes();
  }
}
