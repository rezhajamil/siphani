import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Template from '@/Layouts/Template';

export default function Produk({ auth }) {
    return (
        <>
        <Template>
            <Head title="Produk" />
            <div className='w-full bg-white min-h-screen py-15 md:py-10 px-16 flex justify-center items-center flex flex-col'>
                <div className='flex flex-col mt-20 md:mt-0'>
                    <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Beragam Pilihan Produk</h1>
                    <p className='text-center font-medium text-sm md:text-md'>Kami menawarkan beragam produk hasil pertanian mulai dari beras, buah-buahan, sayuran.</p>
                    <p className='text-center font-medium text-sm md:text-md'>Dengan berbagai pilihan yang tersedia, Anda dapat dengan mudah menemukan produk yang sesuai dengan kebutuhan dan preferensi Anda.</p>
                    <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-5 hover:bg-amber-400">Mulai Belanja</button>
                </div>
                    <ul className='flex flex-col md:flex-row gap-5 justify-center items-center m-10'>
                    <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                        <img src="/images/beras.jpg" alt="step1" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Beras</p>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                        <img src="/images/jagung.jpg" alt="step2" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Jagung</p>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                        <img src="/images/sayur.jpg" alt="step3" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Sayuran</p>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                        <img src="/images/buah.jpg" alt="step4" className="w-[200px] h-[200px] object-cover" />
                        <p className='text-center font-semibold'>Buah</p>
                    </li>
                    </ul>       
            </div>
        </Template>
        </>
    );
}
