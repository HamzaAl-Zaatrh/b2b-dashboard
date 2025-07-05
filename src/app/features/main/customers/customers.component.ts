import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.titleService.setTitle('Customers');
  }
}
