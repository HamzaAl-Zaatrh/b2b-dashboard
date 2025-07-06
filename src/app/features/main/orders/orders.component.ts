import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { SectionHeaderComponent } from '@ui/section-header/section-header.component';
import { AppGridComponent, PaginationInfo } from '@ui/app-grid/app-grid.component';
import { OrdersService } from '@app/features/main/orders/orders.service';
import { Order } from '@app/features/main/orders/orders.type';

@Component({
  selector: 'app-orders',
  imports: [SectionHeaderComponent, AppGridComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent extends BaseComponent implements OnInit {
  ordersService = inject(OrdersService);
  orderColumnsConfig = this.ordersService.columnsConfig;
  orderAction = this.ordersService.actions;
  totalCount = this.ordersService.MOCK_ORDERS.length;
  orders: Order[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Orders');
    this.orders = this.ordersService.getOrders();
  }

  onPaginationChange(event: PaginationInfo): void {
    this.orders = this.ordersService.getOrders(event.page, event.pageSize);
  }
}
