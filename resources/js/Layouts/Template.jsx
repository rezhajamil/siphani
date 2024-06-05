import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/atom/Navbar';
// You can also use <link> for styles


  const menuItems = [
    { route: '/', text: 'Home' },
    { route: 'produk', text: 'Produk' },
    { route: 'tentang-kami', text: 'Tentang Kami' }
  ];

  const authItems = [
    { route: 'login', label: 'Login', className: 'bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium' },
    // Item lainnya
  ];

export default function Template({ auth, children }) {
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
  
