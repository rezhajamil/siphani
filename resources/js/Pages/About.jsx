import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Template from '@/Layouts/Template';

export default function Produk({ auth }) {
    return (
        <>
        <Template>
            <Head title="Produk" />
            <div className='w-full bg-gray-50 min-h-screen py-20 md:py-10 px-16 flex justify-between items-center flex-col md:flex-row'>
                <div className='flex flex-col md:w-1/2'>
                    <h1 className='bg-lime-500 text-white text-4xl font-semibold mb-6 w-fit'>Tentang Kami</h1>
                    <p className='font-medium text-md text-justify'>Kami menghubungkan petani langsung dengan konsumen, menciptakan sebuah ekosistem yang menguntungkan bagi semua pihak. Untuk para petani, inilah kesempatan emas untuk menjual hasil panen Anda langsung ke pembeli tanpa biaya perantara besar, memastikan Anda mendapatkan keuntungan maksimal</p>
                    <p className='font-medium text-md mt-3 text-justify'>Dan bagi para konsumen, kami menyediakan berbagai hasil pertanian segar dan berkualitas tinggi langsung dari petani dengan harga yang lebih terjangkau. Anda dapat berbelanja dengan mudah dan hemat, memastikan Anda mendapatkan produk yang segar dan sehat untuk keluarga Anda.
                    <br /><br />
                    Bergabunglah dengan kami dalam perjalanan menuju masa depan pertanian yang lebih baik dan lebih adil. Dengan membeli langsung dari petani, Anda tidak hanya mendapatkan produk terbaik tetapi juga mendukung komunitas pertanian lokal.
                    </p>
                </div> 
                <div className='bg-white p-3 rounded-lg'>
                <img src="images/logo-siphani.png" alt="logo" className="md:w-[600px] md:h-[200px] w-[300px] h-[100px] object-cover" />    
                </div>
            </div>
        </Template>
        </>
    );
}
