import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'section-header',
  standalone: true,
  imports: [MatButton, MatIcon, TranslatePipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  title = input.required<string>();
  titleIcon = input<string | null>(null);
  actionName = input<string | null>(null);
  actionIcon = input<string | null>(null);
  isSubHeader = input<boolean>(false);

  onActionClicked = output<void>();

  onActionClick() {
    this.onActionClicked.emit();
  }
}
