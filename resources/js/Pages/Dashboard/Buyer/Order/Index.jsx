import React, { useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';
import PrimaryButton from '@/Components/atom/PrimaryButton';

const Index = () => {
    const { orders } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        message: '',
        activeOrderId: orders.length > 0 ? orders[0].id : null,
    });

    // Memastikan activeOrderId terupdate saat orders berubah
    useEffect(() => {
        if (orders.length > 0 && !data.activeOrderId) {
            setData('activeOrderId', orders[0].id);
        }
    }, [orders]);

    // Mengirim data diskusi
    const submit = (e) => {
        e.preventDefault();
    
        if (!data.activeOrderId) {
            console.error('Order ID is required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('message', data.message);
        formData.append('order_id', data.activeOrderId); // Pastikan order_id dimasukkan ke FormData
    
        post(route('order.discussion.store'), {
            data: formData,
            onSuccess: (response) => {
                setData('message', '');
                console.log('Message sent successfully', response);
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
            },
        });
    };
    

    return (
        <BuyerLayout>
            {orders.map((order) => (
                <div key={order.id} className="h-fit w-fit p-5 mx-auto rounded-lg border-2 border-dashed border-amber-300 shadow-md flex flex-col justify-start mt-20">
                    <p className="font-medium text-xs text-amber-500">Orderan Anda</p>
                    {order.product && (
                        <div className="flex flex-row items-start justify-between gap-4 mt-2">
                            <div className="flex flex-row gap-4">
                                <img
                                    src={order.product.images[0]?.url || '/images/empty.png'}
                                    alt={order.product.name || 'Unknown'}
                                    className="w-[200px] h-[120px] object-cover"
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-md">{order.product.name}</p>
                                    <p className="font-medium text-sm">{order.product.category.name}</p>
                                    <p className="p-1 rounded-lg text-sm font-medium bg-amber-400 text-black">{order.product.status}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <PrimaryButton>
                                    <a href="#">Edit</a>
                                    {/* <a href={route('order.edit', order.id)}>Edit</a> */}
                                </PrimaryButton>
                                <button className="p-1 rounded-lg text-sm font-medium border-1 border-amber-500 text-black">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="flex flex-row items-center justify-center gap-2 mt-20">
                <textarea
                    className="w-[250px] md:w-1/4 p-2 focus:border-amber-400 focus:ring-amber-300  border-2 border-amber-300 rounded-lg"
                    placeholder="Chat Penjual"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                />
                <PrimaryButton disabled={processing} onClick={submit}>
                    Kirim
                </PrimaryButton>
            </div>
        </BuyerLayout>
    );
};

export default Index;
