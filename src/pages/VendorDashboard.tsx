import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Star, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { mockProducts, mockStores } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

const VendorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState<Product[]>(
    currentUser?.storeId 
      ? mockProducts.filter(p => p.storeId === currentUser.storeId)
      : []
  );
  const store = currentUser?.storeId 
    ? mockStores.find(s => s.id === currentUser.storeId)
    : null;
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');
  
  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductStock('');
    setProductImage('');
    setEditingProduct(null);
  };
  
  const handleAddProduct = () => {
    setShowAddProduct(true);
    resetForm();
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price.toString());
    setProductCategory(product.category);
    setProductStock(product.inStock.toString());
    setProductImage(product.image || '');
    setShowAddProduct(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      category: productCategory,
      inStock: parseInt(productStock),
      image: productImage || undefined,
      storeId: currentUser?.storeId || '',
      rating: editingProduct?.rating || 0,
      reviews: editingProduct?.reviews || [],
    };
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        id: `product-${Date.now()}`,
        ...productData,
      };
      setProducts([...products, newProduct]);
    }
    
    setShowAddProduct(false);
    resetForm();
  };
  
  if (!currentUser || currentUser.role !== 'vendor') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-100">Access Denied</h3>
          <p className="mt-2 text-sm text-gray-400">
            You need to be logged in as a vendor to access this page.
          </p>
          <Link to="/login" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Login as Vendor
          </Link>
        </div>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-100">Store Not Found</h3>
          <p className="mt-2 text-sm text-gray-400">
            Your vendor account is not associated with any store.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-100 sm:text-3xl">
            Vendor Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your store and products
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to={`/store/${store.id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
          >
            View Store
          </Link>
        </div>
      </div>
      
      {/* Store Overview */}
      <div className="bg-gray-800 shadow rounded-lg mb-8 border border-gray-700">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 mr-4">
            <img 
              src={store.logo || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
              alt={store.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-100">{store.name}</h2>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-400">{store.rating.toFixed(1)} ({store.reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-900 rounded-md p-3">
                  <Package className="h-6 w-6 text-indigo-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Products</dt>
                    <dd className="text-3xl font-semibold text-gray-100">{products.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-900 rounded-md p-3">
                  <ShoppingBag className="h-6 w-6 text-green-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">In Stock Items</dt>
                    <dd className="text-3xl font-semibold text-gray-100">
                      {products.filter(p => p.inStock > 0).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-900 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-yellow-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Value</dt>
                    <dd className="text-3xl font-semibold text-gray-100">
                      ${products.reduce((sum, p) => sum + (p.price * p.inStock), 0).toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-900 rounded-md p-3">
                  <Users className="h-6 w-6 text-red-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">Total Reviews</dt>
                    <dd className="text-3xl font-semibold text-gray-100">{store.reviews.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Management */}
      <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-100">Product Management</h2>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
        
        {showAddProduct && (
          <div className="px-4 py-5 sm:p-6 border-t border-gray-700">
            <h3 className="text-lg font-medium text-gray-100 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-300">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="productName"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="productCategory" className="block text-sm font-medium text-gray-300">
                    Category *
                  </label>
                  <input
                    type="text"
                    id="productCategory"
                    required
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-300">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    required
                    min="0"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  />
                </div>
                
                <div>
                  <label htmlFor="productStock" className="block text-sm font-medium text-gray-300">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="productStock"
                    required
                    min="0"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="productImage" className="block text-sm font-medium text-gray-300">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="productImage"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300">
                    Description *
                  </label>
                  <textarea
                    id="productDescription"
                    required
                    rows={3}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    resetForm();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Product List */}
        <div className="border-t border-gray-700">
          {products.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-gray-400">No products yet. Add your first product to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.inStock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {product.inStock > 0 ? product.inStock : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-400">{product.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-indigo-400 hover:text-indigo-300 mr-4"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
