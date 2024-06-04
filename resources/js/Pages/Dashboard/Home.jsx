import SellerLayout from "@/Layouts/SellerLayout";
export default function Home() {
    return (
        <>
        <SellerLayout>
            
        <div className='w-full bg-white min-h-screen py-15 md:py-10 px-16 flex justify-center items-center flex flex-col'>
                <div className='flex flex-col mt-20 md:mt-0'>
                    <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Tambah Produk</h1>
                </div>
                <div>
                    <h1>Halo</h1>
                </div>    
            </div>
        </SellerLayout>
        </>
    );
}