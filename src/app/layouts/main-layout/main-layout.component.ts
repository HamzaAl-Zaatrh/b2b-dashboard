import { Component, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserInfo, UserService, ThemeService, ThemeType, AuthService } from '@core/services';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'hok-main-layout',
  standalone: true,
  imports: [RouterModule, TranslateModule, NgTemplateOutlet, MatIconButton, MatRipple],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  themeService = inject(ThemeService);

  userInfo: Signal<UserInfo | null>;

  constructor() {
    this.userInfo = this.userService.getUserInfo();
  }

  onToggleTheme(theme: ThemeType) {
    this.themeService.toggleTheme(theme);
  }

  onLogout() {
    this.authService.logout();
  }
}
