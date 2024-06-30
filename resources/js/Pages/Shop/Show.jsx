import React from "react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/atom/PrimaryButton";
import BuyerLayout from "@/Layouts/BuyerLayout";

const Index = ({ shop }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    return (
        <BuyerLayout>
            <div className="flex flex-col items-center min-h-screen my-20 bg-white sm:justify-center sm:pt-0">
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
                    </div>
                )}

                <h1 className="mx-auto mt-12 mb-6 text-xl font-semibold text-center bg-amber-300 md:text-2xl w-fit">
                    Daftar Produk
                </h1>
                <ul className="flex flex-col flex-wrap items-center justify-center gap-5 overflow-hidden md:flex-row">
                    {shop.products.length > 0 ? (
                        shop.products.map((product, index) => (
                            <li
                                key={product.id || index}
                                className="border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col overflow-hidden justify-start gap-3 shadow-xl shadow-xl p-3 w-[310px] h-[450px]"
                            >
                                <img
                                    src={
                                        product.images[0]?.image_url
                                            ? "/storage/" +
                                              product.images[0]?.image_url
                                            : "/images/empty.png"
                                    }
                                    alt={product.name || "Unknown"}
                                    className="w-[310px] h-[200px] object-cover"
                                />
                                <div className="flex flex-row justify-between my-1">
                                    <p className="font-semibold">
                                        {product.name}
                                    </p>
                                    <p className="text-sm font-medium text-amber-500">
                                        {product.category.name}
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
                                <p className="text-sm font-normal">
                                    {product.description?.slice(0, 50)}
                                </p>
                                <p className="font-semibold text-md text-lime-600">
                                    {formatCurrency(product.price)} /{" "}
                                    {product.unit.name}
                                </p>
                                <Link
                                    href={`/order/${product.id}/create`}
                                    className="justify-end px-4 py-2 mt-auto text-base font-medium text-center text-white rounded-lg bg-amber-500 w-fit hover:bg-amber-400"
                                >
                                    Beli
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="font-medium text-center text-md">
                            Produk tidak ditemukan
                        </p>
                    )}
                </ul>
            </div>
        </BuyerLayout>
    );
};

export default Index;
