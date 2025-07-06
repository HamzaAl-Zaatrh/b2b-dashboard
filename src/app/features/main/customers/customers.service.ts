import { inject, Injectable } from '@angular/core';
import { RequestService } from '@app/core';
import { Customer } from '@app/features/main/customers/customers.type';
import { map } from 'rxjs';
import { ColumnConfig } from '@ui/app-grid/app-grid.component';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private requestService = inject(RequestService);

  columnsConfig: ColumnConfig<Customer>[] = [
    {
      key: 'avatar',
      label: '',
      type: 'image',
    },
    {
      key: 'id',
      label: 'ID',
      type: 'number',
    },
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      ellipsis: true,
    },
    {
      key: 'email',
      label: 'Email',
      type: 'string',
    },
    {
      key: 'phone',
      label: 'Phone',
      type: 'string',
    },
  ];

  getCustomers() {
    const params = {
      limit: 10,
    };
    return this.requestService.get<Customer[]>('users', params).pipe(
      map((res) => {
        const data: Customer[] = res.map((customer) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer?.phone ?? '0786642713',
          avatar: customer?.avatar ?? 'img/user.png',
        }));

        return data;
      }),
    );
  }
}
