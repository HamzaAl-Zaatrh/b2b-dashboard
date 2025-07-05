import { Component, input } from '@angular/core';
import { Product } from '@app/features/main/products/products.type';
import { TranslatePipe } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-product-card',
  imports: [TranslatePipe, DecimalPipe, MatIcon, MatRipple],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
