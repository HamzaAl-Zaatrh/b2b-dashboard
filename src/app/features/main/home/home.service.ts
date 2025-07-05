import { Injectable } from '@angular/core';
import { StatisticItem } from '@app/features/main/home/home.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getHomeStatistics(): StatisticItem[] {
    return [
      { id: 1, title: 'Total Products', value: 12, icon: 'inventory_2' },
      { id: 2, title: 'Total Orders', value: 8, icon: 'shopping_cart' },
      { id: 3, title: 'Pending Orders', value: 3, icon: 'hourglass_empty' },
      { id: 4, title: 'Active Customers', value: 5, icon: 'group' },
    ];
  }
}
