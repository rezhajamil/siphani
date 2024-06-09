import React from 'react';
import { Head, useForm} from '@inertiajs/react';
import SellerLayout from '@/Layouts/SellerLayout';
import InputLabel from '@/Components/atom/InputLabel';
import TextInput from '@/Components/atom/TextInput';
import Select from '@/Components/atom/Select';
import InputError from '@/Components/atom/InputError';
import PrimaryButton from '@/Components/atom/PrimaryButton';


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
        name: '',
        category: '',
        unit: '',
        description: '',
        price: '',
        stock: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();


        console.log(data);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('unit', data.unit);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('image', data.image);

        post(route('seller.product.store'), {
            data: formData,
            onSuccess: () => {
                route('dashboard.seller.product.index');
            },
        });
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    return (
        <SellerLayout>
            <Head title="Create Product" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center my-10  pt-10 bg-white">
                <h1 className="text-center bg-amber-300 text-xl md:text-2xl font-semibold mb-6 w-fit mx-auto">Tambah Produk di Toko Anda</h1>
                <form onSubmit={submit} className="flex flex-col items-center w-full" >
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="name" value="Nama Produk" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="category" value="Kategori" />
                        <Select
                            id="category"
                            name="category"
                            value={data.category}
                            className="mt-2 block w-full"
                            options={categoryOptions}
                            placeholder="Pilih Kategori Produk"
                            onChange={(e) => setData('category', e.target.value)}
                            required
                        />
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="unit" value="Unit" />
                        <Select
                            id="unit"
                            name="unit"
                            value={data.unit}
                            className="mt-2 block w-full"
                            options={unitOptions}
                            placeholder="Pilih Jenis Unit"
                            onChange={(e) => setData('unit', e.target.value)}
                            required
                        />
                        <InputError message={errors.unit} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-2 block w-full"
                            autoComplete="description"
                            isFocused={true}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="price" value="Harga" />
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            value={data.price}
                            className="mt-2 block w-full"
                            autoComplete="price"
                            isFocused={true}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="stock" value="Stok Produk" />
                        <TextInput
                            id="stock"
                            name="stock"
                            type="number"
                            value={data.stock}
                            className="mt-2 block w-full"
                            autoComplete="stock"
                            isFocused={true}
                            onChange={(e) => setData('stock', e.target.value)}
                            required
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>

                    <div className='w-1/2 md:w-1/4 mt-4'>
                        <InputLabel htmlFor="image" value="Gambar Produk" />
                        <TextInput
                            id="image"
                            type="file"
                            name="image"
                            accept="image/*"
                            className="mt-1 block w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                            autoComplete="image"
                            onChange={handleFileChange}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4 text-center">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Buat
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </SellerLayout>
    );
}
