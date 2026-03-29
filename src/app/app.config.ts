import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import{provideAnimations} from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptor/loading/loading-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { headersInterceptor } from './core/interceptor/header/headers-interceptor';
import { unauthorizedInterceptor } from './core/interceptor/unauthorized/unauthorized-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
     provideAnimationsAsync(),
    importProvidersFrom(NgxSpinnerModule),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor,headersInterceptor,unauthorizedInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
