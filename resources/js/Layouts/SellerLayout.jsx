import Navbar from '@/Components/atom/Navbar';


const menuItems = [
  { route: 'dashboard.', text: 'Dashboard' },
  { route: 'dashboard.seller.shop.index', text: 'Profile Toko' },
  { route: 'dashboard.seller.product.index', text: 'Produk' },
  { route: null, text: 'Order' }
];

const authItems = [
  { route: 'logout', label: 'Logout', className: 'bg-transparent px-4 py-3 rounded-lg text-amber-500 text-base font-medium' },
];

export default function SellerLayout({ auth, children }) {// Mendapatkan logoutRoute menggunakan Inertia.js

  return (
    <>
      <Navbar menuItems={menuItems} authItems={authItems}/>
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
