import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import SellerLayout from "@/Layouts/SellerLayout";

export default function Product() {
    const { products } = usePage().props;

    return (
        <SellerLayout>
            <Head title="Daftar Produk" />
            <div className='min-h-screen flex flex-col sm:justify-center items-center my-10 sm:pt-0 bg-white'>
                <div className='flex flex-col mt-20 md:mt-0'>
                    <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Daftar Produk Anda</h1>
                    <p className='text-center font-medium text-sm md:text-md'>Tambah Produk Anda dengan mudah.</p>
                    <a href="product/create" className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-5 hover:bg-amber-400 cursor-pointer">Tambah</a>
                </div>
                <ul className='flex flex-col md:flex-row flex-wrap gap-5 justify-center items-center m-10 overflow-hidden'>
                    {products.map(product => (
                        <li key={product.id} className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-center shadow-xl w-[250px] h-[300px] overflow-hidden'>
                            <img src={product.image_url || "/images/empty.jpg"} alt={product.name} className="w-[250px] h-[120px] object-cover" />
                            <div className="flex flex-col justify-between my-2">
                                <p className='font-semibold'>{product.name}</p>
                                <p className="font-medium text-amber-500">{product.tags.map(tag => tag.name).join(', ')}</p>
                                <p className="font-medium text-amber-500">{product.category?.name}</p>
                            </div>
                            <p className="font-medium text-gray-500 mb-1">{product.stock} {product.unit}</p>
                            <p className="font-bold text-lime-600">Rp. {product.price}</p>
                            <Link href={`dashboard/seller/product/edit/${product.id}`} className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </SellerLayout>
    );
}
