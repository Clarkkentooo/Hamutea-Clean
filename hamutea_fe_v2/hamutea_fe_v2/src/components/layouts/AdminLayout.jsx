import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import HamuteaLogo from "@assets/svg/logo-text.svg"
import Icon from "@components/common/Icon";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const NAVIGATION = [
        { name: "Dashboard", icon: "ChartColumnBig", path: "/admin/dashboard" },
        { name: "Analytics", icon: "Activity", path: "/admin/analytics" },
        { name: "Products", icon: "Coffee", path: "/admin/products", highlight: true },
        { name: "Orders", icon: "ShoppingCart", path: "/admin/orders" },
        { name: "Transactions", icon: "ReceiptText", path: "/admin/transactions" },
        { name: "Users", icon: "Users", path: "/admin/users" },
    ]

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
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
                    </div>
                </div>
                <div className="px-3 cursor-pointer">
                    <div className="flex justify-between items-center border-t p-5 border-hamutea-border">
                        <div className="flex items-center gap-2 ">
                            <Icon name="SquareUser" className="text-hamutea-red w-8 h-8" />
                            <div className="text-hamutea-gray ">
                                <h2 className="font-bold">Admin</h2>
                                <p className="text-sm -mt-2">admin_hamutea@gmail.com</p>
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
                        <button 
                            onClick={() => {
                              // Store admin token in cashier storage to enable direct access
                              const adminToken = localStorage.getItem('adminToken');
                              const adminUser = localStorage.getItem('adminUser');
                              if (adminToken && adminUser) {
                                localStorage.setItem('cashierToken', adminToken);
                                localStorage.setItem('cashierUser', adminUser);
                                // Navigate to cashier portal
                                navigate('/cashier/orders');
                              } else {
                                alert('Unable to access cashier portal. Please log in again.');
                              }
                            }}
                            className="inline-flex items-center gap-2 bg-hamutea-red text-white px-4 py-2 rounded-lg hover:bg-hamutea-red/90 transition-colors"
                        >
                            <Icon name="ShoppingCart" className="w-5 h-5" />
                            <span>Cashier Portal</span>
                        </button>
                        <Link to="/menu" className="inline-flex items-center gap-2 text-hamutea-red hover:text-hamutea-red/80 transition-colors">
                            <span>Main Website</span>
                            <Icon name="ArrowRight" className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="p-10 flex-1 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;