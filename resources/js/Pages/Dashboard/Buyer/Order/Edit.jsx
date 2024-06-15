import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/atom/InputLabel';
import TextInput from '@/Components/atom/TextInput';
import Select from '@/Components/atom/Select';
import InputError from '@/Components/atom/InputError';
import PrimaryButton from '@/Components/atom/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import BuyerLayout from '@/Layouts/BuyerLayout';

const categoryOptions = [
    { value: 1, label: "Padi" },
    { value: 2, label: "Jagung" },
    { value: 3, label: "Cabai" }
];

const unitOptions = [
    { value: 1, label: "Piece" },
    { value: 2, label: "Kg" },
    { value: 3, label: "Ton" },
    { value: 4, label: "Box" }
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        quantity: '',
        total_amount: '',
        bukti_pembayaran: null,
    });

    const { props } = usePage(); // Use usePage to access shared props
    const product_id = props.product_id; // Assuming 'product_id' is passed from the controller

    React.useEffect(() => {
        setData('product_id', product_id); // Set product_id in form data
    }, [product_id]);

    const submit = (e) => {
        e.preventDefault();

        console.log(data);

        const formData = new FormData();
        formData.append('quantity', data.quantity);
        formData.append('total_amount', data.total_amount);// Append product_id

        post(route('order.store'), {
            data: formData,
            onSuccess: () => {
                route('order.index');
            },
        });
    };


    const handleFileChange = (e) => {
        setData('proof', e.target.files[0]);
    };

    return (
        <BuyerLayout>
            <Head title="Create Order" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center my-10 pt-10 bg-white">
                <h1 className="text-center bg-amber-300 text-xl md:text-2xl font-semibold mb-6 w-fit mx-auto">Silahkan Isi Form Orderan Anda</h1>
                <ul>
                    
                </ul>
                <form onSubmit={submit} className="flex flex-col items-center w-full">
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="quantity" value="Jumlah" />
                        <TextInput
                            id="quantity"
                            name="quatity"
                            type="number"
                            value={data.quantity}
                            className="mt-2 block w-full"
                            autoComplete="quantity"
                            isFocused={true}
                            onChange={(e) => setData('quantity', e.target.value)}
                            required
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="total_amount" value="total_amount" />
                        <TextInput
                            id="total_amount"
                            name="total_amount"
                            type="number"
                            value={data.quantity}
                            className="mt-2 block w-full"
                            autoComplete="total_amount"
                            isFocused={true}
                            onChange={(e) => setData('total_amount', e.target.value)}
                            required
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="md:w-1/4 mt-4">
                    <InputLabel htmlFor="proof" value="Bukti Pembayaran" />

                    <TextInput
                        id="avatar"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="mt-1 block w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                        autoComplete="proof"
                        onChange={handleFileChange}
                    />

                    <InputError message={errors.proof} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4 text-center">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Beli
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </BuyerLayout>
    );
}
