import SellerLayout from "@/Layouts/SellerLayout";
export default function Product() {
    return (
        <>
        <SellerLayout>
        <div className='min-h-screen flex flex-col sm:justify-center items-center my-10 sm:pt-0 bg-white'>
                <div className='flex flex-col mt-20 md:mt-0'>
                    <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Daftar Produk Anda</h1>
                    <p className='text-center font-medium text-sm md:text-md'>Tambah Produk Anda dengan mudah.</p>
                    <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mx-auto mt-5 hover:bg-amber-400">Tambah</button>
                </div>
                    <ul className='flex flex-col md:flex-row flex-wrap gap-5 justify-center items-center m-10 overflow-hidden'>
                    <li className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-centershadow-xl w-[250px] h-[300px] overflow-hidden'>
                        <img src="storage/images/beras.jpg" alt="step1" className="w-[250px] h-[120px] object-cover" />
                        <div className="flex flex-row justify-between my-2">
                        <p className='font-semibold'>Beras</p>
                        <p className="font-medium text-amber-500">Kategori</p>
                        </div>
                        <p className="font-medium text-gray-500 mb-1">2 Ton Tersedia</p>
                        <p className="font-bold text-lime-600">Rp. 100.000</p>
                        <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</button>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-centershadow-xl w-[250px] h-[300px] overflow-hidden'>
                        <img src="storage/images/beras.jpg" alt="step1" className="w-[250px] h-[120px] object-cover" />
                        <div className="flex flex-row justify-between my-2">
                        <p className='font-semibold'>Beras</p>
                        <p className="font-medium text-amber-500">Kategori</p>
                        </div>
                        <p className="font-medium text-gray-500 mb-1">2 Ton Tersedia</p>
                        <p className="font-bold text-lime-600">Rp. 100.000</p>
                        <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</button>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-centershadow-xl w-[250px] h-[300px] overflow-hidden'>
                        <img src="storage/images/beras.jpg" alt="step1" className="w-[250px] h-[120px] object-cover" />
                        <div className="flex flex-row justify-between my-2">
                        <p className='font-semibold'>Beras</p>
                        <p className="font-medium text-amber-500">Kategori</p>
                        </div>
                        <p className="font-medium text-gray-500 mb-1">2 Ton Tersedia</p>
                        <p className="font-bold text-lime-600">Rp. 100.000</p>
                        <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</button>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-centershadow-xl w-[250px] h-[300px] overflow-hidden'>
                        <img src="storage/images/beras.jpg" alt="step1" className="w-[250px] h-[120px] object-cover" />
                        <div className="flex flex-row justify-between my-2">
                        <p className='font-semibold'>Beras</p>
                        <p className="font-medium text-amber-500">Kategori</p>
                        </div>
                        <p className="font-medium text-gray-500 mb-1">2 Ton Tersedia</p>
                        <p className="font-bold text-lime-600">Rp. 100.000</p>
                        <button className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</button>
                    </li>
                    <li className='border-2 border-dashed border-amber-300 p-3 rounded-lg flex flex-col justify-centershadow-xl w-[250px] h-[300px] overflow-hidden'>
                        <img src="storage/images/beras.jpg" alt="step1" className="w-[250px] h-[120px] object-cover" />
                        <div className="flex flex-row justify-between my-2">
                        <p className='font-semibold'>Beras</p>
                        <p className="font-medium text-amber-500">Kategori</p>
                        </div>
                        <p className="font-medium text-gray-500 mb-1">2 Ton Tersedia</p>
                        <p className="font-bold text-lime-600">Rp. 100.000</p>
                        <button href="dashboard/seller/product/edit"className="bg-amber-500 px-4 py-2 rounded-lg text-white text-base font-medium text-center w-fit mt-3 hover:bg-amber-400">Edit</button>
                    </li>
                    </ul>       
            </div>
        </SellerLayout>
        </>
    );
}