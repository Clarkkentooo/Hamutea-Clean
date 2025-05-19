import { useState, useEffect } from "react";
import { ActionButton, ToggleButton } from "@components/common/button"
import { Select } from "@components/common/input";
import TeaPlaceholder from "@assets/svg/tea-plchldr.svg";
import Icon from "@components/common/Icon";
import { useNavigate } from "react-router-dom";

const LatestMenu = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);
    
    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);
    
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const url = selectedCategory 
                ? `http://localhost:5000/api/products?category=${encodeURIComponent(selectedCategory)}`
                : 'http://localhost:5000/api/products';
                
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.success) {
                setProducts(data.data.slice(0, 10)); // Show only first 10 products
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const toggleAvailability = async (productId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/products/${productId}/availability`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setProducts(products.map(product => 
                    product.id === productId 
                        ? { ...product, is_available: !product.is_available } 
                        : product
                ));
            }
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };
    
    const toggleFeatured = async (productId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/products/${productId}/featured`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                setProducts(products.map(product => 
                    product.id === productId 
                        ? { ...product, is_featured: !product.is_featured } 
                        : product
                ));
            }
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };
    
    return (
        <div className="border border-hamutea-border rounded-2xl p-5 w-full">
            <div className="border-b border-hamutea-border pb-2 flex items-center justify-between gap-10 mb-5">
                <div>
                    <h1 className="text-xl font-bold">Latest Menu</h1>
                </div>
                <ActionButton 
                    variant="danger" 
                    label="View All" 
                    icon="ArrowRight" 
                    onClick={() => navigate('/admin/products')}
                />
            </div>
            <Select
                color="#d91619"
                placeholder="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                    { value: "", label: "All Categories" },
                    { value: "Classic Milktea Series", label: "Classic Milktea Series" },
                    { value: "Fresh Milk Tea", label: "Fresh Milk Tea" },
                    { value: "Fresh Fruit", label: "Fresh Fruit" },
                    { value: "Milkshake", label: "Milkshake" },
                    { value: "Pure Tea", label: "Pure Tea" },
                ]}
            />

            <div className="mt-5 w-full max-h-[15.25rem] overflow-y-auto">
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <td className="py-3"></td>
                            <td className="py-3">Menu</td>
                            <td className="py-3">Price</td>
                            <td className="py-3">Availability Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-5 text-center">Loading...</td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-5 text-center">No products found</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-3">
                                        <input 
                                            type="radio" 
                                            checked={selectedProduct === product.id}
                                            onChange={() => setSelectedProduct(product.id)}
                                        />
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center justify-center gap-3">
                                            <img 
                                                src={product.image_url || TeaPlaceholder} 
                                                alt={product.name} 
                                                className="h-10 w-10 object-cover"
                                            />
                                            <p className="text-sm font-bold">{product.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <p className="text-sm">₱{parseFloat(product.price).toFixed(2)}</p>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <ToggleButton 
                                                isActive={product.is_available} 
                                                onClick={() => toggleAvailability(product.id)}
                                            />
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setMenuOpen(menuOpen === product.id ? null : product.id)}
                                                    className="cursor-pointer"
                                                >
                                                    <Icon name="Ellipsis" />
                                                </button>
                                                
                                                {menuOpen === product.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => {
                                                                    toggleFeatured(product.id);
                                                                    setMenuOpen(null);
                                                                }}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {product.is_featured ? 'Remove from Featured' : 'Add to Featured'}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    navigate(`/admin/products/edit/${product.id}`);
                                                                }}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Edit Product
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LatestMenu;