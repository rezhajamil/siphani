import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/atom/Navbar';
// You can also use <link> for styles


  const menuItems = [
    { route: '/', text: 'Home' },
    { route: 'produk', text: 'Produk' },
    { route: 'tentang-kami', text: 'Tentang Kami' }
  ];

  const authItems = [
    { route: '/login', label: 'Login', className: 'bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium' },
  ];


export default function Template({ auth, children }) {
    return (
        <>
        <Navbar menuItems={menuItems} authItems={authItems} />
        {children}
        <footer className="w-full bg-white">
            <hr />
            <div className="h-[69px] grid place-items-center">
            <p className="text-center text-black">&copy; 2024 Kelompok Tani - All Right Reserved</p>
            </div>
        </footer>
        </>
    );
}
  
