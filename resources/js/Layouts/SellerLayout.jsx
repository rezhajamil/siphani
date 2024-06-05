import Navbar from '@/Components/atom/Navbar';
// You can also use <link> for styles


  const menuItems = [
    { route: 'dashboard.', text: 'Dashboard' },
    { route: 'dashboard.seller.shop.index', text: 'Profile Toko' },
    { route: 'dashboard.seller.product.index', text: 'Produk' },
    { route: null , text: 'Order' }
  ];

  const authItems = [
    { route: 'logout', label: 'Logout', className: 'bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium'},
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
  
