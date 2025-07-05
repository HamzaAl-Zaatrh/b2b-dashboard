
import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemeType = 'dark-mode' | 'light-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /** We use document object from angular and this is good for SSR */
  document = inject(DOCUMENT);
  /** key to store the theme in the localStorage and the name of the attribute at the same time */
  private readonly themeKey = 'app-theme';
  /**signal to contain the current theme */
  currentTheme = signal<ThemeType>('light-mode');

  constructor() {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);

    if (savedTheme === 'dark-mode' || savedTheme === 'light-mode') {
      this.currentTheme.set(savedTheme);

      this.document.body.setAttribute(this.themeKey, this.currentTheme());
    } else {
      //! WARNING: the window object available only in the browser environment
      //INFO: we can use this.document.defaultView that returns the window associated with the current document
      const systemThemeIsDark = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
      const systemTheme = systemThemeIsDark ? 'dark-mode' : 'light-mode';
      this.currentTheme.set(systemTheme);
      this.document.body.setAttribute(this.themeKey, this.currentTheme());
    }
  }

  toggleTheme(theme: ThemeType): void {
    // update the current theme
    this.currentTheme.set(theme);

    // set the theme to the localStorage
    localStorage.setItem(this.themeKey, theme);
    this.document.body.setAttribute(this.themeKey, this.currentTheme());
  }
}
