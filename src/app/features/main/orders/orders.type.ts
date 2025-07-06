import { FlagColor } from '@ui/app-grid/app-grid.component';
import { Customer } from '@app/features/main/customers/customers.type';

export type Status = {
  id: number;
  name: string;
  color?: FlagColor;
};

export type Order = {
  id: number;
  customer: Customer;
  status: Status;
  orderDate: string | Date;
  totalAmount: number;
};
