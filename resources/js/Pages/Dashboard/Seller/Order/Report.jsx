// Import React dan Inertia
import React, { useEffect } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";
import TextInput from "@/Components/atom/TextInput";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Report = () => {
    const { orders, start_date, end_date } = usePage().props;
    console.log({ orders, start_date, end_date });

    const { data, setData, get, processing, errors } = useForm({
        start_date: start_date,
        end_date: end_date,
        total: orders
            .map((order) => order.total_amount)
            .reduce((a, b) => a + b, 0),
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(data);

        const formData = new FormData();
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);

        get(route("seller.order.report"), {
            data: formData,
            onSuccess: () => {
                route("seller.order.report");
            },
        });
    };

    const dateFormat = (tanggal) => {
        const date = new Date(tanggal);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
            date
        );

        return formattedDate;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <SellerLayout>
            <h1 className="px-4 py-2 mx-auto mt-20 text-2xl font-semibold w-fit bg-amber-300">
                Laporan Penjualan
            </h1>
            <h2 className="px-4 py-2 mx-auto mt-2 text-sm w-fit bg-amber-300">
                {dateFormat(start_date)} - {dateFormat(end_date)}
            </h2>

            <form
                action={route("seller.order.report")}
                method="get"
                onSubmit={submit}
                className="p-8 my-6 w-fit"
            >
                <div className="flex items-center gap-4">
                    <TextInput
                        id="start_date"
                        type="date"
                        name="start_date"
                        value={start_date}
                        className="block w-full mt-2"
                        autoComplete="start_date"
                        isFocused={true}
                        onChange={(e) => setData("start_date", e.target.value)}
                        required
                    />
                    <span className="font-bold ">s/d</span>
                    <TextInput
                        id="end_date"
                        type="date"
                        name="end_date"
                        value={end_date}
                        className="block w-full mt-2"
                        autoComplete="end_date"
                        isFocused={true}
                        onChange={(e) => setData("end_date", e.target.value)}
                        required
                    />

                    <PrimaryButton
                        className="h-full w-fit whitespace-nowrap"
                        disabled={processing}
                    >
                        Filter Tanggal
                    </PrimaryButton>
                </div>
            </form>

            <div className="flex justify-center w-full">
                <table className="">
                    <thead>
                        <tr className="text-sm font-bold bg-amber-400">
                            <th className="px-4 py-2 border">Tanggal</th>
                            <th className="px-4 py-2 border">Pembeli</th>
                            <th className="px-4 py-2 border">Produk</th>
                            <th className="px-4 py-2 border">Jumlah</th>
                            <th className="px-4 py-2 border">Harga Satuan</th>
                            <th className="px-4 py-2 border">Harga Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-2 border">
                                        {dateFormat(order.created_at)}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {order.user.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {order.product.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {order.quantity}{" "}
                                        {order.product.unit.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {formatCurrency(order.product.price)}
                                        ,-
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {formatCurrency(
                                            order.product.price * order.quantity
                                        )}
                                        ,-
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="border">
                                <td
                                    colSpan={6}
                                    className="px-4 py-2 text-sm italic text-center"
                                >
                                    Tidak Ada Penjualan
                                </td>
                            </tr>
                        )}
                        {orders.length > 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-2 font-bold text-center bg-gray-100 border"
                                >
                                    Total
                                </td>
                                <td className="px-4 py-2 border">
                                    {formatCurrency(data.total)}
                                    ,-
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </SellerLayout>
    );
};

export default Report;
