import { Injectable } from '@angular/core';
import { Product } from '@app/features/main/products/products.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  MOCK_PRODUCTS: Product[] = [
    {
      id: 1,
      name: 'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg',
      price: 773,
      available: true,
    },
    {
      id: 2,
      name: 'Microsoft Xbox X/S Wireless Controller Robot White',
      image: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692255251854-xbox.jpg',
      price: 57,
      available: false,
    },
    {
      id: 3,
      name: 'Logitech G733 Lightspeed Wireless Gaming Headset - White',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692257709689-logitech heaphone.jpg',
      price: 384,
      available: true,
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5 Wireless Industry Leading Headphones',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg',
      price: 362,
      available: false,
    },
    {
      id: 5,
      name: 'Urbanista Los Angeles Solar Powered ANC Headphones',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056487173-headphon2.jpg',
      price: 265,
      available: true,
    },
    {
      id: 6,
      name: 'Xiaomi Wired in-Ear Earphones with Mic (Blue)',
      image: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg',
      price: 5,
      available: false,
    },
    {
      id: 7,
      name: 'boAt Rockerz 370 On Ear Bluetooth Headphones',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057718636-headphone5.jpg',
      price: 12,
      available: true,
    },
    {
      id: 9,
      name: 'Amkette EvoFox Elite Ops Wireless Gamepad',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694100438525-51Prg4Smx-L._SL1500_.jpg',
      price: 18,
      available: true,
    },
    {
      id: 10,
      name: 'Samsung Galaxy S22 5G (Phantom White)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074519203-galaxy S22 5G.jpg',
      price: 760,
      available: false,
    },
    {
      id: 11,
      name: 'Samsung Galaxy S22 Ultra 5G (Burgundy)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691074776147-galaxy S22 ultra 5G.jpg',
      price: 1147,
      available: true,
    },
    {
      id: 12,
      name: 'Poco by Xiaomi F1 (Steel Blue)',
      image: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691078463674-poco f1.jpg',
      price: 132,
      available: true,
    },
    {
      id: 13,
      name: 'Samsung Galaxy M14 5G (Smoky Teal)',
      image:
        'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691075307831-galaxy M14 5G.jpg',
      price: 187,
      available: false,
    },
  ];
}
