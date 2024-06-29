import React from 'react';
import Navbar from '@/Components/atom/Navbar';
import { HiBellAlert } from 'react-icons/hi2';

const SellerLayout = ({ auth, children, notificationCount }) => {
  const menuItems = [
    { route: '.dashboard.', text: 'Dashboard' },
    { route: 'seller.shop.index', text: 'Profile Toko' },
    { route: 'seller.product.index', text: 'Produk' },
    { route: 'seller.order.index', text: 'Order'},
    { route: "notification.index", icon: HiBellAlert, notificationCount: notificationCount > 0 ? notificationCount : null },
  ];

  const authItems = [
    { route: '/logout', label: 'Logout', className: 'bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar menuItems={menuItems} authItems={authItems} notificationCount={notificationCount} />
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

export default SellerLayout;
