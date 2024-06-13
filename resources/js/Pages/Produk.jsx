import { useState } from 'react';
import { Head , Link} from '@inertiajs/react';
import Template from '@/Layouts/Template';
import TextInput from '@/Components/atom/TextInput';
import Select from '@/Components/atom/Select';
import PrimaryButton from '@/Components/atom/PrimaryButton';

export default function Produk({ products = [], categories = [], units = [], tags = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    
    const handleSearch = () => {
        console.log("Search Term:", searchTerm);
        console.log("Selected Category:", selectedCategory);
        
        const filtered = products.filter(p => {
            console.log("Product Name:", p.name);
            console.log("Product Category ID:", p.category_id);

            const productNameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory === '' || (p.category_id && p.category_id.toString() === selectedCategory);

            console.log ("Product Category Match: ", categoryMatch);
            return productNameMatch && categoryMatch;
        });
        setFilteredProducts(filtered);
    };
    

    return (
        <>
            <Template>
                <Head title="Produk" />
                <div className='w-full bg-white min-h-screen py-25 md:py-20 px-16 flex justify-center items-center flex flex-col'>
                    <div className='flex flex-col mt-20 md:mt-0'>
                        <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Beragam Pilihan Produk</h1>
                        <p className='text-center font-medium text-sm md:text-md'>Kami menawarkan beragam produk hasil pertanian mulai dari beras, buah-buahan, sayuran.</p>
                        <p className='text-center font-medium text-sm md:text-md'>Dengan berbagai pilihan yang tersedia, Anda dapat dengan mudah menemukan produk yang sesuai dengan kebutuhan dan preferensi Anda.</p>
                        <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-5 hover:bg-amber-400">Mulai Belanja</button>
                        <ul className='flex flex-col md:flex-row gap-5 justify-center items-center m-10'>
                            <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                                <img src="/images/beras.jpg" alt="step1" className="w-[200px] h-[200px] object-cover" />
                                <p className='text-center font-semibold'>Beras</p>
                            </li>
                            <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                                <img src="/images/jagung.jpg" alt="step2" className="w-[200px] h-[200px] object-cover" />
                                <p className='text-center font-semibold'>Jagung</p>
                            </li>
                            <li className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col justify-center gap-3 shadow-xl'>
                                <img src="/images/sayur.jpg" alt="step3" className="w-[200px] h-[200px] object-cover" />
                                <p className='text-center font-semibold'>Sayuran</p>
                            </li>
                        </ul>
                    </div>
                    {/* Pencarian produk */}
                    <div className='flex flex-row gap-3 w-1/2 justify-center mt-5'>
                        <TextInput
                            type='text'
                            className='w-full p-2 border-2 border-amber-300 rounded-lg'
                            placeholder='Cari produk...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select
                            className='ml-2'
                            placeholder='Pilih kategori'
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            options={[
                                { value: '', label: 'Semua Kategori' },
                                ...categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))
                            ]}
                        />

                        <PrimaryButton
                            onClick={handleSearch}
                            className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center ml-2 hover:bg-amber-400"
                        >
                            Cari
                        </PrimaryButton>
                    </div>
                    <ul className='flex flex-col md:flex-row flex-wrap gap-5 justify-center items-center overflow-hidden m-10'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <li key={product.id || index} className='border-2 border-dashed border-amber-300 p-2 rounded-lg flex flex-col overflow-hidden justify-start gap-3 shadow-xl shadow-xl p-3 w-[320px] h-[420px]'>
                                    <img src={product.images[0]?.url || '/images/empty.png'} alt={product.name || 'Unknown'} className="w-[320px] h-[200px] object-cover" />
                                    <div className="flex flex-row justify-between my-1">
                                        <p className='font-semibold'>{product.name}</p>
                                        <p className="font-medium text-amber-500">{product.tags.map(tag => tag.name).join(', ')}</p>
                                        <p className='font-medium text-amber-500'>{product.category_id ? categories.find(cat => parseInt(cat.id) === parseInt(product.category_id))?.name : 'Tidak Berkategori'}</p>  
                                    </div>
                                    <p className='font-semibold'>{product.description.slice(0, 50)}</p>
                                    <p className="font-bold text-lime-600">Rp. {product.price}</p>
                                    <Link href={`dashboard/product/order/${product.id}`} className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit hover:bg-amber-400">Beli</Link>
                                </li>
                            ))
                        ) : (
                            <p className='text-center font-medium text-md'>Produk tidak ditemukan</p>
                        )}
                    </ul>
                </div>
            </Template>
        </>
    );
}
