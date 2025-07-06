import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base.component';
import { SectionHeaderComponent } from '@ui/section-header/section-header.component';
import { ProductCardComponent } from '@app/features/main/products/product-card/product-card.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductsService } from '@app/features/main/products/products.service';
import { Product } from '@app/features/main/products/products.type';
import { finalize, takeUntil } from 'rxjs';
import { AppLoaderComponent } from '@core/loader/app-loader/app-loader.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [
    SectionHeaderComponent,
    MatPaginator,
    ProductCardComponent,
    AppLoaderComponent,
    TranslatePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  productsService = inject(ProductsService);
  allProducts: Product[] = [];
  products: Product[] = [];

  ngOnInit(): void {
    this.titleService.setTitle('Products');
    this.getData();
  }

  getData(): void {
    this.isLoading = true;

    this.productsService
      .getProducts()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: (products) => {
          this.allProducts = products;

          // apple base on the pagination info
          const startIndex = this.paginationInfo.page * this.paginationInfo.pageSize;
          const endIndex = startIndex + this.paginationInfo.pageSize;
          this.products = products.slice(startIndex, endIndex);
        },
      });
  }

  onPaginationChange(event: PageEvent): void {
    this.paginationInfo.page = event.pageIndex;
    this.paginationInfo.pageSize = event.pageSize;

    // Update the products based on the new page
    const startIndex = this.paginationInfo.page * this.paginationInfo.pageSize;
    const endIndex = startIndex + this.paginationInfo.pageSize;
    this.products = this.allProducts.slice(startIndex, endIndex);
  }
}
