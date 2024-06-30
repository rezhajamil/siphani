import Navbar from "@/Components/atom/Navbar";
import { HiBellAlert } from "react-icons/hi2";

const menuItems = [
    { route: ".dashboard.", text: "Dashboard" },
    { route: "seller.shop.index", text: "Profile Toko" },
    { route: "seller.product.index", text: "Produk" },
    { route: "seller.order.index", text: "Order" },
    { route: "seller.order.report", text: "Laporan Penjualan" },
    { route: "notification.index", icon: HiBellAlert },
];

const authItems = [
    {
        route: "/logout",
        label: "Logout",
        className:
            "bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium",
    },
];

export default function SellerLayout({ auth, children, unreadNotif }) {
    // Mendapatkan logoutRoute menggunakan Inertia.js

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                menuItems={menuItems}
                authItems={authItems}
                unreadNotif={unreadNotif}
            />
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
}
