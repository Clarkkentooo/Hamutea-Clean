import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from "@assets/svg/logo-lndscp.svg"
import FlatLogo from "@assets/svg/flat-logo-white.svg"
import LogoWithText from "@assets/svg/logo-text-white.svg"
import images from "@utils/imageLoader";
import Icon from "@components/common/Icon";
import { useClientContext } from "@context/ClientContext";
import { useAuth } from "@context/AuthContext";

const ClientLayout = () => {
    const location = useLocation();
    const { currentUser, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        // Delay scroll to wait for route render
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
    }, [location]);

    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useClientContext();
    const NAV_ITEMS = [
        { name: "Menu", href: "/" },
        { name: "Rewards", href: "/rewards" },
        { name: "Our Stories", href: "#" },
        { name: "Contact Us", href: "#" },
    ]

    const handleSignOut = () => {
        logout();
        // Redirect to home page
        window.location.href = '/';
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 p-5">
                <div className={`md:hidden fixed top-0 left-0 h-screen w-screen bg-hamutea-red z-50 flex items-center justify-center flex-col text-white gap-10 transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="absolute top-10 right-10">
                        <Icon name="X" className="text-white w-7 h-7 cursor-pointer" onClick={() => setIsOpen(false)} />
                    </div>
                    <RenderNavItem navItems={NAV_ITEMS} setIsOpen={setIsOpen} />
                </div>
                <div className="flex bg-hamutea-red rounded-full p-5 px-10 text-white justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Icon name="Menu" className="text-white w-7 h-7 md:hidden block cursor-pointer" onClick={() => setIsOpen(true)} />
                        <img src={Logo} alt="" className="h-8 md:block hidden" />
                        <img src={FlatLogo} alt="" className="h-8 md:hidden block" />
                    </div>

                    <div className="flex gap-5 items-center">
                        <div className="gap-5 md:flex hidden">
                            <RenderNavItem navItems={NAV_ITEMS} setIsOpen={setIsOpen} />
                        </div>
                        
                        {isAuthenticated ? (
                            <Link to="/account" className="bg-white rounded-full text-hamutea-red px-5 py-2 cursor-pointer">
                                Account
                            </Link>
                        ) : (
                            <Link to="/sign-in" className="bg-white rounded-full text-hamutea-red px-5 py-2 cursor-pointer">
                                Sign In
                            </Link>
                        )}
                        
                        <div className="relative cursor-pointer">
                            {
                                cartItems.length > 0 && (
                                    <div className="absolute -top-1 -right-2 bg-white text-hamutea-red w-4 h-4 rounded-full flex items-center justify-center text-[0.7rem]">
                                        {cartItems.length}
                                    </div>
                                )
                            }
                            <Icon name="ShoppingCart" className="text-white w-7 h-7 shrink-0 " />
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer className="bg-hamutea-red text-white p-10 pb-2">
                <div className="flex mb-7 md:flex-row flex-col">
                    <img src={LogoWithText} alt="" className="h-24 md:h-28 md:mb-0 mb-5 " />
                    <div className="flex justify-end md:items-center  flex-col w-full pb-5 ">
                        <div className="flex gap-3 sm:gap-10 lg:gap-20 items-center justify-center">

                            <RenderNavItem navItems={NAV_ITEMS} setIsOpen={setIsOpen} />

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 flex items-center justify-end flex-col md:pb-5">
                        {/* <img src={SocialMediaGroup} alt="" className="h-7" /> */}
                        <div className="flex gap-5 items-center">
                            <img src={images.facebook} alt="" className="hover:scale-110 transition-all duration-300 cursor-pointer" />
                            <img src={images.messenger} alt="" className="hover:scale-110 transition-all duration-300 cursor-pointer" />
                            <img src={images.instagram} alt="" className="hover:scale-110 transition-all duration-300 cursor-pointer" />
                            <img src={images.tiktok} alt="" className="hover:scale-110 transition-all duration-300 cursor-pointer" />
                            <img src={images.youtube} alt="" className="hover:scale-110 transition-all duration-300 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white w-full items-center flex md:justify-between justify-center md:px-5 px-0 py-5 md:flex-row flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="aspect-square h-3 w-3 rounded-full bg-white border-2 border-hamutea-gray"></div>
                        <p>{new Date().getFullYear()} All rights reserve.</p>
                    </div>

                    <div className="flex items-center  gap-10">
                        <Link to="#" className="hover:underline cursor-pointer">Terms of Service</Link>
                        <Link to="#" className="hover:underline cursor-pointer">Cookies</Link>
                        <Link to="#" className="hover:underline cursor-pointer">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}


const RenderNavItem = ({ navItems, setIsOpen }) => {
    return (
        <>
            {
                navItems.map((item, index) => (
                    <Link to={item.href}
                        onClick={() => setIsOpen(false)}
                        key={index}
                        className="cursor-pointer relative group overflow-hidden"
                    >
                        {item.name}
                        <span
                            className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full group-hover:left-0"
                        ></span>
                    </Link>
                ))
            }
        </>
    )
}

export default ClientLayout;