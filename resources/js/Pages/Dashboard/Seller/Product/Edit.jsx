

export default function Edit() {

    const [ data, setData ] = useState({
        name: '',
        shop: '',
        category: '',
        unit: '',
        description:'',
        price: '',
        stock: '',
        image: null,
    })
    return (
        <>
        <SellerLayout>   
        <div className='w-full bg-white min-h-screen py-15 md:py-10 px-16 flex justify-center items-center flex flex-col'>
                <div className='flex flex-col mt-20 md:mt-0'>
                    <h1 className='text-center bg-amber-300 text-2xl md:text-4xl font-semibold mb-6 w-fit mx-auto'>Tambah Produk</h1>
                </div>
                <form className="flex flex-col items-center">
                    <FormCreate data={data} setData={setData}/>
                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton className="w-full text-center" disabled={processing}>
                            Buat
                        </PrimaryButton>
                    </div>
                </form>    
            </div>
        </SellerLayout>
        </>
    ); 
}