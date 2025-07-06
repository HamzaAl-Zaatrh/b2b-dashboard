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
import { FilterBarComponent, FilterConfig } from '@ui/filter-bar/filter-bar.component';

@Component({
  selector: 'app-products',
  imports: [
    SectionHeaderComponent,
    MatPaginator,
    ProductCardComponent,
    AppLoaderComponent,
    TranslatePipe,
    FilterBarComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends BaseComponent implements OnInit {
  productsService = inject(ProductsService);
  allProducts: Product[] = [];
  products: Product[] = [];

  filteredProducts: Product[] = []; // Store filtered results separately
  filterConfigs: FilterConfig[] = [
    {
      key: 'name',
      label: 'Product Name',
      type: 'text',
      defaultValue: '',
    },
    {
      key: 'price',
      label: 'Price Range',
      type: 'range-slider',
      min: 0,
      max: 100000, // We'll update this dynamically after loading products
      defaultValue: { min: 0, max: 100000 },
    },
    {
      key: 'availability',
      label: 'Availability',
      type: 'dropdown',
      options: [
        { id: 'all', name: 'All' },
        { id: 'in_stock', name: 'In Stock' },
        { id: 'out_of_stock', name: 'Out of Stock' },
      ],
      defaultValue: 'all',
    },
  ];
  filterValues: Record<string, any> = {};

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
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((products) => {
        this.allProducts = products;
        this.filteredProducts = [...products];
        this.updateDisplayedProducts();

        // Update price range filter based on actual product prices
        if (products.length > 0) {
          const prices = products.map((p) => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));

          this.filterConfigs = this.filterConfigs.map((config) => {
            if (config.key === 'price') {
              return {
                ...config,
                min: minPrice,
                max: maxPrice,
                defaultValue: { min: minPrice, max: maxPrice },
              };
            }
            return config;
          });
        }
      });
  }

  onFilterSearch(filterValues: Record<string, any>): void {
    this.filterValues = filterValues;
    this.paginationInfo.page = 0; // Reset to first page when applying filters
    this.applyFilters();
  }

  onPaginationChange(event: PageEvent): void {
    this.paginationInfo = {
      pageSize: event.pageSize,
      page: event.pageIndex,
    };

    this.updateDisplayedProducts();
  }

  private updateDisplayedProducts(): void {
    const start = this.paginationInfo.page * this.paginationInfo.pageSize;
    const end = start + this.paginationInfo.pageSize;
    this.products = this.filteredProducts.slice(start, end);
  }

  private applyFilters(): void {
    let filteredProducts = [...this.allProducts];

    // Filter by name
    if (this.filterValues['name']) {
      const searchTerm = this.filterValues['name'].toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by price range
    if (this.filterValues['price_min'] !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= this.filterValues['price_min'],
      );
    }

    if (this.filterValues['price_max'] !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= this.filterValues['price_max'],
      );
    }

    // Filter by availability
    if (this.filterValues['availability'] && this.filterValues['availability'] !== 'all') {
      if (this.filterValues['availability'] === 'in_stock') {
        filteredProducts = filteredProducts.filter((product) => product.available);
      } else if (this.filterValues['availability'] === 'out_of_stock') {
        filteredProducts = filteredProducts.filter((product) => !product.available);
      }
    }

    this.filteredProducts = filteredProducts;
    this.updateDisplayedProducts();
  }
}
