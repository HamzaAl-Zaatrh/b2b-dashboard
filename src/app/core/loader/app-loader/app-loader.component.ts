import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.scss',
})
export class AppLoaderComponent {
  isGlobal = input<boolean>(true);
}
