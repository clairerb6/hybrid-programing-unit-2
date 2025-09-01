import { Component, OnInit } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [ IonToggle, IonToolbar, CommonModule, FormsModule, IonHeader, IonTitle, IonButtons, IonBackButton, IonContent, IonItem, IonLabel],
})
export class SettingsPage implements OnInit {
  allowDeleteOnRandom: boolean = false;

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'allowDeleteOnRandom' });
    this.allowDeleteOnRandom = value === 'true';
  }

  async toggleAllowDelete() {
    this.allowDeleteOnRandom = !this.allowDeleteOnRandom;
    await Preferences.set({
      key: 'allowDeleteOnRandom',
      value: this.allowDeleteOnRandom.toString(),
    });
  }
}