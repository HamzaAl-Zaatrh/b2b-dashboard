import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {provideTranslateService} from '@ngx-translate/core';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideAnimationsAsync(),

    provideHttpClient(
      withFetch(),
      // We can Inject interceptors here
    ),

    provideTranslateService({
      defaultLanguage: 'en',
    }),

    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),

    // Provide the default options for the dialog
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        disableClose: true,
        minWidth: '80vw',
        autoFocus: 'first-tabbable',
        enterAnimationDuration: 200,
        exitAnimationDuration: 100,
      },
    },
  ];
}
