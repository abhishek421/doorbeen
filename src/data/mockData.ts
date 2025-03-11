import { User, Product, Store, Review } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'vendor',
    storeId: 'store-1'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'vendor',
    storeId: 'store-2'
  }
];

// Mock Reviews
const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 4.5,
    comment: 'Great product, works as expected!',
    date: '2023-05-15T10:30:00Z'
  },
  {
    id: 'review-2',
    userId: 'user-3',
    userName: 'Bob Johnson',
    rating: 5,
    comment: 'Excellent quality and fast shipping.',
    date: '2023-06-20T14:45:00Z'
  },
  {
    id: 'review-3',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 3,
    comment: 'Decent product but a bit overpriced.',
    date: '2023-07-05T09:15:00Z'
  }
];

// Mock Stores
export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Tech Haven',
    description: 'Your one-stop shop for all electronics and gadgets.',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    phone: '(415) 555-1234',
    email: 'info@techhaven.com',
    website: 'techhaven.com',
    rating: 4.7,
    reviews: [...mockReviews],
    products: ['product-1', 'product-2', 'product-5'],
    distance: 2.3
  },
  {
    id: 'store-2',
    name: 'Furniture World',
    description: 'Quality furniture for your home and office.',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    phone: '(213) 555-6789',
    email: 'sales@furnitureworld.com',
    rating: 4.2,
    reviews: mockReviews.slice(0, 2),
    products: ['product-3', 'product-4'],
    distance: 5.1
  },
  {
    id: 'store-3',
    name: 'Fashion Forward',
    description: 'Trendy clothing and accessories for all seasons.',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '789 Pine St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(212) 555-4321',
    email: 'hello@fashionforward.com',
    website: 'fashionforward.com',
    rating: 4.5,
    reviews: mockReviews.slice<boltArtifact id="fix-navbar-links-continued" title="Fix Navbar Links Continued">
<boltAction type="file" filePath="src/data/mockData.ts">import { User, Product, Store, Review } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'vendor',
    storeId: 'store-1'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'vendor',
    storeId: 'store-2'
  }
];

// Mock Reviews
const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 4.5,
    comment: 'Great product, works as expected!',
    date: '2023-05-15T10:30:00Z'
  },
  {
    id: 'review-2',
    userId: 'user-3',
    userName: 'Bob Johnson',
    rating: 5,
    comment: 'Excellent quality and fast shipping.',
    date: '2023-06-20T14:45:00Z'
  },
  {
    id: 'review-3',
    userId: 'user-1',
    userName: 'John Doe',
    rating: 3,
    comment: 'Decent product but a bit overpriced.',
    date: '2023-07-05T09:15:00Z'
  }
];

// Mock Stores
export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Tech Haven',
    description: 'Your one-stop shop for all electronics and gadgets.',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    phone: '(415) 555-1234',
    email: 'info@techhaven.com',
    website: 'techhaven.com',
    rating: 4.7,
    reviews: [...mockReviews],
    products: ['product-1', 'product-2', 'product-5'],
    distance: 2.3
  },
  {
    id: 'store-2',
    name: 'Furniture World',
    description: 'Quality furniture for your home and office.',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    phone: '(213) 555-6789',
    email: 'sales@furnitureworld.com',
    rating: 4.2,
    reviews: mockReviews.slice(0, 2),
    products: ['product-3', 'product-4'],
    distance: 5.1
  },
  {
    id: 'store-3',
    name: 'Fashion Forward',
    description: 'Trendy clothing and accessories for all seasons.',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '789 Pine St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(212) 555-4321',
    email: 'hello@fashionforward.com',
    website: 'fashionforward.com',
    rating: 4.5,
    reviews: mockReviews.slice(1),
    products: ['product-6', 'product-7', 'product-8'],
    distance: 10.7
  },
  {
    id: 'store-4',
    name: 'Healthy Harvest',
    description: 'Organic groceries and health foods for conscious consumers.',
    address: '321 Maple Rd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    phone: '(312) 555-8765',
    email: 'contact@healthyharvest.com',
    rating: 4.8,
    reviews: mockReviews.slice(0, 1),
    products: ['product-9', 'product-10'],
    distance: 3.8
  },
  {
    id: 'store-5',
    name: 'Sports Central',
    description: 'Everything you need for sports and outdoor activities.',
    logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    address: '555 River Dr',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    phone: '(512) 555-2468',
    email: 'info@sportscentral.com',
    website: 'sportscentral.com',
    rating: 4.3,
    reviews: mockReviews.slice(2),
    products: ['product-11', 'product-12'],
    distance: 7.2
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced camera and long battery life.',
    price: 799.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 15,
    storeId: 'store-1',
    rating: 4.6,
    reviews: mockReviews.slice(0, 2)
  },
  {
    id: 'product-2',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with noise cancellation and water resistance.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 8,
    storeId: 'store-1',
    rating: 4.3,
    reviews: mockReviews.slice(1)
  },
  {
    id: 'product-3',
    name: 'Modern Sofa',
    description: 'Comfortable 3-seater sofa with premium fabric upholstery.',
    price: 899.99,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 3,
    storeId: 'store-2',
    rating: 4.7,
    reviews: mockReviews.slice(0, 1)
  },
  {
    id: 'product-4',
    name: 'Coffee Table',
    description: 'Elegant coffee table with glass top and wooden legs.',
    price: 249.99,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a694?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 7,
    storeId: 'store-2',
    rating: 4.2,
    reviews: mockReviews.slice(1, 2)
  },
  {
    id: 'product-5',
    name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch with heart rate monitoring.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 0,
    storeId: 'store-1',
    rating: 4.5,
    reviews: mockReviews.slice(2)
  },
  {
    id: 'product-6',
    name: 'Summer Dress',
    description: 'Light and comfortable dress for summer days.',
    price: 59.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 12,
    storeId: 'store-3',
    rating: 4.4,
    reviews: mockReviews.slice(0, 2)
  },
  {
    id: 'product-7',
    name: 'Leather Jacket',
    description: 'Classic leather jacket for men with multiple pockets.',
    price: 199.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 5,
    storeId: 'store-3',
    rating: 4.8,
    reviews: mockReviews.slice(1)
  },
  {
    id: 'product-8',
    name: 'Designer Sunglasses',
    description: 'UV protection sunglasses with stylish frames.',
    price: 129.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 9,
    storeId: 'store-3',
    rating: 4.1,
    reviews: mockReviews.slice(0, 1)
  },
  {
    id: 'product-9',
    name: 'Organic Quinoa',
    description: 'Premium organic quinoa, high in protein and fiber.',
    price: 12.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 20,
    storeId: 'store-4',
    rating: 4.9,
    reviews: mockReviews.slice(2)
  },
  {
    id: 'product-10',
    name: 'Vitamin Supplement',
    description: 'Daily multivitamin supplement for overall health.',
    price: 24.99,
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 15,
    storeId: 'store-4',
    rating: 4.6,
    reviews: mockReviews.slice(1, 3)
  },
  {
    id: 'product-11',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned soles.',
    price: 89.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 7,
    storeId: 'store-5',
    rating: 4.7,
    reviews: mockReviews.slice(0, 2)
  },
  {
    id: 'product-12',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap.',
    price: 29.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: 10,
    storeId: 'store-5',
    rating: 4.4,
    reviews: mockReviews.slice(1)
  }
];
