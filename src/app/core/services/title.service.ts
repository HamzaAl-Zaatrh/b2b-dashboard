import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  title = inject(Title);

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
