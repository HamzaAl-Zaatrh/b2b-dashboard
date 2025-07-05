import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.titleService.setTitle('Orders');
  }
}
