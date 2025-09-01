import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonContent
} from '@ionic/angular/standalone';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonContent,
    CommonModule,
    RouterOutlet,
],
})
export class AppComponent {
  constructor() {}
}
