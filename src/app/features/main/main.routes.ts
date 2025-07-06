import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';


export default <Routes>[
  {
    path: '',
    component: MainLayoutComponent,
    providers: [],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.component').then((m) => m.CustomersComponent),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
