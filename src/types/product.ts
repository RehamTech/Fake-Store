export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type CategoryFilter = 'all' | 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";
