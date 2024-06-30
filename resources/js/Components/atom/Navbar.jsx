import React, { useState } from "react";
import { HiBars3, HiOutlineXMark, HiBellAlert } from "react-icons/hi2";

const Navbar = ({ menuItems, authItems, unreadNotif, onOpenShopClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (index) => {
        setActiveMenuItem(index);
    };

    const getHref = (routeName, item) => {
        if (routeName && route().has(routeName)) {
            return route(routeName);
        } else if (item && item.href) {
            return item.href;
        } else {
            return "#";
        }
    };

    return (
        <nav className="fixed top-0 z-50 flex flex-col justify-between w-full shadow-md md:flex-row">
            <div
                className={`flex flex-row justify-between items-center px-5 py-3 ${
                    isMenuOpen ? "bg-transparent" : "bg-white"
                } md:bg-white md:w-1/6 md:justify-center `}
            >
                <img
                    src="/images/logo-siphani.png"
                    alt="logo"
                    className="w-[100px] h-[40px] object-cover"
                />
                <div className="flex md:hidden">
                    {isMenuOpen ? (
                        <HiOutlineXMark
                            onClick={onToggleMenu}
                            className="text-2xl text-white cursor-pointer"
                            style={{ marginLeft: "auto" }}
                        />
                    ) : (
                        <HiBars3
                            onClick={onToggleMenu}
                            className="text-2xl text-black cursor-pointer"
                        />
                    )}
                </div>
            </div>

            <div
                className={`nav-links flex flex-col md:flex-row justify-between md:items-center mx-5 mt-5 md:m-0 bg-white px-5 py-3 ${
                    isMenuOpen ? "block" : "hidden"
                } md:flex md:w-full`}
            >
                <ul className="flex flex-col gap-6 md:flex-row md:gap-10 md:items-center md:mx-auto">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={getHref(item.route, item)}
                                className={`text-black text-base font-medium ${
                                    activeMenuItem === index
                                        ? "text-amber-400"
                                        : "hover:text-amber-300"
                                }`}
                                onClick={() => handleMenuItemClick(index)}
                            >
                                {item.icon === HiBellAlert &&
                                unreadNotif > 0 ? (
                                    <div className="relative">
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                            {unreadNotif}
                                        </span>
                                        <HiBellAlert className="w-5 h-5" />
                                    </div>
                                ) : (
                                    <>
                                        {item.icon && (
                                            <item.icon className="w-5 h-5" />
                                        )}
                                        {!item.icon && item.text}
                                    </>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={`nav-auth flex flex-col md:flex-row justify-between md:items-center bg-white p-3 mx-5 md:m-0 ${
                    isMenuOpen ? "block" : "hidden"
                } md:flex md:w-1/4`}
            >
                <ul className="flex flex-col gap-3 md:flex-row md:items-center md:mx-auto">
                    {authItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.route}
                                className={`${item.className} ${
                                    activeMenuItem === index + menuItems.length
                                        ? "text-black"
                                        : "hover:text-amber-300"
                                }`}
                                onClick={() => {
                                    handleMenuItemClick(
                                        index + menuItems.length
                                    );
                                    if (item.label === "Buka Toko") {
                                        onOpenShopClick(); // Panggil fungsi dari props saat "Buka Toko" diklik
                                    }
                                }}
                            >
                                {item.icon &&
                                    React.createElement(item.icon, {
                                        className: "w-6 h-6 mr-2",
                                    })}
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
