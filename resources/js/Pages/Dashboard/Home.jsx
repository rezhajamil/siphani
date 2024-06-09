import { useEffect } from 'react';
import BuyerLayout from '@/Layouts/BuyerLayout'; 
import SellerLayout from '@/Layouts/SellerLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props;

    useEffect(() => {

    }, []);


    const renderLayout = () => {
        if (user.role === 'Buyer') {
            return (
                <BuyerLayout>
                    <div className='w-full bg-white min-h-screen py-15 md:py-10 px-16 flex justify-center items-center flex flex-col'>
                        <div className='flex flex-col mt-20 md:mt-0'>
                            <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Cari Produk Apa?</h1>
                        </div>
                        <div>
                            <h1>Halo, {user.name}!</h1>
                        </div>    
                    </div>
                </BuyerLayout>
            );
        } else if (user.role === 'Admin') {
            return (
                <Guest>
                    
                </Guest>
            );
        } else {
            return (
                <SellerLayout>
                    <div className='w-full bg-white min-h-screen py-15 md:py-10 px-16 flex justify-center items-center flex flex-col bg-red-200'>
                        <div className='flex flex-col mt-20 md:mt-0'>
                            <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Cari Produk Apa?</h1>
                        </div>
                        <div>
                            <h1>Halo, {user.name}!</h1>
                        </div>    
                    </div>
                </SellerLayout>
            );
        }
    };

    return (
        <div>
            <Head title="Dashboard" />
            {renderLayout()} {/* Panggil fungsi renderLayout untuk menampilkan layout sesuai peran pengguna */}
        </div>
    );
}
