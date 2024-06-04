import { forwardRef, useEffect, useRef } from 'react';
import TextInput from '../atom/TextInput';
import InputError from '../atom/InputError';

export default forwardRef(function FormProduct({ data={}, setData = () => {}, className = '', ...props }, ref) {   
    const data = {
        name: '',
        shop: '',
        category: '',
        unit : '',
        description: '',
        price: '',
        stock: '',
        image: '',
    }
    return (
        <>
        <div>
            <InputLabel htmlFor="name" value="Nama" />
            <TextInput
                        id="name"
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

        <div>
            <InputLabel htmlFor="shop" value="Shop" />
            <TextInput
                        id="shop"
                        name="shop"
                        value={data.shop}
                        className="mt-2 block w-full"
                        autoComplete="shop"
                        isFocused={true}
                        onChange={(e) => setData('shop', e.target.value)}
                        required
            />
            <InputError message={errors.shop} className="mt-2" />
        </div>

        <div>
            <InputLabel htmlFor="category" value="Kategori" />
            <Select
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-1 block w-full"
                        options={[
                            "Padi",
                            "Jagung",
                            "Cabai"
                          ]}
                        placeholder = "Pilih Kategori"
                        autoComplete="category"
                        onChange={(e) => setData('category', e.target.value)}
                        required
                    />
            <InputError message={errors.category} className="mt-2" />
        </div>
        <div>
            <InputLabel htmlFor="unit" value="Unit" />
            <Select
                        id="unit"
                        name="unit"
                        value={data.unit}
                        className="mt-1 block w-full"
                        options={[
                            "Piece",
                            "Kg",
                            "Ton",
                            "Box"
                          ]}
                        placeholder = "Pilih Unit Produk"
                        autoComplete="unit"
                        onChange={(e) => setData('unit', e.target.value)}
                        required
                    />
            <InputError message={errors.unit} className="mt-2" />
        </div>

        <div>
            <InputLabel htmlFor="description" value="Deskripsi Produk" />
            <TextInput
                        id="description"
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

        <div>
            <InputLabel htmlFor="price" value="Harga" />
            <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className="mt-2 block w-full"
                        autoComplete="price"
                        isFocused={true}
                        onChange={(e) => setData('price', e.target.value)}
                        required
            />
            <InputError message={errors.price} className="mt-2" />
        </div>

        <div>
            <InputLabel htmlFor="stock" value="Stok Produk" />
            <TextInput
                        id="stock"
                        type="number"
                        name="stock"
                        value={data.stock}
                        className="mt-2 block w-full"
                        autoComplete="stock"
                        isFocused={true}
                        onChange={(e) => setData('stock', e.target.value)}
                        required
            />
            <InputError message={errors.stock} className="mt-2" />
        </div>

        <div className="">
            <InputLabel htmlFor="image" value="Gambar Produk" />

            <TextInput
                        id="image"
                        type="file"
                        name="image"
                        value={data.image}
                        className="mt-1 block w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                        autoComplete="image"
                        onChange={(e) => setData('image', e.target.value)}
            />

            <InputError message={errors.image} className="mt-2" />
        </div>
        </>
    );
});
