import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@components/common/Icon';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [categories, setCategories] = useState([
    { value: 'Classic Milktea Series', label: 'Classic Milktea Series' },
    { value: 'Fresh Milk Tea', label: 'Fresh Milk Tea' },
    { value: 'Fresh Fruit', label: 'Fresh Fruit' },
    { value: 'Milkshake', label: 'Milkshake' },
    { value: 'Pure Tea', label: 'Pure Tea' },
    { value: 'custom', label: 'Add New Category...' }
  ]);
  
  const [customCategory, setCustomCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  
  // Save categories to localStorage whenever they change
  useEffect(() => {
    // Only save custom categories (not default ones and not the 'custom' option)
    const customCategories = categories.filter(c => 
      !['custom', 'Classic Milktea Series', 'Fresh Milk Tea', 'Fresh Fruit', 'Milkshake', 'Pure Tea', ''].includes(c.value)
    );
    localStorage.setItem('productCategories', JSON.stringify(customCategories));
  }, [categories]);
  
  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setFormData(data.data);
        if (data.data.image_url) {
          setImagePreview(data.data.image_url.startsWith('http') 
            ? data.data.image_url 
            : `http://localhost:5000${data.data.image_url}`);
        }
      } else {
        setError(data.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    // Check file size (minimum 3MB)
    if (file.size < 3 * 1024 * 1024) {
      setError('Image size should be at least 3MB');
      return;
    }
    
    setImageFile(file);
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile) return null;
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/upload/product-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.data.path;
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      throw err;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate category
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Upload image if selected
      let imageUrl = formData.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      const productData = {
        ...formData,
        image_url: imageUrl
      };
      
      const token = localStorage.getItem('adminToken');
      const url = isEditing 
        ? `http://localhost:5000/api/products/${id}`
        : 'http://localhost:5000/api/products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/admin/products');
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (err) {
      setError('Error saving product');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading product data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/products')}
          className="text-gray-600 hover:text-gray-900"
        >
          <Icon name="ArrowLeft" className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₱)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₱</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    // Format to always have 2 decimal places
                    const value = parseFloat(e.target.value).toFixed(2);
                    setFormData(prev => ({
                      ...prev,
                      price: value
                    }));
                  }}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                />
              </div>
            </div>
            
            {/* Stock Quantity field removed */}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <div>
                <div className="flex gap-2 mb-2">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setShowCategoryInput(true);
                      } else {
                        setFormData(prev => ({ ...prev, category: e.target.value }));
                        setShowCategoryInput(false);
                      }
                    }}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories
                      .filter(category => category.value !== 'custom')
                      .map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    <option value="custom">Add New Category...</option>
                  </select>
                  
                  {categories.length > 6 && ( // Only show if there are custom categories
                    <button
                      type="button"
                      onClick={() => {
                        const selectedCategory = formData.category;
                        if (selectedCategory && selectedCategory !== 'custom' && 
                            !['Classic Milktea Series', 'Fresh Milk Tea', 'Fresh Fruit', 'Milkshake', 'Pure Tea'].includes(selectedCategory)) {
                          if (window.confirm(`Remove category "${selectedCategory}"?`)) {
                            setCategories(prev => prev.filter(c => c.value !== selectedCategory));
                            setFormData(prev => ({ ...prev, category: '' }));
                          }
                        } else {
                          alert("You can't remove default categories");
                        }
                      }}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                      title="Remove selected category"
                    >
                      <Icon name="Trash" className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {showCategoryInput && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter new category"
                      value={customCategory}
                      onChange={(e) => {
                        setCustomCategory(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (customCategory.trim()) {
                            const newCategory = { value: customCategory, label: customCategory };
                            setCategories(prev => [...prev.filter(c => c.value !== customCategory), newCategory]);
                            setFormData(prev => ({ ...prev, category: customCategory }));
                            setCustomCategory('');
                            setShowCategoryInput(false);
                          }
                        }}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCategoryInput(false);
                          setCustomCategory('');
                        }}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              
              <div className="flex items-start space-x-4">
                {/* Image preview */}
                <div className="w-32 h-32 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="Image" className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
                  >
                    Choose Image
                  </label>
                  
                  <p className="mt-2 text-sm text-gray-500">
                    JPEG, PNG, or WebP. Minimum 3MB.
                  </p>
                  
                  {imageFile && (
                    <p className="mt-1 text-sm text-gray-700">
                      Selected: {imageFile.name}
                    </p>
                  )}
                  
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-hamutea-red h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {/* External image URL option removed */}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hamutea-red"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-hamutea-red hover:bg-red-700 text-white rounded-md"
            >
              {submitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;