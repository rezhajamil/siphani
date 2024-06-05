import Navbar from '@/Components/atom/Navbar';
// You can also use <link> for styles


  const menuItems = [
    { route: 'dashboard.', text: 'Akun' },
    { route: '', text: 'Produk' },
    { route: '', text: 'Order' }
  ];

  const authItems = [
    { route: 'change-seller', label: 'Toko', className: 'bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium' },
    { route: 'logout', label: 'Logout', className: 'bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium'},
    // Item lainnya
  ];

export default function BuyerLayout({ auth, children }) {
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
  
