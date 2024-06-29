// Import React dan Inertia
import React, { useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import SellerLayout from "@/Layouts/SellerLayout";

const Index = () => {
    const { orders } = usePage().props;

    useEffect(() => {
        console.log("Orders data:", orders);
    }, [orders]);

    return (
        <SellerLayout>
            <h1 className="p-2 mx-auto mt-20 text-2xl font-semibold w-fit bg-amber-300">
                Daftar Pesanan
            </h1>
            {orders.map((order) => (
                <Link
                    key={order.id}
                    href={route("seller.order.show", { order: order.id })}
                    className="flex flex-col justify-start p-3 mx-auto mt-8 border-2 border-dashed rounded-lg shadow-md h-fit w-fit border-amber-300"
                >
                    <p className="text-xs font-medium text-amber-500">
                        Pesanan #{order.id}
                    </p>
                    {order.product && (
                        <div className="flex flex-row items-start justify-between gap-4 mt-2">
                            <div className="flex flex-row gap-4">
                                <img
                                    src={
                                        order.product.images[0]?.image_url
                                            ? "/storage/" +
                                              order.product.images[0]?.image_url
                                            : "/images/empty.png"
                                    }
                                    alt={order.product.name || "Unknown"}
                                    className="w-[120px] h-[80px] object-cover"
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-md">
                                        {order.product.name}
                                    </p>
                                    <p className="p-1 text-sm font-medium text-black rounded-lg bg-amber-400">
                                        {order.status.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </Link>
            ))}
        </SellerLayout>
    );
};

export default Index;
