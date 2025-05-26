import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { value: '', label: 'All Categories' },
    { value: 'Classic Milktea Series', label: 'Classic Milktea Series' },
    { value: 'Fresh Milk Tea', label: 'Fresh Milk Tea' },
    { value: 'Fresh Fruit', label: 'Fresh Fruit' },
    { value: 'Milkshake', label: 'Milkshake' },
    { value: 'Pure Tea', label: 'Pure Tea' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update product availability
  const updateProductAvailability = async (id, isAvailable) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_available: isAvailable })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the product in the state
        setProducts(products.map(product => 
          product.id === id ? { ...product, is_available: isAvailable } : product
        ));
        return true;
      } else {
        console.error('Failed to update product availability:', data.message);
        return false;
      }
    } catch (err) {
      console.error('Error updating product availability:', err);
      return false;
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product.id !== id));
        return true;
      } else {
        console.error('Failed to delete product:', data.message);
        return false;
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      return false;
    }
  };

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('productCategories');
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(prev => {
          // Keep default categories and add custom ones
          const defaultCategories = prev.filter(c => 
            ['', 'Classic Milktea Series', 'Fresh Milk Tea', 'Fresh Fruit', 'Milkshake', 'Pure Tea'].includes(c.value)
          );
          return [...defaultCategories, ...parsedCategories.filter(c => 
            !['', 'Classic Milktea Series', 'Fresh Milk Tea', 'Fresh Fruit', 'Milkshake', 'Pure Tea'].includes(c.value)
          )];
        });
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    }
    
    // Initial fetch of products
    fetchProducts();
  }, []);

  // Value to be provided by the context
  const value = {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    updateProductAvailability,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};