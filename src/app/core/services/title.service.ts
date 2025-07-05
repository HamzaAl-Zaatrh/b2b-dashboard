import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Service for managing the document title.
 * Provides a method to set the browser tab's title.
 */
@Injectable({
  providedIn: 'root',
})
export class TitleService {
  /** Angular Title service instance */
  title = inject(Title);

  /**
   * Sets the document title.
   * @param newTitle The new title to set for the document.
   */
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
