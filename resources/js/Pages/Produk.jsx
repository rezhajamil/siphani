import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Template from "@/Layouts/Template";
import BuyerLayout from "@/Layouts/BuyerLayout";
import SellerLayout from "@/Layouts/SellerLayout";
import TextInput from "@/Components/atom/TextInput";
import Select from "@/Components/atom/Select";
import PrimaryButton from "@/Components/atom/PrimaryButton";

export default function Produk({
    products = [],
    categories = [],
    units = [],
    tags = [],
}) {
    const { user } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = () => {
        const filtered = products.filter((p) => {
            const productNameMatch = p.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const categoryMatch =
                selectedCategory === "" ||
                (p.category_id &&
                    p.category_id.toString() === selectedCategory);
            return productNameMatch && categoryMatch;
        });
        setFilteredProducts(filtered);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const renderLayout = () => {
        if (user && user.role === "Buyer") {
            return <BuyerLayout>{renderContent()}</BuyerLayout>;
        } else if (user && user.role === "Seller") {
            return <SellerLayout>{renderContent()}</SellerLayout>;
        } else {
            return <Template>{renderContent()}</Template>;
        }
    };

    const renderContent = () => (
        <div className="flex flex-col items-center justify-center w-full min-h-screen px-16 bg-white py-25 md:py-20">
            <div className="flex flex-col mt-20 md:mt-0">
                <h1 className="mx-auto mb-6 text-2xl font-semibold text-center bg-amber-300 md:text-4xl w-fit">
                    Beragam Pilihan Produk
                </h1>
                <p className="text-sm font-medium text-center md:text-md">
                    Kami menawarkan beragam produk hasil pertanian mulai dari
                    beras, buah-buahan, sayuran.
                </p>
                <p className="text-sm font-medium text-center md:text-md">
                    Dengan berbagai pilihan yang tersedia, Anda dapat dengan
                    mudah menemukan produk yang sesuai dengan kebutuhan dan
                    preferensi Anda.
                </p>
                <ul className="flex flex-col items-center justify-center gap-5 m-10 md:flex-row">
                    <li className="flex flex-col justify-center gap-3 p-2 border-2 border-dashed rounded-lg shadow-xl border-amber-300">
                        <img
                            src="/images/beras.jpg"
                            alt="step1"
                            className="w-[200px] h-[200px] object-cover"
                        />
                        <p className="font-semibold text-center">Beras</p>
                    </li>
                    <li className="flex flex-col justify-center gap-3 p-2 border-2 border-dashed rounded-lg shadow-xl border-amber-300">
                        <img
                            src="/images/jagung.jpg"
                            alt="step2"
                            className="w-[200px] h-[200px] object-cover"
                        />
                        <p className="font-semibold text-center">Jagung</p>
                    </li>
                    <li className="flex flex-col justify-center gap-3 p-2 border-2 border-dashed rounded-lg shadow-xl border-amber-300">
                        <img
                            src="/images/sayur.jpg"
                            alt="step3"
                            className="w-[200px] h-[200px] object-cover"
                        />
                        <p className="font-semibold text-center">Sayuran</p>
                    </li>
                </ul>
            </div>
            {/* Pencarian produk */}
            <div className="flex flex-row justify-center w-1/3 gap-3 mt-5 md:w-1/2">
                <TextInput
                    type="text"
                    className="w-full p-2 border-2 rounded-lg border-amber-300"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                    className="ml-2"
                    placeholder="Pilih kategori"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    options={[
                        { value: "", label: "Semua Kategori" },
                        ...categories.map((cat) => ({
                            value: cat.id.toString(),
                            label: cat.name,
                        })),
                    ]}
                />
                <PrimaryButton
                    onClick={handleSearch}
                    className="px-4 py-2 ml-2 text-base font-medium text-center text-white rounded-lg bg-amber-500 hover:bg-amber-400"
                >
                    Cari
                </PrimaryButton>
            </div>
            <ul className="flex flex-col flex-wrap items-center justify-center gap-5 m-10 overflow-hidden md:flex-row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <li
                            key={product.id || index}
                            className="border-2 border-dashed border-amber-300 rounded-lg flex flex-col overflow-hidden justify-start gap-3 shadow-xl p-3 w-[310px] h-[500px]"
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
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm font-medium text-amber-500">
                                    {product.category_id
                                        ? categories.find(
                                              (cat) =>
                                                  parseInt(cat.id) ===
                                                  parseInt(product.category_id)
                                          )?.name
                                        : "Tidak Berkategori"}
                                </p>
                            </div>
                            <Link
                                href={route("shop.show", product.shop.id)}
                                className="-mt-4 text-sm font-light text-gray-500 hover:underline"
                            >
                                {product.shop.name}
                            </Link>
                            <div className="flex flex-row gap-1 min-h-[28px]">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag.tag.id}
                                        className="p-1 text-sm font-medium text-black rounded-lg bg-amber-400"
                                    >
                                        {tag.tag.name}
                                    </span>
                                ))}
                            </div>
                            <p className="h-full text-sm font-normal">
                                {product.description?.slice(0, 130)}
                                {product.description?.length > 130 ? "..." : ""}
                                {product.description?.length < 1 ? (
                                    <span className="italic font-light">
                                        Tidak ada deskripsi produk
                                    </span>
                                ) : (
                                    ""
                                )}
                            </p>
                            <div className="flex flex-col gap-2 mt-auto">
                                <p className="mt-auto text-xs font-medium text-gray-500">
                                    Stok: {product.stock}
                                </p>
                                <p className="mt-auto font-semibold text-md text-lime-600">
                                    {formatCurrency(product.price)} /{" "}
                                    {product.unit.name}
                                </p>
                                <Link
                                    href={`/order/${product.id}/create`}
                                    className={`justify-end px-4 py-2 text-base justify-items-end mt-auto rounded-lg font-medium text-center w-fit ${
                                        product.stock > 0
                                            ? "text-white bg-amber-500 hover:bg-amber-400"
                                            : "text-gray-400 bg-gray-200 cursor-not-allowed"
                                    }`}
                                    disabled={product.stock === 0}
                                >
                                    Beli
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="font-medium text-center text-md">
                        Produk tidak ditemukan
                    </p>
                )}
            </ul>
        </div>
    );

    return (
        <div>
            <Head title="Produk" />
            {renderLayout()}{" "}
            {/* Panggil fungsi renderLayout untuk menampilkan layout sesuai peran pengguna */}
        </div>
    );
}
