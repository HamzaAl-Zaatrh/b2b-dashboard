import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from '@core/loader/loader.service';
import { AppLoaderComponent } from '@core/loader/app-loader/app-loader.component';
import { TranslateService } from '@ngx-translate/core';
import translationsEN from '../../public/i18n/en.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLoaderComponent],
  template: `
    @if (showLoader()) {
      <app-loader></app-loader>
    }
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  showLoader = inject(LoaderService).progressBarStatus;
  translate = inject(TranslateService);

  constructor() {
    this.translate.setTranslation('ar', translationsEN);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }
}
