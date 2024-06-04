import Navbar from '@/Components/atom/Navbar';
// You can also use <link> for styles


  const menuItems = [
    { href: '/', text: 'Dashboard' },
    { href: '/profile', text: 'Profile Toko' },
    { href: '/produk', text: 'Produk' },
    { href: '/order', text: 'Order' }
  ];

  const authItems = [
    { href: '/buyer', label: 'Pembeli', className: 'bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium' },
    // Item lainnya
  ];

export default function SellerLayout({ auth, children }) {
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
  
