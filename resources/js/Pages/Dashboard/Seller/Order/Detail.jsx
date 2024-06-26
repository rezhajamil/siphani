import React, { useEffect } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import Select from "@/Components/atom/Select";
import InputError from "@/Components/atom/InputError";
import InputLabel from "@/Components/atom/InputLabel";
import PrimaryButton from "@/Components/atom/PrimaryButton";
import SellerLayout from "@/Layouts/SellerLayout";

const Detail = () => {
    const { order } = usePage().props;

    useEffect(() => {
        if (order) {
            console.log("Order ID:", order);
        }
    }, [order]);

    const { data, setData, post, patch, processing, errors } = useForm({
        message: "",
        order_id: order ? order.id : null,
        proof: null,
        status: order.status_id,
    });

    if (!order) {
        return <p>Pesanan tidak ditemukan.</p>;
    }

    const handleFileChange = (e) => {
        setData("proof", e.target.files[0]);
    };

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
        formData.append("order_id", data.order_id);

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

    const statusOption = [
        { value: "1", label: "Menunggu Konfirmasi" },
        { value: "2", label: "Menunggu Pembayaran" },
        { value: "3", label: "Pembayaran Ditolak" },
        { value: "4", label: "Pesanan Diproses" },
        { value: "5", label: "Pesanan Dikirim" },
        { value: "6", label: "Pesanan Selesai" },
        { value: "7", label: "Pesanan Dibatalkan" },
    ];

    const submitStatus = (e) => {
        e.preventDefault();

        if (!data.status) {
            console.error("Status is required.");
            return;
        }

        const formData = new FormData();
        formData.append("status", data.status);

        patch(route("order-status.update", { order: order.id }), {
            data: formData,
            onSuccess: () => {
                setData("status", data.status);
                console.log("Status Updated successfully");
            },
            onError: (errors) => {
                console.error("Error updating status:", errors);
            },
        });
    };

    return (
        <SellerLayout>
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

                    <div className="flex flex-row items-center w-full gap-5 mt-10">
                        <InputLabel htmlFor="status" value="Status Orderan" />
                        <Select
                            id="status"
                            name="status"
                            value={data.status}
                            className="block w-full mt-1"
                            options={statusOption}
                            autoComplete="status"
                            onChange={(e) => setData("status", e.target.value)}
                            required
                        />
                        <InputError message={errors.status} className="mt-2" />
                        <PrimaryButton
                            disabled={processing}
                            onClick={submitStatus}
                        >
                            Update
                        </PrimaryButton>
                    </div>
                    {order.proof_of_payment_url && (
                        <div className="mx-auto my-4 border border-amber-400 w-fit">
                            <a
                                href={"/storage/" + order.proof_of_payment_url}
                                target="_blank"
                            >
                                <img
                                    src={
                                        "/storage/" + order.proof_of_payment_url
                                    }
                                    alt={order.proof_of_payment_url}
                                    className="object-contain h-64"
                                />
                            </a>
                        </div>
                    )}
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
        </SellerLayout>
    );
};

export default Detail;
