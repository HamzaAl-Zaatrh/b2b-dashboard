import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { HomeService } from '@app/features/main/home/home.service';
import { StatisticItem } from '@app/features/main/home/home.type';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '@app/features/main/products/products.type';
import { ProductCardComponent } from '@app/features/main/products/product-card/product-card.component';
import { ProductsService } from '@app/features/main/products/products.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [MatIcon, MatTabsModule, TranslatePipe, ProductCardComponent, MatPaginator],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseComponent implements OnInit {
  statistics: StatisticItem[] = inject(HomeService).getHomeStatistics();
  MOCK_PRODUCTS: Product[] = inject(ProductsService).MOCK_PRODUCTS;
  products: Product[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Home');

    //show first 5 products
    this.products = this.MOCK_PRODUCTS.slice(0, 5);
  }

  onPaginationChange(event: PageEvent): void {
    this.paginationInfo.page = event.pageIndex;
    this.paginationInfo.pageSize = event.pageSize;

    // Update the products based on the new page
    const startIndex = this.paginationInfo.page * this.paginationInfo.pageSize;
    const endIndex = startIndex + this.paginationInfo.pageSize;
    this.products = this.MOCK_PRODUCTS.slice(startIndex, endIndex);
  }
}
