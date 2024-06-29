import React from "react";
import { Head, usePage } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";

export default function Product() {
    const { products, tags, units } = usePage().props;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <SellerLayout>
            <Head title="Daftar Produk" />
            <div className="flex flex-col items-center min-h-screen my-10 bg-white sm:justify-center sm:pt-0">
                <div className="flex flex-col mt-20 md:mt-0">
                    <h1 className="mx-auto mb-6 text-2xl font-semibold text-center bg-amber-300 md:text-4xl w-fit">
                        Daftar Produk Anda
                    </h1>
                    <p className="text-sm font-medium text-center md:text-md">
                        Tambah Produk Anda dengan mudah.
                    </p>
                    <a
                        href="product/create"
                        className="px-4 py-2 mx-auto mt-5 text-base font-medium text-center text-white rounded-lg cursor-pointer bg-amber-500 w-fit hover:bg-amber-400"
                    >
                        Tambah
                    </a>
                </div>
                <ul className="flex flex-col flex-wrap items-center justify-center gap-5 m-10 overflow-hidden md:flex-row">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-between shadow-xl w-[250px] h-[300px] overflow-hidden"
                        >
                            {/* Render product details */}
                            <img
                                src={
                                    product.images[0]?.image_url
                                        ? "/storage/" + product.images[0]?.image_url
                                        : "/images/empty.png"
                                }
                                alt={product.name}
                                className="w-full h-[120px] object-cover"
                            />
                            <div className="flex flex-row justify-between my-2">
                                <p className="font-semibold">{product.name}</p>
                                <p className="font-medium text-amber-500">
                                    {product.category ? product.category.name : "Tidak Berkategori"}
                                </p>
                            </div>
                            <div className="flex flex-row gap-1">    
                                {product.tags.map((tag) => (
                                        <span
                                            key={tag.tag.id}
                                            className="p-1 text-sm font-medium text-black rounded-lg bg-amber-400"
                                        >
                                            {tag.tag.name}
                                        </span>
                                    ))}
                            </div>
                            <p className="font-medium text-gray-600">
                                Unit : {product.unit ? product.unit.name : "Tidak ada unit"}
                            </p>
                            <p className="mb-1 font-medium text-gray-500">
                                Stok: {product.stock}
                            </p>
                            <p className="font-bold text-lime-600">
                                {formatCurrency(product.price)}
                            </p>
                            <a
                                href={`product/edit/${product.id}`}
                                className="px-4 py-2 my-3 text-base font-medium text-center text-white rounded-lg bg-amber-500 w-fit hover:bg-amber-400"
                            >
                                Edit
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </SellerLayout>
    );
}
