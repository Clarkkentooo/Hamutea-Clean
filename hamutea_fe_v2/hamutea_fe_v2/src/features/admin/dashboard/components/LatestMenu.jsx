import { useState, useEffect } from "react";
import { ActionButton, ToggleButton } from "@components/common/button"
import { Select } from "@components/common/input";
import TeaPlaceholder from "@assets/svg/tea-plchldr.svg";
import Icon from "@components/common/Icon";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@context/ProductContext";

const LatestMenu = () => {
    const navigate = useNavigate();
    const { products, categories, loading, updateProductAvailability } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    
    // Filter and sort products when products or selectedCategory changes
    useEffect(() => {
        if (products.length > 0) {
            // Filter by category if one is selected
            const filtered = selectedCategory 
                ? products.filter(p => p.category === selectedCategory)
                : products;
            
            // Sort by newest first (assuming id is incremental)
            const sorted = [...filtered].sort((a, b) => b.id - a.id);
            
            // Take only the latest 8 products
            const latest = sorted.slice(0, 8);
            
            setFilteredProducts(latest);
        }
    }, [products, selectedCategory]);
    
    const handleToggleAvailability = async (productId, isAvailable) => {
        await updateProductAvailability(productId, isAvailable);
    };
    
    return (
        <div className="border border-hamutea-border rounded-2xl p-5 w-full md:w-1/2">
            <div className="border-b border-hamutea-border pb-2 flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-xl font-bold">Latest Menu</h1>
                </div>
                <ActionButton 
                    variant="danger" 
                    label="View All" 
                    icon="ArrowRight" 
                    iconAlign="right"
                    onClick={() => navigate('/admin/products')}
                />
            </div>
            <div className="mt-4 mb-2">
                <Select
                    color="#d91619"
                    placeholder="Category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={categories}
                />
            </div>

            <div className="mt-5 w-full max-h-[15.25rem] overflow-y-auto">
                <table className="w-full text-center">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <td className="py-3 text-xs font-medium text-gray-500 uppercase">Menu</td>
                            <td className="py-3 text-xs font-medium text-gray-500 uppercase">Price</td>
                            <td className="py-3 text-xs font-medium text-gray-500 uppercase">Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-5 text-center">Loading...</td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-5 text-center">No products found</td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                                <img 
                                                    src={product.image_url || TeaPlaceholder} 
                                                    alt={product.name} 
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <p className="text-sm font-medium">₱{parseFloat(product.price).toFixed(2)}</p>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <ToggleButton 
                                                isActive={product.is_available !== false} 
                                                onClick={(newState) => handleToggleAvailability(product.id, newState)}
                                            />
                                            <div className="relative ml-2">
                                                <button 
                                                    onClick={() => setMenuOpen(menuOpen === product.id ? null : product.id)}
                                                    className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                                                >
                                                    <Icon name="MoreVertical" className="w-4 h-4" />
                                                </button>
                                                
                                                {menuOpen === product.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                        <div className="py-1">
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