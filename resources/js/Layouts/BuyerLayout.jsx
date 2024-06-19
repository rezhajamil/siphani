import React from 'react';
import Navbar from '@/Components/atom/Navbar';
import { HiBellAlert, HiUser } from 'react-icons/hi2';

const menuItems = [
    { route: '/', text: 'Home' },
    { route: 'produk', text: 'Produk' },
    { route: 'tentang-kami', text: 'Tentang Kami' },
    { route: "order.index", text: "Order" },
    { route: "notification.index", icon: HiBellAlert },
];

const handleOpenShopClick = () => {
    const userConfirmed = window.confirm("Apakah Anda yakin ingin membuka toko?");
    if (userConfirmed) {
        window.location.href = "/user/change-role?role=Seller&route=seller.shop.index";
    }
};

const authItems = [
    {
        route: "#",
        icon: HiUser,
    },
    {
        route: "#",
        label: "Buka Toko",
        className: "bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium cursor-pointer",
    },
    {
        route: "/logout",
        label: "Logout",
        className: "bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium",
    }
];

const BuyerLayout = ({ auth, children, notificationCount }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar menuItems={menuItems} authItems={authItems} notificationCount={notificationCount} onOpenShopClick={handleOpenShopClick}  />
            <main className="flex-1">{children}</main>
            <footer className="w-full bg-white">
                <hr />
                <div className="h-[69px] grid place-items-center">
                    <p className="text-center text-black">
                        &copy; 2024 Kelompok Tani - All Right Reserved
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default BuyerLayout;
