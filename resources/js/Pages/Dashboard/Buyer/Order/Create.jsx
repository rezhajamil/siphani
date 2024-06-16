import React, { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/atom/InputLabel";
import TextInput from "@/Components/atom/TextInput";
import Select from "@/Components/atom/Select";
import InputError from "@/Components/atom/InputError";
import PrimaryButton from "@/Components/atom/PrimaryButton";
import BuyerLayout from "@/Layouts/BuyerLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 1,
        total_amount: 0,
        proof: null,
    });

    const { product } = usePage().props;

    useEffect(() => {
        if (product) {
            setData("product_id", product.id);
            setData("total_amount", product.price); // Initialize total_amount with product price
        }
    }, [product]);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("quantity", data.quantity);
        formData.append("total_amount", data.total_amount);
        formData.append("proof", data.proof);
        formData.append("product_id", product.id);

        post(route("order.store"), {
            data: formData,
            onSuccess: () => {
                route("order.index");
            },
        });
    };

    const handleQuantityChange = (step) => {
        setData((prevData) => {
            console.log("Current quantity:", data.quantity);
            const newQuantity = Math.max(1, prevData.quantity + step); // Ensure quantity is at least 1
            console.log("Step:", step);
            console.log("New quantity:", newQuantity);
            const newTotalAmount = newQuantity * product.price;
            console.log("New total amount:", newTotalAmount); // Calculate new total amount
            return {
                ...prevData,
                quantity: newQuantity,
                total_amount: newTotalAmount,
            };
        });
    };

    if (!product) {
        return <div>Loading...</div>; // Handle the case where product is not yet loaded
    }

    return (
        <BuyerLayout>
            <Head title="Create Order" />
            <div className="h-fit w-[300px] md:w-1/3 p-5 mx-auto rounded-lg border-2 border-dashed border-amber-300 shadow-md flex flex-col justify-start mt-20">
                <h1 className="mb-2 text-sm font-medium text-left text-black w-fit">
                    Checkout Pesanan
                </h1>
                <div className="flex flex-row gap-4">
                    <img
                        src={product.images[0]?.url || "/images/empty.png"}
                        alt={product.name || "Unknown"}
                        className="w-[250px] h-[150px] object-cover"
                    />
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-md">{product.name}</p>
                        <p className="text-sm font-medium">
                            {product.category.name}
                        </p>
                        {product.tags && product.tags.length > 0 ? (
                            <p className="p-1 text-sm font-medium text-black rounded-lg bg-amber-400">
                                {product.tags.map((tag) => tag.name).join(", ")}
                            </p>
                        ) : (
                            <p className="p-1 text-sm font-medium bg-transparent rounded-lg"></p>
                        )}
                    </div>
                </div>
                <form
                    onSubmit={submit}
                    className="flex flex-col items-center w-full mt-2"
                >
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold">
                                {product.price}/{product.unit}
                            </p>
                            <p className="text-black text-normal">
                                Stok: {product.stock}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-0">
                                <button
                                    type="button"
                                    className="px-2 bg-white border border-black rounded-l-md"
                                    onClick={() => handleQuantityChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="w-16 h-8 text-center text-black border-t border-b border-black"
                                    value={data.quantity}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="px-2 bg-white border border-black rounded-r-md"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-sm font-semibold">
                                Total: Rp.{data.total_amount}
                            </p>
                        </div>
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="w-full mt-2"
                        disabled={processing}
                    >
                        Beli
                    </PrimaryButton>
                </form>
            </div>
        </BuyerLayout>
    );
}
