import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './quote-form.component.html'
})
export class QuoteFormComponent {
  @Output() add = new EventEmitter<{ text: string; author: string }>();
  text = '';
  author = '';

  submit() {
    if (!this.text.trim() || !this.author.trim()) return;
    this.add.emit({ text: this.text.trim(), author: this.author.trim() });
    this.text = '';
    this.author = '';
  }
}
