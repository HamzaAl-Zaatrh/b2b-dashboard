import { Injectable } from '@angular/core';
import { Status, Order } from '@app/features/main/orders/orders.type';
import { ActionConfig, ColumnConfig } from '@ui/app-grid/app-grid.component';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  readonly orderStatuses: Status[] = [
    {
      id: 1,
      name: 'Pending',
      color: 'yellow',
    },
    {
      id: 2,
      name: 'Processing',
      color: 'primary',
    },
    {
      id: 3,
      name: 'Completed',
      color: 'green',
    },
    {
      id: 4,
      name: 'Cancelled',
      color: 'red',
    },
    {
      id: 5,
      name: 'Refunded',
      color: 'red',
    },
  ];

  columnsConfig: ColumnConfig<Order>[] = [
    {
      key: 'id',
      label: 'Order ID',
      type: 'number',
      sortable: true,
      filterable: true,
    },
    {
      key: 'customer',
      subKey: 'name',
      label: 'Customer Name',
      type: 'obj',
      sortable: true,
      filterable: true,
      ellipsis: true,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'flag',
      flagCondition: (row) => row.status.color || 'primary',
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      type: 'date',
      sortable: true,
    },
    {
      key: 'totalAmount',
      label: 'Total Amount',
      type: 'number',
      suffix: ' JD',
      sortable: true,
    },
  ];

  actions: ActionConfig<Order>[] = [
    {
      icon: 'visibility',
      clickFn: (row: Order) => this.onViewOrder(row),
      themeClass: 'primary',
      tooltip: 'View Order Details',
    },
    {
      icon: 'edit',
      clickFn: (row: Order) => this.onEditOrder(row),
      themeClass: 'primary',
      tooltip: 'Edit Order',
      condition: (row: Order) => row.status.name !== 'Completed' && row.status.name !== 'Cancelled',
    },
    {
      icon: 'delete',
      clickFn: (row: Order) => this.onDeleteOrder(row),
      themeClass: 'warn',
      tooltip: 'Delete Order',
      condition: (row: Order) => row.status.name !== 'Completed' && row.status.name !== 'Cancelled',
    },
  ];

  MOCK_ORDERS: Order[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    customer: {
      id: index + 100,
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`,
      phone: `+9627${Math.floor(10000000 + Math.random() * 89999999)}`,
    },
    status: this.orderStatuses[Math.floor(Math.random() * this.orderStatuses.length)],
    orderDate: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    totalAmount: parseFloat((Math.random() * 1000).toFixed(2)),
  }));

  getOrders(page: number = 0, size: number = 5): Order[] {
    const start = page * size;
    const end = start + size;
    return this.MOCK_ORDERS.slice(start, end);
  }

  onViewOrder(order: Order): void {
    console.log('Viewing order:', order);
    // Implement view logic here
  }

  onEditOrder(order: Order): void {
    console.log('Editing order:', order);
    // Implement edit logic here
  }

  onDeleteOrder(order: Order): void {
    console.log('Deleting order:', order);
    // Implement delete logic here
  }
}
