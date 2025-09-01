import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent {
  @Input() quote!: Quote | null;
  @Input() deletable = false;
  @Output() deleteQuote = new EventEmitter<number>();
}
