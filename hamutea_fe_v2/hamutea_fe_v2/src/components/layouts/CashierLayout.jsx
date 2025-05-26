import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import HamuteaLogo from "@assets/svg/logo-text.svg"
import Icon from "@components/common/Icon";

const CashierLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const NAVIGATION = [
        { name: "All Orders", icon: "ShoppingCart", path: "/cashier/orders" },
        { name: "Pending Orders", icon: "Clock", path: "/cashier/orders?status=pending" },
        { name: "Processing", icon: "RefreshCcw", path: "/cashier/orders?status=processing" },
        { name: "Ready for Pickup", icon: "Package", path: "/cashier/orders?status=ready_for_pickup" },
        { name: "Completed", icon: "CheckCircle", path: "/cashier/orders?status=completed" }
    ]

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('cashierToken');
        localStorage.removeItem('cashierUser');
        navigate('/');
    }

    return (
        <div className="w-screen h-screen relative flex">
            <div className={`w-full h-full lg:max-w-[18rem] transform lg:translate-x-0 border border-hamutea-border absolute lg:relative flex bg-white  flex-col justify-between z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out`}>
                <div className="flex items-center justify-center mt-10 relative">
                    <img src={HamuteaLogo} alt="" className="h-[4.6875rem]" />
                    <div className="absolute top-0 right-5 p-2 flex items-center gap-2">
                        <Icon name="X" className="text-hamutea-red w-6 h-6 block lg:hidden" onClick={() => setIsOpen(false)} />
                    </div>
                </div>
                <div className="flex-1 py-10 px-5 flex gap-4">
                    <div className="w-full">
                        <div className="mb-6 px-3">
                            <h3 className="text-gray-500 text-sm uppercase font-semibold">Order Management</h3>
                        </div>
                        {
                            NAVIGATION.map((nav, index) => (
                                <div 
                                    key={index} 
                                    className={`mb-2 flex gap-5 w-full items-center p-3 rounded-2xl transition-all duration-300 ease-in-out hover:bg-gray-100 cursor-pointer 
                                    ${location.pathname.startsWith(nav.path) ? 'bg-hamutea-red/10 border-l-4 border-hamutea-red shadow-sm' : ''}
                                    ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                                    onClick={() => handleNavigation(nav.path)}
                                >
                                    <Icon name={nav.icon} className={`${location.pathname.startsWith(nav.path) ? 'text-hamutea-red' : index % 2 === 0 ? 'text-gray-700' : 'text-gray-500'} w-6 h-6`} />
                                    <p className={`${location.pathname.startsWith(nav.path) ? 'font-bold text-hamutea-red' : ''}`}>{nav.name}</p>
                                </div>
                            ))
                        }
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <h4 className="text-blue-700 font-medium mb-2">Quick Tips</h4>
                            <ul className="text-sm text-blue-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <Icon name="CheckCircle" className="w-4 h-4 mt-0.5 text-blue-500" />
                                    <span>Update order status promptly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="CheckCircle" className="w-4 h-4 mt-0.5 text-blue-500" />
                                    <span>Mark orders as "Ready for Pickup" when prepared</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icon name="CheckCircle" className="w-4 h-4 mt-0.5 text-blue-500" />
                                    <span>Complete orders after customer pickup</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="px-3 cursor-pointer">
                    <div className="flex justify-between items-center border-t p-5 border-hamutea-border">
                        <div className="flex items-center gap-2 ">
                            <Icon name="SquareUser" className="text-hamutea-red w-8 h-8" />
                            <div className="text-hamutea-gray ">
                                <h2 className="font-bold">
                                    {JSON.parse(localStorage.getItem('cashierUser') || '{}').role === 'admin' ? 'Admin (Cashier Mode)' : 'Cashier'}
                                </h2>
                                <p className="text-sm -mt-2">
                                    {JSON.parse(localStorage.getItem('cashierUser') || '{}').email || 'cashier@hamutea.com'}
                                </p>
                            </div>
                        </div>
                        <div onClick={handleLogout}>
                            <Icon name="LogOut" className="text-hamutea-gray shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="p-5 border-b border-hamutea-border flex justify-between items-center px-7">
                    <div>
                        <Icon
                            onClick={() => setIsOpen(true)}
                            name="Menu"
                            className="text-hamutea-red w-6 h-6 cursor-pointer lg:hidden block" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="inline-flex gap-2 text-hamutea-red">
                            <span className="font-bold">Cashier Portal</span>
                        </div>
                        <div className="bg-hamutea-red text-white px-4 py-2 rounded-full text-sm font-medium">
                            Order Management
                        </div>
                        {JSON.parse(localStorage.getItem('cashierUser') || '{}').role === 'admin' && (
                            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                                <span>Back to Admin</span>
                                <Icon name="ArrowRight" className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="p-10 flex-1 overflow-y-scroll bg-gray-50">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CashierLayout;