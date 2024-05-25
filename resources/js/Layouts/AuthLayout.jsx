"use client"
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/atom/Navbar';
import 'aos/dist/aos.css'; // You can also use <link> for styles


  const menuItems = [

  ];

  const authItems = [
    { href: '/register', label: 'Register', className: 'bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium' },
    // Item lainnya
  ];

export default function AuthLayout({ auth, children }) {
    return (
        <>
        <Navbar menuItems={menuItems} authItems={authItems} />
        {children}
        <footer class="w-full bg-white">
            <hr />
            <div class="h-[69px] grid place-items-center">
            <p class="text-center text-black">&copy; 2024 Kelompok Tani - All Right Reserved</p>
            </div>
        </footer>
        </>
    );
}
  
