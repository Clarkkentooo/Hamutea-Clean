import { useState, useEffect } from 'react';
import banner1 from '@assets/menu_assets/banner1.svg';
import banner2 from '@assets/menu_assets/banner2.svg';
import banner3 from '@assets/menu_assets/banner3.svg';
import images from "@utils/imageLoader";
import CartBar from "@features/client/menu/components/CartBar";
import { useClientContext } from "@context/ClientContext"



const Menu = () => {
    const { cartItems, setCartItems } = useClientContext();

    const [columns, setColumns] = useState('repeat(5, 1fr)');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [quantities, setQuantities] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [activeCategory, setActiveCategory] = useState('Classic Milktea Series');
    const [isCategoryChanging, setIsCategoryChanging] = useState(false);
    const [detailAnim, setDetailAnim] = useState(false);
    const bannerImages = [banner1, banner2, banner3];
    const [currentBanner, setCurrentBanner] = useState(0);

    const getQty = (key) => quantities[key] ?? 1;



    const [selectedSize, setSelectedSize] = useState('');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedSugar, setSelectedSugar] = useState('');
    const [selectedIce, setSelectedIce] = useState('');

    const [showToast, setShowToast] = useState(false);



    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // hide after 2 seconds
    };


    const resetSelections = () => {
        setSelectedSize('');
        setSelectedSugar('');
        setSelectedIce('');
        setSelectedAddOns([]);
        setValidationErrors({ size: false, sugar: false, ice: false });

        if (selectedItem?.imageKey) {
            setQuantities(prev => {
                const newQuantities = { ...prev };
                delete newQuantities[selectedItem.imageKey]; // RESET the quantity of this item
                return newQuantities;
            });
        }
    };



    const [validationErrors, setValidationErrors] = useState({
        size: false,
        sugar: false,
        ice: false,
    });



    const addOnsPrice = selectedAddOns.length * 20;

    // Handle responsive columns
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width <= 480) setColumns('1fr');
            else if (width <= 768) setColumns('repeat(2, 1fr)');
            else if (width <= 1024) setColumns('repeat(3, 1fr)');
            else setColumns('repeat(5, 1fr)');
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Banner slider auto change
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(prev => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerImages.length]);

    // Scroll to top when item is selected
    useEffect(() => {
        if (selectedItem) {
            window.scrollTo(0, 0);
        }
    }, [selectedItem]);

    const fadeInUp = {
        opacity: 0,
        transform: 'translateY(20px)',
    };

    const fadeInUpActive = {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
    };




    const menuItems = [
        /// Classic Milktea Series
        {
            name: 'Signature Pudding Dodol', category: 'Classic Milktea Series', price: '₱110', imageKey: 'sig_pudding_dodol', description: 'A rich and creamy blend with our signature pudding and Hamutea Dodol', ingredients: ['Milk', 'Pudding', 'Hamutea Dodol'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'No.3 Milk Tea', category: 'Classic Milktea Series', price: '₱110', imageKey: 'no_3_milktea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'Black Sugar Pearl Milk Tea', category: 'Classic Milktea Series', price: '₱110', imageKey: 'black_sugar_pearl_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱120' }
            ]
        },
        {
            name: 'Red Bean Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'red_bean_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Coconut Jelly Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'coconut_jelly_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Pudding Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'pudding_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Highland Barley Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'highland_barley_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Pearl Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'pearl_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Oolong Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'oolong_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Pearl Green Milk Tea', category: 'Classic Milktea Series', price: '₱90', imageKey: 'pearl_green_milk_tea', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Grand Slam', category: 'Classic Milktea Series', price: '₱140', imageKey: 'grand_slam', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱140' },
                { size: 'Large', price: '₱140' }
            ]
        },
        /// Fresh Milk Tea
        {
            name: 'Black Sugar Pearl Fresh Milk', category: 'Fresh Milk Tea', price: '₱120', imageKey: 'skull2', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱120' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'Black Sugar Matcha Fresh Milk', category: 'Fresh Milk Tea', price: '₱120', imageKey: 'skull2', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱120' },
                { size: 'Large', price: '₱130' }
            ]
        },
        /// Fresh Fruit
        {
            name: 'Passion QQ', category: 'Fresh Fruit', price: '₱100', imageKey: 'passion_qq', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱100' },
                { size: 'Large', price: '₱110' }
            ]
        },
        {
            name: 'Mighty Sunshine Orange', category: 'Fresh Fruit', price: '₱110', imageKey: 'skull3', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'Iced Lemon Water', category: 'Fresh Fruit', price: '₱60', imageKey: 'iced_lemon_water', description: '...', ingredients: ['...'], sizes: [
                { size: 'Large', price: '₱60' }
            ]
        },
        {
            name: 'Lemon Black/Green Tea', category: 'Fresh Fruit', price: '₱60', imageKey: 'skull3', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱60' },
                { size: 'Large', price: '₱90' }
            ]
        },
        /// Milkshake
        {
            name: 'Yogurt Shake', category: 'Milkshake', price: '₱100', imageKey: 'skull4', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱100' },
            ]
        },
        {
            name: 'Black Tea Milkshake', category: 'Milkshake', price: '₱90', imageKey: 'skull4', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱90' },
            ]
        },
        /// Pure Tea
        {
            name: 'Black Tea', category: 'Pure Tea', price: '₱60', imageKey: 'skull5', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱60' },
                { size: 'Large', price: '₱90' }
            ]
        },
        {
            name: 'Green Tea', category: 'Pure Tea', price: '₱60', imageKey: 'skull5', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱60' },
                { size: 'Large', price: '₱90' }
            ]
        },
        {
            name: 'Oolong Tea', category: 'Pure Tea', price: '₱60', imageKey: 'skull5', description: '...', ingredients: ['...'], sizes: [
                { size: 'Medium', price: '₱60' },
                { size: 'Large', price: '₱90' }
            ]
        }
    ];


    const increaseQty = (index) => {
        setQuantities((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    };

    const decreaseQty = (index) => {
        setQuantities((prev) => ({ ...prev, [index]: Math.max(0, (prev[index] || 0) - 1) }));
    };



    return (
        <div className="flex flex-col min-h-screen bg-[#FDF8F8] w-full mt-10">



            {/* TOP BANNER SLIDER */}
            {!selectedItem && (
                <div className="mt-24 relative w-full max-w-[1370px] min-h-[300px] lg:min-h-[400px] mx-auto rounded-tl-[30px] rounded-br-[30px] overflow-hidden group bg-gray-100">


                    {bannerImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Banner ${idx + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition">
                        <button onClick={() => setCurrentBanner((currentBanner - 1 + bannerImages.length) % bannerImages.length)} className="bg-black bg-opacity-40 text-white rounded-full w-8 h-8 flex items-center justify-center">‹</button>
                        <button onClick={() => setCurrentBanner((currentBanner + 1) % bannerImages.length)} className="bg-black bg-opacity-40 text-white rounded-full w-8 h-8 flex items-center justify-center">›</button>
                    </div>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {bannerImages.map((_, i) => (
                            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === currentBanner ? 'bg-white' : 'bg-gray-400'}`} />
                        ))}
                    </div>
                </div>
            )}

            {/* MENU LIST */}
            {!selectedItem ? (
                <div className="relative mx-auto mb-20 mt-10 p-5 flex flex-col sm:flex-row" style={{ maxWidth: '90%', width: '100%', background: '#fff', border: '1px solid #E0DEDE', borderRadius: '45px' }}>

                    {/* LEFT CATEGORY PANEL */}
                    <div className="flex-none w-full sm:min-w-[200px] sm:max-w-[260px] p-5">
                        <h2 className="font-[SF Pro Rounded] font-semibold text-[30px] text-[#462525]">Menu</h2>
                        <ul className="mt-5 font-[SF Pro Rounded] text-[18px] text-[#462525]">
                            {['Classic Milktea Series', 'Fresh Milk Tea', 'Fresh Fruit', 'Milkshake', 'Pure Tea'].map((item, i) => (
                                <li key={i}
                                    className={`py-2 px-4 rounded cursor-pointer transition-all duration-300 ease-in-out transform ${activeCategory === item
                                        ? 'bg-[#D91517] text-white scale-105 translate-x-1 opacity-100'
                                        : 'hover:text-[#D91517] opacity-80'
                                        }`}
                                    onClick={() => {
                                        setIsCategoryChanging(true);
                                        setTimeout(() => {
                                            setActiveCategory(item);
                                            setIsCategoryChanging(false);
                                        }, 200); // 200ms delay before showing new category
                                    }}

                                >
                                    {item}
                                </li>


                            ))}

                        </ul>
                    </div>

                    {/* RIGHT MENU GRID */}
                    <div className="flex-1 p-5 w-full overflow-hidden">
                        <div className="flex items-center bg-[#F8F8F8] rounded-[30px] px-5 py-2 gap-2 w-full max-w-[500px] mb-6">
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="#848484" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setSearchQuery(searchInput.trim());
                                    }
                                }}


                                className="bg-[#F8F8F8] outline-none font-[SF Pro Rounded] text-[#848484] text-[15px] w-full"
                            />

                        </div>

                        <h1 className="font-[SF Pro Rounded] font-semibold text-[25px] text-[#462525] mb-6 uppercase transition-all duration-300 ease-in-out">{activeCategory}</h1>

                        <div className="w-full relative">
                            <div
                                className="overflow-y-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] max-h-[calc(100vh-350px)] pr-8 sm:pr-10 md:pr-12"
                                style={{ scrollbarGutter: 'stable both-edges', paddingRight: 'max(2rem, env(safe-area-inset-right))' }}
                            >



                                <div /// Menu Items Grid
                                    className={`grid gap-4 w-full max-w-[900px] mx-auto justify-center relative transition-all duration-200 ease-in-out transform ${isCategoryChanging ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0 translate-x-4'}`}
                                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
                                >


                                    {
                                        menuItems
                                            .filter(item => item.category === activeCategory)
                                            .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .length === 0 ? (
                                            <p className="text-center text-[#999] font-[SF Pro Rounded] text-[16px] col-span-full">Not available</p>
                                        ) : (
                                            menuItems
                                                .filter(item => item.category === activeCategory)
                                                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((item, idx) => (
                                                    <div key={idx} className="flex flex-col border border-[#E0DEDE] rounded-2xl p-4 overflow-hidden text-left hover:shadow-lg transition">
                                                        <div className="flex justify-center mb-4 relative">
                                                            <img src={item.imageKey ? images[item.imageKey] : item.image} alt={item.name} className="w-[1000px] h-[130px] object-contain z-10" />
                                                        </div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <p className="font-[SF Pro Rounded] font-semibold text-[14px] text-[#462525] w-20 h-[60px] flex items-center">{item.name}</p>
                                                            <div>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedItem(item);
                                                                        setSelectedSize('');
                                                                        setTimeout(() => setDetailAnim(true), 50);

                                                                        setTimeout(() => setDetailAnim(true), 50); // trigger animation shortly after render
                                                                    }}

                                                                    className="px-3 py-2 [SF Pro Rounded] bg-[#D91517] text-white rounded-full text-[10px] transform transition-transform duration-150 hover:scale-110 active:scale-95"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-left font-[SF Pro Rounded] text-[12px] text-[#462525]">
                                                            {selectedSize === 'Large' && selectedItem?.name === item.name
                                                                ? item.sizes?.find(sz => sz.size === 'Large')?.price
                                                                : item.price}
                                                        </p>

                                                    </div>
                                                ))
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                // Product Detail View
                <div
                    className={`relative min-h-screen pt-[100px] px-4 sm:px-6 w-full flex items-center justify-center transition-all duration-500 ease-out transform ${detailAnim ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >



                    {/* Back Button */}
                    <button
                        onClick={() => {
                            setDetailAnim(false);
                            setTimeout(() => {
                                setSelectedItem(null);
                                resetSelections(); // clear selections when going back
                            }, 300);
                        }}
                        className="bg-[#D91517] border-10 rounded-[5px] absolute left-4 top-[80px] sm:left-[107px] sm:top-[110px] sm:bottom-[107px] w-10 h-10 sm:w-[49px] sm:h-[49px] flex items-center justify-center text-white
     text-2xl sm:text-3xl z-20 transition transform hover:scale-110 active:scale-90 duration-150 ease-in-out"
                    >
                        ←
                    </button>


                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-10 max-w-screen-lg mx-auto w-full">
                        {/* Image */}
                        <img
                            src={images[selectedItem.imageKey]}
                            alt={selectedItem.name}
                            className="w-64 sm:w-72 md:w-80 h-auto object-contain"
                        />

                        {/* Details */}
                        <div className="w-full max-w-[600px]">

                            {/* Red Box */}
                            <div className="bg-[#D91517] rounded-[28px] p-6 flex flex-col gap-6 w-full">

                                {/* Title + Price */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h1 className="text-3xl sm:text-4xl font-bold font-[SF Pro Rounded] text-white">{selectedItem.name}</h1>
                                    <p className="text-xl sm:text-2xl font-semibold text-white">{selectedItem.price}</p>
                                </div>

                                {/* Tabs + Quantity */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                    {/* Tabs */}
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab('description')}
                                            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'description' ? 'bg-[#A31113] text-white' : 'bg-[#D91517]/20 text-white hover:bg-white/30'}`}
                                        >
                                            Description
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('ingredients')}
                                            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'ingredients' ? 'bg-[#A31113] text-white' : 'bg-[#D91517]/20 text-white hover:bg-white/30'}`}
                                        >
                                            Ingredients
                                        </button>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-2 bg-[#A31113] px-3 py-2 rounded-full self-start sm:self-auto">
                                        {/* Decrease Button */}
                                        <button
                                            onClick={() => setQuantities((prev) => ({
                                                ...prev,
                                                [selectedItem.imageKey]: Math.max(1, getQty(selectedItem.imageKey) - 1)
                                            }))}
                                            className="w-6 h-6 flex items-center justify-center bg-white text-[#D91517] rounded-full text-lg transition transform hover:scale-110 active:scale-90 hover:bg-gray-100"
                                        >-</button>

                                        <span className="text-white">{getQty(selectedItem.imageKey)}</span>

                                        {/* Increase Button */}
                                        <button
                                            onClick={() => setQuantities((prev) => ({
                                                ...prev,
                                                [selectedItem.imageKey]: getQty(selectedItem.imageKey) + 1
                                            }))}
                                            className="w-6 h-6 flex items-center justify-center bg-white text-[#D91517] rounded-full text-lg transition transform hover:scale-110 active:scale-90 hover:bg-gray-100"
                                        >+</button>

                                    </div>

                                </div>

                                {/* Description or Ingredients with smooth fade */}

                                <div className="bg-[#A31113] p-4 rounded-2xl text-sm text-white transition-opacity duration-500 ease-in-out
">
                                    {activeTab === 'description' ? (
                                        <p className="transition-opacity duration-300 ease-in-out opacity-100">{selectedItem.description}</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 transition-opacity duration-300 ease-in-out opacity-100">
                                            {selectedItem.ingredients?.length > 0
                                                ? selectedItem.ingredients.map((ingredient, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/20 rounded-full">{ingredient}</span>
                                                ))
                                                : <span>Ingredients list is not available.</span>
                                            }
                                        </div>
                                    )}
                                </div>



                            </div>


                            <div className="flex flex-col gap-6 mt-6">

                                {/* Size Section */}
                                <div className="border border-[#E0DEDE] rounded-[30px] bg-white p-6">
                                    <h3 className="font-[SF Pro Rounded] text-[#3E3E3E] text-[22px] mb-4 flex items-center gap-2">
                                        Size
                                        {validationErrors.size && <span className="text-red-500 text-sm">* This is required</span>}

                                    </h3>

                                    <div className="flex flex-col gap-4">
                                        {selectedItem.sizes?.map((sz, i) => (
                                            <label key={i} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">

                                                    <input
                                                        type="radio"
                                                        name="size"
                                                        value={sz.size}
                                                        checked={selectedSize === sz.size}
                                                        onChange={() => {
                                                            setSelectedSize(sz.size);
                                                            setValidationErrors(prev => ({ ...prev, size: false }));
                                                        }}
                                                        className="accent-[#61D76C]"
                                                    />

                                                    <span className="text-[#3E3E3E] text-[16px] font-[SF Pro Rounded]">{sz.size}</span>
                                                </div>
                                                <span className="text-[#3E3E3E] text-[16px] font-[SF Pro Rounded]">{sz.price}</span>
                                            </label>
                                        ))}


                                    </div>
                                </div>

                                {/* Sugar Level Section */}
                                <div className="border border-[#E0DEDE] rounded-[30px] bg-white p-6">
                                    <h3 className="font-[SF Pro Rounded] text-[#3E3E3E] text-[22px] mb-4 flex items-center gap-2">
                                        Sugar Level
                                        {validationErrors.sugar && <span className="text-red-500 text-sm">* This is required</span>}
                                    </h3>

                                    <div className="flex flex-col gap-4">
                                        {['0%', '10%', '30%', '50%', '70%', '100%'].map((sugar, i) => (
                                            <label key={i} className="flex items-center gap-2">

                                                <input
                                                    type="radio"
                                                    name="sugar"
                                                    value={sugar}
                                                    checked={selectedSugar === sugar}
                                                    onChange={() => {
                                                        setSelectedSugar(sugar);
                                                        setValidationErrors(prev => ({ ...prev, sugar: false }));
                                                    }}
                                                    className="accent-[#61D76C]"
                                                />

                                                <span className="text-[#3E3E3E] text-[16px] font-[SF Pro Rounded]">{sugar}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Ice Section */}
                                <div className="border border-[#E0DEDE] rounded-[30px] bg-white p-6">
                                    <h3 className="font-[SF Pro Rounded] text-[#3E3E3E] text-[22px] mb-4 flex items-center gap-2">
                                        Ice
                                        {validationErrors.ice && <span className="text-red-500 text-sm">* This is required</span>}
                                    </h3>


                                    <div className="flex flex-col gap-4">
                                        {['No Ice', 'Less Ice', 'More Ice'].map((ice, i) => (
                                            <label key={i} className="flex items-center gap-2">

                                                <input
                                                    type="radio"
                                                    name="ice"
                                                    value={ice}
                                                    checked={selectedIce === ice}
                                                    onChange={() => {
                                                        setSelectedIce(ice);
                                                        setValidationErrors(prev => ({ ...prev, ice: false }));
                                                    }}
                                                    className="accent-[#61D76C]"
                                                />

                                                <span className="text-[#3E3E3E] text-[16px] font-[SF Pro Rounded]">{ice}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Toppings Section */}
                                <div className="border border-[#E0DEDE] rounded-[30px] bg-white p-6">
                                    <h3 className="font-[SF Pro Rounded] text-[#3E3E3E] text-[22px] mb-4">Add-Ons</h3>
                                    <div className="flex flex-col gap-4">
                                        {[
                                            { name: 'Brown Sugar Pearls', price: '+₱20.00' },
                                            { name: 'Cononut Jelly', price: '+₱20.00' },
                                            { name: 'Red Beans', price: '+₱20.00' },
                                            { name: 'Pudding', price: '+₱20.00' },
                                            { name: 'Bwild Barley', price: '+₱20.00' }
                                        ].map((topping, i) => (
                                            <label key={i} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        value={topping.name}
                                                        checked={selectedAddOns.includes(topping.name)}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setSelectedAddOns(prev =>
                                                                prev.includes(value)
                                                                    ? prev.filter(item => item !== value) // REMOVE if uncheck
                                                                    : [...prev, value] // ADD if check
                                                            );
                                                        }}
                                                        className="accent-[#61D76C]"
                                                    />

                                                    <span className="text-[#3E3E3E] text-[16px] font-[SF Pro Rounded]">{topping.name}</span>
                                                </div>
                                                <span className="text-[#CBCBCB] italic text-[15px]">
                                                    {topping.price}
                                                </span>
                                            </label>
                                        ))}


                                    </div>

                                </div>
                                {/* ADD TO CART BUTTON */}
                                <button
                                    onClick={() => {
                                        const errors = {
                                            size: !selectedSize,
                                            sugar: !selectedSugar,
                                            ice: !selectedIce,
                                        };

                                        setValidationErrors(errors);

                                        if (errors.size || errors.sugar || errors.ice) return;

                                        const basePrice = parseInt(selectedItem.sizes.find(sz => sz.size === selectedSize).price.replace("₱", ""));
                                        const addOnsPrice = selectedAddOns.length * 20;
                                        const totalPrice = basePrice + addOnsPrice;

                                        setCartItems(prev => [
                                            ...prev,
                                            {
                                                name: selectedItem.name,
                                                size: selectedSize,
                                                sugar: selectedSugar,
                                                ice: selectedIce,
                                                price: totalPrice,
                                                qty: getQty(selectedItem.imageKey), // <-- FIXED
                                                addOns: selectedAddOns
                                            }
                                        ]);


                                        triggerToast();

                                        setDetailAnim(false);

                                        setTimeout(() => {
                                            setSelectedItem(null);
                                            resetSelections();
                                        }, 300);


                                    }}


                                    className="bg-[#D91517] hover:bg-[#a31113] text-white rounded-full py-3 text-lg font-semibold transition mt-6 mb-10"
                                >
                                    Add to Cart
                                </button>




                            </div>



                        </div>
                    </div>

                </div>
            )}


            {cartItems.length > 0 && (
                <CartBar
                    cartItems={cartItems}
                    total={cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
                    onClick={() => { }}
                />
            )}
            {showToast && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#D91517] text-white px-6 py-3 rounded-full shadow-lg transition-opacity duration-250 animate-fadeIn">
                    Item added to cart!
                </div>
            )}




        </div>
    );
}

export default Menu;