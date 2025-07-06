export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  available: boolean;
}

export interface ProductResponse {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  images: string[];
}
