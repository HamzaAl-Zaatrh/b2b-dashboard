import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { HomeService } from '@app/features/main/home/home.service';
import { StatisticItem } from '@app/features/main/home/home.type';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [MatIcon, MatTabsModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseComponent implements OnInit {
  private homeService = inject(HomeService);
  statistics: StatisticItem[] = this.homeService.getHomeStatistics();

  ngOnInit(): void {
    this.titleService.setTitle('Home');
  }
}
