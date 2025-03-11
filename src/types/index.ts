export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  storeId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  inStock: number;
  storeId: string;
  rating: number;
  reviews: Review[];
}

export interface Store {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviews: Review[];
  products: string[]; // Array of product IDs
  distance?: number; // Distance from user in km
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SearchResult {
  products: Product[];
  stores: Store[];
}
