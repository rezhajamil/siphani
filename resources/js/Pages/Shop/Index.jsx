import React from "react";
import { Link } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Index = ({ shop }) => {
    return (
        <SellerLayout>
            <div className="flex flex-col items-center h-screen my-10 bg-white sm:justify-center sm:pt-0">
                <h1 className="mx-auto mb-6 text-xl font-semibold text-center bg-amber-300 md:text-2xl w-fit">
                    Profile Toko Anda
                </h1>
                {shop && (
                    <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
                        {/* Avatar dan Nama Toko */}
                        <div className="flex items-center p-6">
                            <img
                                src={"/storage/" + shop.avatar}
                                alt={shop.name}
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {shop.name}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {shop.description}
                                </p>
                            </div>
                        </div>
                        {/* Informasi Toko */}
                        <div className="px-6 py-4">
                            <div className="mb-2">
                                <span className="font-semibold">Alamat:</span>{" "}
                                {shop.address}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Telepon:</span>{" "}
                                {shop.phone}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Email:</span>{" "}
                                {shop.email}
                            </div>
                        </div>
                        {/* Tombol Edit */}
                        <div className="flex justify-end px-6 py-4">
                            <Link href={route("seller.shop.edit", shop.id)}>
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
