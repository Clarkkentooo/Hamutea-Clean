import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartBar = ({ cartItems, total, onClick, onEditItem }) => {
    const navigate = useNavigate();
    const [showItems, setShowItems] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShowItems(!showItems)}
                            className="flex items-center gap-2 text-hamutea-red"
                        >
                            <span className="bg-hamutea-red text-white rounded-full w-6 h-6 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                            <span className="font-medium">View Cart</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 transition-transform ${showItems ? 'rotate-180' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-lg font-bold">₱{total}</p>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="bg-hamutea-red hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
                
                {/* Cart Items Dropdown */}
                {showItems && (
                    <div className="mt-3 border-t pt-3 max-h-[300px] overflow-y-auto">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b">
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.size} • {item.sugar} • {item.ice}
                                        {item.addOns.length > 0 && ` • ${item.addOns.join(', ')}`}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <span className="text-sm">x{item.qty}</span>
                                    </div>
                                    
                                    <div className="text-right">
                                        <p className="font-medium">₱{item.price * item.qty}</p>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => onEditItem(item, index)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartBar;