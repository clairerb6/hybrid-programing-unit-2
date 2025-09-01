import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private deleteOnHome = false;

  setDeleteOnHome(v: boolean) { this.deleteOnHome = v; }
  getDeleteOnHome() { return this.deleteOnHome; }
}
