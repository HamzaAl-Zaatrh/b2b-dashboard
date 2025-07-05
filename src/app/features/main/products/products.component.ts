import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { SectionHeaderComponent } from '@ui/section-header/section-header.component';

@Component({
  selector: 'app-products',
  imports: [SectionHeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.titleService.setTitle('Products');
  }
}
