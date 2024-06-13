import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import SellerLayout from '@/Layouts/SellerLayout';
import InputLabel from '@/Components/atom/InputLabel';
import TextInput from '@/Components/atom/TextInput';
import Select from '@/Components/atom/Select';
import InputError from '@/Components/atom/InputError';
import PrimaryButton from '@/Components/atom/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Edit({ categories, units, tags, product, id }) {
    // Inisialisasi data form hanya jika product didefinisikan
    const initialData = product ? {
        name: product.name || '',
        category: product.category ? product.category.id : '', // Default ke string kosong jika tidak ada category
        unit: product.unit ? product.unit.id : '', // Default ke string kosong jika tidak ada unit
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        image: null,
        tag: product.tags ? product.tags.map(tag => tag.id) : [], // Default ke array kosong jika tidak ada tags
    } : {
        name: '',
        category: '',
        unit: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        tag: [],
    };

    const { data, setData, post, processing, errors } = useForm(initialData);

    useEffect(() => {
        if (product) {
            // Update tag checkboxes based on product.tags
            const initialTags = product.tags.map(tag => tag.id.toString());
            setData('tag', initialTags);
        }
    }, [product]);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id); // Append product ID to formData
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('unit', data.unit);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('tag', JSON.stringify(data.tag));

        post(route('seller.product.edit'), {
            data: formData,
            onSuccess: () => {
                route('seller.product.index');
            },
        });
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const tags = data.tag;
        if (checked) {
            setData('tag', [...tags, value]);
        } else {
            setData('tag', tags.filter(tag => tag !== value));
        }
    };

    return (
        <SellerLayout>
            <Head title="Edit Product" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center my-10 pt-10 bg-white">
                <h1 className="text-center bg-amber-300 text-xl md:text-2xl font-semibold mb-6 w-fit mx-auto">Edit Product</h1>
                <form onSubmit={submit} className="flex flex-col items-center w-full">
                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="name" value="Product Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className='w-[220px] md:w-1/4 mt-4'>
                        <InputLabel htmlFor="category" value="Category" />
                        <Select
                            id="category"
                            name="category"
                            value={data.category}
                            className="mt-2 block w-full"
                            options={categories.map(category => ({
                                value: category.id,
                                label: category.name
                            }))}
                            placeholder="Select Product Category"
                            onChange={(e) => setData('category', e.target.value)}
                            required
                        />
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className='w-[220px] md:w-1/4 mt-4'>
                        <InputLabel htmlFor="unit" value="Unit" />
                        <Select
                            id="unit"
                            name="unit"
                            value={data.unit}
                            className="mt-2 block w-full"
                            options={units.map(unit => ({
                                value: unit.id,
                                label: unit.name
                            }))}
                            placeholder="Select Unit Type"
                            onChange={(e) => setData('unit', e.target.value)}
                            required
                        />
                        <InputError message={errors.unit} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-2 block w-full"
                            autoComplete="description"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="price" value="Price" />
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            value={data.price}
                            className="mt-2 block w-full"
                            autoComplete="price"
                            onChange={(e) => setData('price', e.target.value)}
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className='md:w-1/4 mt-4'>
                        <InputLabel htmlFor="stock" value="Stock" />
                        <TextInput
                            id="stock"
                            name="stock"
                            type="number"
                            value={data.stock}
                            className="mt-2 block w-full"
                            autoComplete="stock"
                            onChange={(e) => setData('stock', e.target.value)}
                            required
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>

                    <div className='w-[220px] md:w-1/4 mt-4'>
                        <InputLabel htmlFor="image" value="Product Image"/>
                        <TextInput
                            id="image"
                            type="file"
                            name="image"
                            accept="image/*"
                            className="mt-1 w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                            onChange={handleFileChange}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className='justify-start w-1/2 md:w-1/4 mt-4'>
                        <InputLabel value="Product Tags" />
                        {tags.map(tag => (
                            <div className="flex items-center mt-2" key={tag.id}>
                                <Checkbox
                                    id={`tag${tag.id}`}
                                    name="tag"
                                    value={tag.id.toString()}
                                    className="mr-2"
                                    checked={data.tag.includes(tag.id.toString())}
                                    onChange={handleCheckboxChange}
                                />
                                <InputLabel htmlFor={`tag${tag.id}`} value={tag.name} />
                            </div>
                        ))}
                        <InputError message={errors.tag} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-center mt-4 text-center">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Update
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </SellerLayout>
    );
}
