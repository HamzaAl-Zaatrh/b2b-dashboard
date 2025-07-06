import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '@app/features/main/products/products.type';
import { RequestService } from '@app/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private requestService = inject(RequestService);
  MOCK_PRODUCTS: Product[] = [
    {
      id: 1,
      name: 'Majestic Mountain Graphic T-Shirt',
      price: 44,
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      available: true,
    },
    {
      id: 2,
      name: 'Classic Red Pullover Hoodie',
      price: 10,
      image: 'https://i.imgur.com/1twoaDy.jpeg',
      available: false,
    },
    {
      id: 3,
      name: 'Classic Heather Gray Hoodie',
      price: 69,
      image: 'https://i.imgur.com/cHddUCu.jpeg',
      available: true,
    },
    {
      id: 4,
      name: 'Classic Grey Hooded Sweatshirt',
      price: 90,
      image: 'https://i.imgur.com/R2PN9Wq.jpeg',
      available: true,
    },
    {
      id: 5,
      name: 'Classic Black Hooded Sweatshirt',
      price: 79,
      image: 'https://i.imgur.com/cSytoSD.jpeg',
      available: false,
    },
    {
      id: 6,
      name: 'Classic Comfort Fit Joggers',
      price: 25,
      image: 'https://i.imgur.com/ZKGofuB.jpeg',
      available: true,
    },
    {
      id: 7,
      name: 'Classic Comfort Drawstring Joggers',
      price: 79,
      image: 'https://i.imgur.com/mp3rUty.jpeg',
      available: true,
    },
    {
      id: 8,
      name: 'Classic Red Jogger Sweatpants',
      price: 98,
      image: 'https://i.imgur.com/9LFjwpI.jpeg',
      available: false,
    },
    {
      id: 9,
      name: 'Classic Navy Blue Baseball Cap',
      price: 61,
      image: 'https://i.imgur.com/R3iobJA.jpeg',
      available: true,
    },
    {
      id: 10,
      name: 'Classic Blue Baseball Cap',
      price: 86,
      image: 'https://i.imgur.com/wXuQ7bm.jpeg',
      available: false,
    },
    {
      id: 11,
      name: 'Classic Red Baseball Cap',
      price: 35,
      image: 'https://i.imgur.com/cBuLvBi.jpeg',
      available: true,
    },
    {
      id: 12,
      name: 'Classic Black Baseball Cap',
      price: 58,
      image: 'https://i.imgur.com/KeqG6r4.jpeg',
      available: true,
    },
    {
      id: 13,
      name: 'Classic Olive Chino Shorts',
      price: 84,
      image: 'https://i.imgur.com/UsFIvYs.jpeg',
      available: false,
    },
    {
      id: 14,
      name: 'Classic High-Waisted Athletic Shorts',
      price: 43,
      image: 'https://i.imgur.com/eGOUveI.jpeg',
      available: true,
    },
    {
      id: 15,
      name: 'Classic White Crew Neck T-Shirt',
      price: 39,
      image: 'https://i.imgur.com/axsyGpD.jpeg',
      available: false,
    },
    {
      id: 16,
      name: 'Classic White Tee - Timeless Style and Comfort',
      price: 73,
      image: 'https://i.imgur.com/Y54Bt8J.jpeg',
      available: true,
    },
    {
      id: 17,
      name: 'Classic Black T-Shirt',
      price: 35,
      image: 'https://i.imgur.com/9DqEOV5.jpeg',
      available: false,
    },
  ];

  /**
   * Fetches a list of products from the API.
   * @return An observable that emits an array of products.
   * This method retrieves product data from the API and maps it to a simplified format.
   */
  getProducts() {
    return this.requestService.get<ProductResponse[]>('products').pipe(
      map((res) => {
        const data: Product[] = res.map((product: any) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          available: Math.random() < 0.5, // Randomly set availability
        }));
        return data;
      }),
      catchError((err) => {
        // We can show toast message here if needed
        console.error('Error fetching products:', err);
        return of([]); // Return an empty array on error
      }),
    );
  }
}
