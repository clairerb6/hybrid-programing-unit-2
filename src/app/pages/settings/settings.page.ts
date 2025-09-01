import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonList,
  IonToggle
} from "@ionic/angular/standalone";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [ IonToggle, IonToolbar, CommonModule, FormsModule, IonHeader, IonTitle, IonButtons, IonBackButton, IonContent, IonItem, IonLabel],
})
export class SettingsPage {
  allowDelete: boolean = false;
}
