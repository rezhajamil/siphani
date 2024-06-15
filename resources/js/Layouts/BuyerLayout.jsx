import React from 'react';
import Navbar from '@/Components/atom/Navbar';
import ChangeRoleButton from '@/Components/atom/ChangeRoleBtn';
import { HiBellAlert, HiUser } from 'react-icons/hi2';

const menuItems = [
    { route: '/', text: 'Home' },
    { route: 'produk', text: 'Produk' },
    { route: 'tentang-kami', text: 'Tentang Kami' },
    { route: "order.index", text: "Order" },
    { route: "notification.index", icon: HiBellAlert },
];

const authItems = [
    {
        route: "#",
        icon: HiUser,
    },
    {
        route: "change-seller",
        label: "Buka Toko",
        className: "bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium",
    },
    {
        route: "logout",
        label: "Logout",
        className: "bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium",
    }
];
const BuyerLayout = ({ auth, children }) => {

    return (
        <>
            <Navbar menuItems={menuItems} authItems={authItems} />
            {children}
            <footer className="w-full bg-white">
                <hr />
                <div className="h-[69px] grid place-items-center">
                    <p className="text-center text-black">
                        &copy; 2024 Kelompok Tani - All Right Reserved
                    </p>
                </div>
            </footer>
        </>
    );
};

export default BuyerLayout;
