import { useState, useEffect, useMemo } from 'react';
// Replace missing ad images with placeholder images
import banner1 from '@assets/menu_assets/banner1.svg';
import banner2 from '@assets/menu_assets/banner2.svg';
import banner3 from '@assets/menu_assets/banner3.svg';
import images from "@utils/imageLoader";
import CartBar from "@features/client/menu/components/CartBar";
import { useClientContext } from "@context/ClientContext";
import Icon from "@components/common/Icon";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [openAds, setOpenAds] = useState(true);
    
    // Use banner images as placeholders for ads since the ad images don't exist
    const ads = [banner1, banner2, banner3, banner1];

    // Randomly pick one ad image once on mount
    const selectedAd = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * ads.length);
        return ads[randomIndex];
    }, []);

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
    const [showTotalSummary, setShowTotalSummary] = useState(false);
    const [summaryAnim, setSummaryAnim] = useState(false);
    const [pickupOption, setPickupOption] = useState('after');
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('GCash');
    const [timeWarning, setTimeWarning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const navigate = useNavigate();
    const [customTime, setCustomTime] = useState('');
    const [customHour, setCustomHour] = useState('--');
    const [customMinute, setCustomMinute] = useState('--');
    const [customPeriod, setCustomPeriod] = useState('edit');
    
    const generate12HourTimes = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const suffix = hour < 12 ? 'AM' : 'PM';
                const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                const min = minute === 0 ? '00' : minute;
                times.push(`${hour12}:${min} ${suffix}`);
            }
        }
        return times;
    };
    
    useEffect(() => {
        setCustomTime(`${customHour}:${customMinute} ${customPeriod}`);
        if (pickupOption === 'custom' && customHour !== '--' && customMinute !== '--' && customPeriod !== 'edit') {
            setTimeWarning(false);
        }
    }, [customHour, customMinute, customPeriod]);

    const getQty = (key) => quantities[key] ?? 1;
    const { cartItems, setCartItems } = useClientContext();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedSugar, setSelectedSugar] = useState('');
    const [selectedIce, setSelectedIce] = useState('');
    const [showToast, setShowToast] = useState(false);

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
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
                delete newQuantities[selectedItem.imageKey];
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(prev => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerImages.length]);

    useEffect(() => {
        if (selectedItem) {
            window.scrollTo(0, 0);
        }
    }, [selectedItem]);

    useEffect(() => {
        const handleOpenSummary = () => {
            setShowTotalSummary(true);
            setTimeout(() => setSummaryAnim(true), 30);
        };

        window.addEventListener('openTotalSummary', handleOpenSummary);
        return () => window.removeEventListener('openTotalSummary', handleOpenSummary);
    }, []);

    useEffect(() => {
        if (showTotalSummary) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showTotalSummary]);

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
            name: 'Signature Pudding Dodol', category: 'Classic Milktea Series', price: '₱110', imageKey: 'sig_pudding_dodol', description: 'A rich and creamy blend with our signature pudding and Hamutea Dodol', ingredients: ['Sugar', 'Pudding', 'Thick Milk', 'Iced'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'No.3 Milk Tea', category: 'Classic Milktea Series', price: '₱110', imageKey: 'no_3_milktea', description: 'The third in line, but first in flavor—crafted to stand', ingredients: ['Sugar', 'Thick Milk', 'Iced'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱130' }
            ]
        },
        {
            name: 'Black Sugar Pearl Milk Tea', category: 'Classic Milktea Series', price: '₱110', imageKey: 'black_sugar_pearl_milk_tea', description: 'A bold tea with deep caramel notes and chewy black sugar pearls', ingredients: ['Sugar', 'Thick Milk', 'Iced'], sizes: [
                { size: 'Medium', price: '₱110' },
                { size: 'Large', price: '₱120' }
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FDF8F8] w-full mt-10">
            <AnimatePresence>
                {openAds && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 flex items-center justify-center"
                        onClick={() => setOpenAds(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-5xl bg-white rounded-2xl p-5 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setOpenAds(false)}
                                className="absolute top-3 right-3 p-2 bg-white text-gray-800 hover:bg-gray-100 rounded-full shadow-md border border-gray-300 transition"
                            >
                                <Icon name="X" className="w-5 h-5" />
                            </button>
                            <img src={selectedAd} alt="Ad" className="w-full h-auto rounded-xl" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

            {/* Rest of your component */}
        </div>
    );
};

export default Menu;