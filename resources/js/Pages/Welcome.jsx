import { Link, Head } from '@inertiajs/react';
import NavbarUser from '@/Components/atom/NavBarUser';
import { Typed } from 'react-typed';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <NavbarUser />
            <div
                className="w-full h-[80vh] bg-cover bg-no-repeat py-10 px-16 flex justify-center items-center"
                style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(254, 182, 0, 3)), url(storage/images/pertanian.jpg)', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                <div className='flex flex-col justify-center mx-auto mt-20'>
                    <h1 className='text-white text-4xl md:text-5xl font-bold font-sans cursor-pointer'>Jual Hasil Panen Langsung</h1>
                    <h1 className='text-white text-4xl md:text-5xl font-bold font-sans cursor-pointer md:text-center mt-5 w-fit md:mx-auto'>ke Pembeli</h1>
                    <p className='text-white text-xl bg-lime-500 cursor-pointer rounded-lg px-3 py-1 w-fit mt-5 md:mx-auto'> Hasil Pertanian</p>
                    <p className='text-white text-xl bg-lime-500 cursor-pointer rounded-lg px-3 py-1 w-fit mt-2 md:mx-auto'> Mudah dan Hemat!</p>
                </div>
            </div>

            <div className='bg-amber-300 h-fit p-5 flex justify-center'>
            <div className='flex flex-col md:flex-row gap-8 justify-center items-center'>
                <img src="storage/images/padi.jpg" alt="padi" className="w-[500px] h-[300px] object-cover" />
                <div className='flex flex-col justify-center md:justify-start md:w-1/4'>
                    <p className='text-amber-600 text-md font-medium'>About Us</p>
                    <h1 className='text-black text-xl md:text-3xl font-bold mt-3'>Bersama Kami, Jual Hasil Panen Anda Langsung ke Pembeli</h1>
                    <p className='text-black text-md font-medium mt-3'>kami menghubungkan petani langsung dengan konsumen, menciptakan sebuah ekosistem yang menguntungkan bagi semua pihak. Untuk para petani, inilah kesempatan emas untuk menjual hasil panen Anda langsung ke pembeli tanpa biaya perantara besar, memastikan Anda mendapatkan keuntungan maksimal.</p>
            </div>
            </div>
        </div>

        <footer class="w-full bg-white">
            <div class="h-[69px] grid place-items-center">
            <p class="text-center text-black">&copy; 2024 Kelompok Tani - All Right Reserved</p>
            </div>
        </footer>
        </>
    );
}
