"use client"
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/atom/Navbar';
import { useCallback, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


  const menuItems = [
    { href: '/', text: 'Home' },
    { href: '/produk', text: 'Produk' },
    { href: '/belanja', text: 'Belanja' },
    { href: '/tentang-kami', text: 'Tentang Kami' }
  ];

  const authItems = [
    { href: '/login', label: 'Login', className: 'bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium' },
    // Item lainnya
  ];
  
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    useEffect(()=> {
        Aos.init();
    }, [])
    return (
        <>
            <Navbar menuItems={menuItems} authItems={authItems} />
            <div
                className="w-full min-h-[90vh] bg-cover bg-no-repeat py-10 px-16 flex justify-center items-center flex flex-col"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(254, 182, 0, 3), transparent), url(storage/images/pertanian.jpg)', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                <div className='flex flex-col justify-center mx-auto mt-20 mb-10'>
                    <h1 className='text-white text-3xl md:text-5xl font-extrabold tracking-tight'>Jual Hasil Panen Langsung</h1>
                    <h1 className='text-white text-3xl md:text-5xl font-extrabold tracking-tight font-sans md:text-center mt-1 w-fit md:mx-auto'>ke Pembeli</h1>
                    <p className='text-white  text-md md:text-xl bg-lime-500 px-3 py-1 w-fit mt-5 md:mx-auto'> Belanja Hasil Pertanian</p>
                    <p className='text-white text-md md:text-xl bg-lime-500 px-3 py-1 w-fit mt-2 md:mx-auto'> Mudah dan Hemat!</p>
                </div>

                <div>
                <ul className='flex flex-col md:flex-row gap-5 justify-center md:items-center'>
                    <li className='bg-amber-200 p-3 rounded-lg flex md:flex-row items-center justify-center gap-3 md:w-1/3 cursor-pointer'>
                    <img src="storage/images/padi.png" alt="step3" className="w-[80px] h-[80px] object-cover rounded-lg" />
                        <div className='flex flex-col'>
                        <h1 className='text-md md:text-xl font-bold'>Produk Segar Berkualitas</h1>
                        <p className='text-md md:text-xlfont-medium text-xs w-fit'> Anda bisa mendapatkan hasil pertanian segar dan berkualitas tinggi setiap kali berbelanja di website ini</p>
                        </div>
                    </li>
                    <li className='bg-amber-200 p-3 rounded-lg flex md:flex-row items-center justify-center gap-3 md:w-1/3 cursor-pointer'>
                    <img src="storage/images/petani.png" alt="step3" className="w-[80px] h-[80px] object-cover rounded-lg" />
                        <div className='flex flex-col'>
                        <h1 className='text-md md:text-xl font-bold'>Dukung Petani Lokal</h1>
                        <p className='font-medium text-xs w-fit'> Dengan berbelanja melalui website ini, Anda secara langsung mendukung petani lokal dan ekonomi lokal</p>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>

            <div className='bg-amber-300 h-fit p-5 flex justify-center'>
            <div className='flex flex-col md:flex-row gap-8 justify-center items-center'>
                <img src="storage/images/padi.jpg" alt="padi" className="w-[500px] h-[300px] object-cover" data-aos ="fade-up" data-aos-duration="1000" />
                <div className='flex flex-col justify-center md:justify-start md:w-1/4'>
                    <p className='text-amber-600 text-md font-medium' data-aos ="fade-up" data-aos-duration="1000">About Us</p>
                    <h1 className='text-black text-xl md:text-3xl font-bold mt-3' data-aos ="fade-up" data-aos-duration="1000">Bersama Kami, Jual Hasil Panen Anda Langsung ke Pembeli</h1>
                    <p className='text-black text-md font-medium mt-3' data-aos ="fade-up" data-aos-duration="1000">kami menghubungkan petani langsung dengan konsumen, menciptakan sebuah ekosistem yang menguntungkan bagi semua pihak. Untuk para petani, inilah kesempatan emas untuk menjual hasil panen Anda langsung ke pembeli tanpa biaya perantara besar, memastikan Anda mendapatkan keuntungan maksimal.</p>
            </div>
            </div>
        </div>

        <div className="bg-white h-fit p-5 flex justify-center flex flex-col">
                <h1 className='text-amber-600 text-xl md:text-3xl font-bold my-3 text-center'>Bagaimana cara memesan?</h1>
                    <ul className='flex flex-col md:flex-row gap-5 justify-center items-center m-5'>
                    <li className='bg-amber-200 p-5 rounded-lg flex flex-col justify-center gap-3'>
                        <img src="storage/images/step1.png" alt="step1" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Memilih Produk</p>
                    </li>
                    <li className='bg-amber-200 p-5 rounded-lg flex flex-col justify-center gap-3'>
                        <img src="storage/images/step2.png" alt="step2" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Lakukan pemesanan</p>
                    </li>
                    <li className='bg-amber-200 p-5 rounded-lg flex flex-col justify-center gap-3'>
                        <img src="storage/images/step3.png" alt="step3" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Konfirmasi dan bayar</p>
                    </li>
                    <li className='bg-amber-200 p-5 rounded-lg flex flex-col justify-center gap-3'>
                        <img src="storage/images/step4.png" alt="step4" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Pengiriman</p>
                    </li>
                    </ul>
                    <p className='text-center'>Pesan dan nikmati hasil panen yang segar dari petani lokal</p>
                    <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-3">Mulai Belanja</button>
        </div>

        <footer class="w-full bg-white">
            <hr />
            <div class="h-[69px] grid place-items-center">
            <p class="text-center text-black">&copy; 2024 Kelompok Tani - All Right Reserved</p>
            </div>
        </footer>
        </>
    );
}
