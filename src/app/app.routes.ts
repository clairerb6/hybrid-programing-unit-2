import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quotes',
    pathMatch: 'full'
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('./pages/quotes/quotes.page').then(m => m.QuotesPage)
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./pages/manage/manage.page').then(m => m.ManagePage)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then(m => m.SettingsPage)
  }
];
