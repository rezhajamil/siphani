import React, { useEffect } from "react";
import { usePage, useForm, Link} from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Index = () => {
    const { orders } = usePage().props;
    console.log("orders", orders);
    const { data, setData, post, processing, errors } = useForm({
        message: "",
        activeOrderId: orders.length > 0 ? orders[0].id : null,
    });

    // Memastikan activeOrderId terupdate saat orders berubah
    useEffect(() => {
        if (orders.length > 0 && !data.activeOrderId) {
            setData("activeOrderId", orders[0].id);
        }
    }, [orders]);

    // Mengirim data diskusi

    return (
        <BuyerLayout>
            {orders.map((order) => (
                <Link
                    key={order.id}
                    href={route("order.show", { order: order.id })}
                    className="flex flex-col justify-start p-3 mx-auto mt-20 border-2 border-dashed rounded-lg shadow-md h-fit w-fit border-amber-300"
                >
                    <p className="text-xs font-medium text-amber-500">
                        Orderan Anda
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

            {/* <div className="flex flex-row items-center justify-center gap-2 mt-20">
                <textarea
                    className="w-[250px] md:w-1/4 p-2 focus:border-amber-400 focus:ring-amber-300  border-2 border-amber-300 rounded-lg"
                    placeholder="Chat Penjual"
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                />
                <PrimaryButton disabled={processing} onClick={submit}>
                    Kirim
                </PrimaryButton>
            </div> */}
        </BuyerLayout>
    );
};

export default Index;
