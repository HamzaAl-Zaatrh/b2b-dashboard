import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { SectionHeaderComponent } from '@ui/section-header/section-header.component';
import { AppGridComponent, PaginationInfo } from '@ui/app-grid/app-grid.component';
import { OrdersService } from '@app/features/main/orders/orders.service';
import { Order } from '@app/features/main/orders/orders.type';
import { FilterBarComponent, FilterConfig } from '@ui/filter-bar/filter-bar.component';

@Component({
  selector: 'app-orders',
  imports: [SectionHeaderComponent, AppGridComponent, FilterBarComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent extends BaseComponent implements OnInit {
  ordersService = inject(OrdersService);
  orderColumnsConfig = this.ordersService.columnsConfig;
  orderAction = this.ordersService.actions;
  totalCount = this.ordersService.MOCK_ORDERS.length;
  orders: Order[] = [];

  filterConfigs: FilterConfig[] = [
    {
      key: 'customer',
      label: 'Customer',
      type: 'text',
      defaultValue: '',
    },
    {
      key: 'status',
      label: 'Order Status',
      type: 'dropdown',
      options: this.ordersService.orderStatuses.map((status) => ({
        id: status.id,
        name: status.name,
      })),
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      type: 'date-range',
    },
  ];

  filterValues: Record<string, any> = {};

  ngOnInit(): void {
    this.titleService.setTitle('Orders');
    this.orders = this.ordersService.getOrders();
  }

  onPaginationChange(event: PaginationInfo): void {
    this.paginationInfo.page = event.page;
    this.paginationInfo.pageSize = event.pageSize;

    if (Object.keys(this.filterValues).length > 0) {
      // If filters are applied, paginate the filtered results
      const start = event.page * event.pageSize;
      const end = start + event.pageSize;

      let filteredOrders = [...this.ordersService.MOCK_ORDERS];

      // Re-apply filters
      if (this.filterValues['customer']) {
        const searchTerm = this.filterValues['customer'].toLowerCase();
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.customer.name.toLowerCase().includes(searchTerm) ||
            order.customer.email.toLowerCase().includes(searchTerm) ||
            order.customer.phone.toLowerCase().includes(searchTerm),
        );
      }

      if (this.filterValues['status']) {
        filteredOrders = filteredOrders.filter(
          (order) => order.status.id === this.filterValues['status'],
        );
      }

      if (this.filterValues['orderDate_start']) {
        const startDate = new Date(this.filterValues['orderDate_start']);
        filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) >= startDate);
      }

      if (this.filterValues['orderDate_end']) {
        const endDate = new Date(this.filterValues['orderDate_end']);
        endDate.setHours(23, 59, 59, 999); // Set to end of day
        filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) <= endDate);
      }

      this.totalCount = filteredOrders.length;
      this.orders = filteredOrders.slice(start, end);
    } else {
      // No filters, use the standard pagination
      this.orders = this.ordersService.getOrders(event.page, event.pageSize);
    }
  }

  onFilterSearch(filterValues: Record<string, any>): void {
    this.filterValues = filterValues;
    // Reset pagination to first page when filters are applied
    this.paginationInfo.page = 0;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredOrders = [...this.ordersService.MOCK_ORDERS];

    if (this.filterValues['customer']) {
      const searchTerm = this.filterValues['customer'].toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.customer.name.toLowerCase().includes(searchTerm) ||
          order.customer.email.toLowerCase().includes(searchTerm) ||
          order.customer.phone.toLowerCase().includes(searchTerm),
      );
    }

    if (this.filterValues['status']) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status.id === this.filterValues['status'],
      );
    }

    if (this.filterValues['orderDate_start']) {
      const startDate = new Date(this.filterValues['orderDate_start']);
      filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) >= startDate);
    }

    if (this.filterValues['orderDate_end']) {
      const endDate = new Date(this.filterValues['orderDate_end']);
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) <= endDate);
    }

    this.totalCount = filteredOrders.length;
    // Use the current page size but always start from page 0 when filters are applied
    const start = this.paginationInfo.page * this.paginationInfo.pageSize;
    const end = start + this.paginationInfo.pageSize;
    this.orders = filteredOrders.slice(start, end);
  }
}
