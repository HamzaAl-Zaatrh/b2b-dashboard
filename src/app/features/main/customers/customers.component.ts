import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { SectionHeaderComponent } from '@ui/section-header/section-header.component';
import { AppGridComponent } from '@ui/app-grid/app-grid.component';
import { CustomersService } from '@app/features/main/customers/customers.service';
import { Customer } from '@app/features/main/customers/customers.type';
import { finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [SectionHeaderComponent, AppGridComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent extends BaseComponent implements OnInit {
  customersService = inject(CustomersService);
  customerColumnsConfig = this.customersService.columnsConfig;
  customers: Customer[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Customers');
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.customersService
      .getCustomers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (customers) => {
          this.customers = customers;
        },
      });
  }
}
