// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // <-- Ajoutez ceci
import { routes } from './app.routes'; // <-- Importez vos routes

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes), // <-- Configurez le router ici
  ]
};