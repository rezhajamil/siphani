import React from 'react';
import Navbar from '@/Components/atom/Navbar';


const menuItems = [
    { route: '/', text: 'Home' },
    { route: 'admin.tag.index', text: "Tag" },
    { route: 'admin.category.index', text: "Kategori Produk" },
    { route: 'admin.unit.index', text: "Satuan" },
    { route: "admin.user.index", text: "Kelola User dan Toko" },
];

const authItems = [
    {
        route: "/logout",
        label: "Logout",
        className: "bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium",
    }
];

const AdminLayout = ({ auth, children, notificationCount }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar menuItems={menuItems} authItems={authItems}/>
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

export default AdminLayout;
