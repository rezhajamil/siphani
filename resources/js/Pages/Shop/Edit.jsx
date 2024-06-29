import React from 'react';
import SellerLayout from "@/Layouts/SellerLayout";
import InputLabel from "@/Components/atom/InputLabel";
import TextInput from "@/Components/atom/TextInput";
import InputError from "@/Components/atom/InputError";
import PrimaryButton from "@/Components/atom/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ shop }) {
    const { data, setData, put, processing, errors } = useForm({
        name: shop.name || '',
        phone: shop.phone || '',
        email: shop.email || '',
        address: shop.address || '',
        maps: shop.maps || '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT'); // Metode PUT untuk update
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('maps', data.maps);
        if (data.avatar) {
            formData.append('avatar', data.avatar); // Tambahkan avatar ke FormData jika ada
        }

        put(route('seller.shop.update', shop.id), {
            data: formData,
            onSuccess: () => {
                route('seller.shop.index');
            },
        });
    };

    const handleFileChange = (e) => {
        setData('avatar', e.target.files[0]);
    };

    return (
        <SellerLayout>
            <Head title="Edit Shop" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center my-10 sm:pt-0 bg-white">
                <h1 className="text-center bg-amber-300 text-xl md:text-2xl font-semibold mb-6 w-fit mx-auto">Edit Profile Toko Anda</h1>
                <form onSubmit={submit} className="flex flex-col items-center w-full">
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="name" value="Nama Toko" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="phone" value="No HP" />

                        <TextInput
                            id="phone"
                            name="phone"
                            type="tel"
                            value={data.phone}
                            className="mt-2 block w-full"
                            autoComplete="phone"
                            isFocused={true}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="address" value="Alamat" />

                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-2 block w-full"
                            autoComplete="address"
                            isFocused={true}
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="maps" value="Maps" />

                        <TextInput
                            id="maps"
                            name="maps"
                            value={data.maps}
                            className="mt-2 block w-full"
                            autoComplete="maps"
                            isFocused={true}
                            onChange={(e) => setData('maps', e.target.value)}
                        />

                        <InputError message={errors.maps} className="mt-2" />
                    </div>
                    <div className='w-1/2 md:w-1/4 mt-4'>
                        <InputLabel htmlFor="avatar" value="Foto Toko" />

                        <TextInput
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            className="mt-1 block w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                            autoComplete="avatar"
                            onChange={handleFileChange}
                        />
                        <InputError message={errors.avatar} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-center mt-4 text-center">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Update
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </SellerLayout>
    );
}
