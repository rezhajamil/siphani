import React from 'react';
import { Link } from '@inertiajs/react';
import SellerLayout from '@/Layouts/SellerLayout';
import PrimaryButton from '@/Components/atom/PrimaryButton';

const Index = ({ shop }) => {
    return (
        <SellerLayout>
            <div className="h-screen flex flex-col sm:justify-center items-center my-10 sm:pt-0 bg-white">
                <h1 className="text-center bg-amber-300 text-xl md:text-2xl font-semibold mb-6 w-fit mx-auto">Profile Toko Anda</h1>
                {shop && (
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Avatar dan Nama Toko */}
                        <div className="flex items-center p-6">
                            <img src={shop.avatar_url} alt={shop.name} className="h-16 w-16 rounded-full" />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-800">{shop.name}</h2>
                                <p className="text-sm text-gray-600">{shop.description}</p>
                            </div>
                        </div>
                        {/* Informasi Toko */}
                        <div className="px-6 py-4">
                            <div className="mb-2">
                                <span className="font-semibold">Alamat:</span> {shop.address}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Telepon:</span> {shop.phone}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Email:</span> {shop.email}
                            </div>
                        </div>
                        {/* Tombol Edit */}
                        <div className="px-6 py-4 flex justify-end">
                            <Link href={route('seller.shop.edit', shop.id)}>
                                <PrimaryButton>Edit</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </SellerLayout>
    );
};

export default Index;
