import React, { useEffect } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import TextInput from "@/Components/atom/TextInput";
import InputError from "@/Components/atom/InputError";
import InputLabel from "@/Components/atom/InputLabel";
import BuyerLayout from "@/Layouts/BuyerLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Detail = () => {
    const { order } = usePage().props;

    useEffect(() => {
        if (order) {
            console.log("Order ID:", order.id);
        }
    }, [order]);

    const { data, setData, post, put, processing, errors } = useForm({
        message: "",
        order_id: order ? order.id : null,
        proof: "",
    });

    useEffect(() => {
        console.log({ proof: data.proof });
    }, [data]);

    if (!order) {
        return <p>Pesanan tidak ditemukan.</p>;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (createdAt) => {
        const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const formattedTime = new Date(createdAt).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${formattedDate} ${formattedTime}`;
    };

    const submit = (e) => {
        e.preventDefault();

        if (!data.order_id) {
            console.error("Order ID is required.");
            return;
        }

        const formData = new FormData();
        formData.append("message", data.message);
        formData.append("order_id", data.order_id); // Pastikan order_id dimasukkan ke FormData

        post(route("order-discussion.store"), {
            data: formData,
            onSuccess: (response) => {
                setData("message", "");
                console.log("Message sent successfully", response);
            },
            onError: (errors) => {
                console.error("Error sending message:", errors);
            },
        });
    };

    const submitProof = (e) => {
        e.preventDefault();

        if (!data.proof || !order.id) {
            console.error("Proof and order ID are required.");
            return;
        }

        const formProof = new FormData();
        formProof.append("proof", data.proof); // Append the actual file object here
        formProof.append("name", "aa"); // Append the actual file object here
        console.log({ formProof: formProof.get("proof") });
        post(route("order.uploadProof", order.id), {
            data: formProof, // Pastikan Anda mengirimkan FormData sebagai bagian dari 'data'
            onSuccess: () => {
                console.log("Proof uploaded successfully");
                route("order.show", order.id); // Reset the proof field after successful upload
            },
            onError: (errors) => {
                console.error("Error uploading proof:", errors);
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        setData("proof", file); // Set the file object directly into 'proof'
    };

    return (
        <BuyerLayout>
            <div className="flex flex-col items-center justify-center w-full min-h-screen px-16 bg-white py-15 md:py-10">
                <div className="flex flex-col justify-center w-1/2 mt-20">
                    <h1 className="mx-auto mb-6 text-lg font-semibold text-center bg-amber-300 md:text-2xl w-fit">
                        Detail Pesanan
                    </h1>
                    {order.product && (
                        <div className="flex flex-row gap-5 mt-10">
                            <img
                                src={
                                    order.product.images[0]?.image_url
                                        ? "/storage/" +
                                          order.product.images[0]?.image_url
                                        : "/images/empty.png"
                                }
                                alt={order.product.name || "Unknown"}
                                className="w-[200px] h-[120px] object-cover rounded-lg shadow-md"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-md">
                                    {order.product.name}
                                </p>
                                <p className="text-sm font-medium">
                                    Kategori: {order.product.category.name}
                                </p>
                                <p className="text-sm font-medium">
                                    Jumlah Order: {order.quantity}{" "}
                                    {order.product.unit.name}
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                    Status:
                                    <span className="p-1 mx-1 text-sm font-medium text-black rounded-lg bg-amber-400">
                                        {order.status.name}
                                    </span>
                                </p>
                                <p className="font-semibold text-md text-lime-600">
                                    Total Harga:{" "}
                                    {formatCurrency(order.total_amount)}
                                </p>
                            </div>
                        </div>
                    )}
                    {order.status.name === "Menunggu Pembayaran" && (
                        <>
                            <div
                                className={`grid gap-2 ${
                                    order.proof_of_payment_url
                                        ? "grid-cols-2"
                                        : "grid-cols-1"
                                }`}
                            >
                                <div className="w-full gap-5 mt-4">
                                    <InputLabel
                                        htmlFor="proof"
                                        value="Upload Bukti Pembayaran"
                                    />
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex flex-col w-full">
                                            <TextInput
                                                id="proof"
                                                type="file"
                                                name="proof"
                                                accept="image/*"
                                                className="mt-2 block w-full p-2.5 border focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                                                autoComplete="proof"
                                                onChange={handleFileChange}
                                            />
                                            <InputError
                                                message={errors.proof}
                                                className="mt-2"
                                            />
                                        </div>
                                        <PrimaryButton
                                            disabled={processing}
                                            onClick={submitProof}
                                            className="w-full "
                                        >
                                            Upload
                                        </PrimaryButton>
                                    </div>
                                </div>
                                {order.proof_of_payment_url && (
                                    <div className="mx-auto my-4 border border-amber-400 w-fit">
                                        <img
                                            src={
                                                "/storage/" +
                                                order.proof_of_payment_url
                                            }
                                            alt={order.proof_of_payment_url}
                                            className="object-contain h-64"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    <hr className="my-6 border" />
                    <div className="p-3 mt-10 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">
                            Diskusi Pesanan
                        </h2>
                        <ul className="mt-3">
                            {order.discuss.map((discussion) => (
                                <li
                                    key={discussion.id}
                                    className="p-3 mb-3 border rounded-lg shadow-md"
                                >
                                    <p className="text-sm font-medium">
                                        Pengirim:{" "}
                                        {discussion.user?.name ||
                                            "Unknown User"}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {formatDate(discussion.created_at)}
                                    </p>
                                    <p className="mt-2">{discussion.message}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-row items-center justify-center gap-2 mt-20">
                            <textarea
                                className="w-full p-2 border-2 rounded-lg focus:border-amber-400 focus:ring-amber-300 border-amber-300"
                                placeholder="Chat Penjual"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                            />
                            <PrimaryButton
                                disabled={processing}
                                onClick={submit}
                            >
                                Kirim
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
};

export default Detail;
