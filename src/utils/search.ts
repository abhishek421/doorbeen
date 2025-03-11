import { mockProducts, mockStores } from '../data/mockData';
import { Product, Store, SearchResult } from '../types';

// Search products and stores based on query
export const searchProducts = (query: string): SearchResult => {
  if (!query) {
    return {
      products: mockProducts,
      stores: mockStores
    };
  }
  
  const searchTerm = query.toLowerCase();
  
  // Search products
  const products = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  
  // Search stores
  const stores = mockStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm) ||
    store.description.toLowerCase().includes(searchTerm) ||
    store.city.toLowerCase().includes(searchTerm) ||
    store.state.toLowerCase().includes(searchTerm)
  );
  
  return { products, stores };
};

// Get product by ID
export const getProductById = (id: string): Product | null => {
  return mockProducts.find(product => product.id === id) || null;
};

// Get store by ID
export const getStoreById = (id: string): Store | null => {
  return mockStores.find(store => store.id === id) || null;
};

// Get products by store ID
export const getProductsByStoreId = (storeId: string): Product[] => {
  return mockProducts.filter(product => product.storeId === storeId);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};
