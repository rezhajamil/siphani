import { Link, Head, usePage } from '@inertiajs/react';
import Template from '@/Layouts/Template';
import BuyerLayout from '@/Layouts/BuyerLayout'; 
import SellerLayout from '@/Layouts/SellerLayout';
import { useCallback, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; 

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { user } = usePage().props; // Retrieve the user from props

    useEffect(() => {
        Aos.init();
    }, []);

    const renderLayout = () => {
        if (user && user.role === 'Buyer') {
            return (
                <BuyerLayout>
                    {renderContent()}
                </BuyerLayout>
            );
        } else if (user && user.role === 'Seller') {
            return (
                <SellerLayout>
                    {renderContent()}
                </SellerLayout>
            )
        } else {
            return (
                <Template>
                    {renderContent()}
                </Template>
            );
        }
    };

    const renderContent = () => {
        return (
            <>
                <div
                    className="w-full min-h-[90vh] bg-cover bg-no-repeat py-10 px-16 flex justify-center items-center flex flex-col"
                    style={{ backgroundImage: 'linear-gradient(to bottom, rgba(254, 182, 0, 3), transparent), url(images/pertanian.jpg)', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                    <div className='flex flex-col justify-center mx-auto mt-20 mb-10'>
                        <h1 className='text-white text-3xl md:text-5xl font-bold tracking-tight md:text-center'>Jual Hasil Panen</h1>
                        <h1 className='text-white text-3xl md:text-5xl font-bold tracking-tight font-sans md:text-center mt-1 w-fit md:mx-auto'>Langsung ke Pembeli</h1>
                        <p className='text-white  text-md md:text-xl bg-lime-500 px-3 py-1 w-fit mt-5 md:mx-auto'> Belanja Hasil Pertanian</p>
                        <p className='text-white text-md md:text-xl bg-lime-500 px-3 py-1 w-fit mt-2 md:mx-auto'> Mudah dan Hemat!</p>
                    </div>

                    <div>
                        <ul className='flex flex-col md:flex-row gap-5 justify-center md:items-center'>
                            <li className='bg-amber-200 p-3 rounded-lg flex md:flex-row items-center justify-center gap-3 md:w-1/3 cursor-pointer'>
                                <img src="images/padi.png" alt="step3" className="w-[80px] h-[80px] object-cover rounded-lg" />
                                <div className='flex flex-col'>
                                    <h1 className='text-md md:text-xl font-bold'>Produk Segar Berkualitas</h1>
                                    <p className='text-sm md:text-md font-medium w-fit'> Anda bisa mendapatkan hasil pertanian segar dan berkualitas tinggi setiap kali berbelanja di website ini</p>
                                </div>
                            </li>
                            <li className='bg-amber-200 p-3 rounded-lg flex md:flex-row items-center justify-center gap-3 md:w-1/3 cursor-pointer'>
                                <img src="images/petani.png" alt="step3" className="w-[80px] h-[80px] object-cover rounded-lg" />
                                <div className='flex flex-col'>
                                    <h1 className='text-md md:text-xl font-bold'>Dukung Petani Lokal</h1>
                                    <p className='text-sm md:text-md font-medium w-fit'> Dengan berbelanja melalui website ini, Anda secara langsung mendukung petani lokal dan ekonomi lokal</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='bg-amber-300 h-fit p-5 flex justify-center'>
                    <div className='flex flex-col md:flex-row gap-8 justify-center items-center'>
                        <img src="images/padi.jpg" alt="padi" className="w-[500px] h-[300px] object-cover" data-aos="fade-up" data-aos-duration="1000" />
                        <div className='flex flex-col justify-center md:justify-start md:w-1/4'>
                            <p className='text-amber-600 text-md font-medium' data-aos="fade-up" data-aos-duration="1000">About Us</p>
                            <h1 className='text-black text-xl md:text-3xl font-bold mt-3' data-aos="fade-up" data-aos-duration="1000">Bersama Kami, Jual Hasil Panen Anda Langsung ke Pembeli</h1>
                            <p className='text-black text-md font-medium mt-3' data-aos="fade-up" data-aos-duration="1000">Kami menghubungkan petani langsung dengan konsumen, menciptakan sebuah ekosistem yang menguntungkan bagi semua pihak. Untuk para petani, inilah kesempatan emas untuk menjual hasil panen Anda langsung ke pembeli tanpa biaya perantara besar, memastikan Anda mendapatkan keuntungan maksimal.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white h-fit p-5 flex justify-center flex flex-col">
                    <h1 className='text-xl md:text-3xl font-bold my-3 text-center'>Bagaimana cara memesan?</h1>
                    <ul className='flex flex-col md:flex-row gap-5 justify-center items-center m-5'>
                        <li className='bg-amber-200 p-3 rounded-lg flex flex-col justify-center gap-3'>
                            <img src="images/step1.png" alt="step1" className="w-[200px] h-[200px] object-cover" />
                            <p className='text-center font-semibold'>Memilih Produk</p>
                        </li>
                        <li className='bg-amber-200 p-3 rounded-lg flex flex-col justify-center gap-3'>
                            <img src="images/step2.png" alt="step2" className="w-[200px] h-[200px] object-cover" />
                            <p className='text-center font-semibold'>Lakukan pemesanan</p>
                        </li>
                        <li className='bg-amber-200 p-3 rounded-lg flex flex-col justify-center gap-3'>
                            <img src="images/step3.png" alt="step3" className="w-[200px] h-[200px] object-cover" />
                            <p className='text-center font-semibold'>Konfirmasi dan bayar</p>
                        </li>
                        <li className='bg-amber-200 p-3 rounded-lg flex flex-col justify-center gap-3'>
                            <img src="images/step4.png" alt="step4" className="w-[200px] h-[200px] object-cover" />
                            <p className='text-center font-semibold'>Pengiriman</p>
                        </li>
                    </ul>
                    <p className='text-center'>Pesan dan nikmati hasil panen yang segar dari petani lokal</p>
                    <button className="bg-amber-500 px-4 py-3 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-3 hover:bg-amber-400">Mulai Belanja</button>
                </div>
            </>
        );
    };

    return (
        <div>
            <Head title="Welcome" />
            {renderLayout()} {/* Call renderLayout function to display the layout based on user role */}
        </div>
    );
}
