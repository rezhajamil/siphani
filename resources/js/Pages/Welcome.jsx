import { Link, Head, usePage } from "@inertiajs/react";
import Template from "@/Layouts/Template";
import BuyerLayout from "@/Layouts/BuyerLayout";
import SellerLayout from "@/Layouts/SellerLayout";
import AdminLayout from "@/Layouts/AdminLayout";
import { useCallback, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { user } = usePage().props; // Retrieve the user from props

    useEffect(() => {
        Aos.init();
    }, []);

    const renderLayout = () => {
        if (user && user.role === "Buyer") {
            return <BuyerLayout>{renderContent()}</BuyerLayout>;
        } else if (user && user.role === "Seller") {
            return <SellerLayout>{renderContent()}</SellerLayout>;
        } else {
            return <Template>{renderContent()}</Template>;
        }
    };

    const renderContent = () => {
        return (
            <>
                <div
                    className="w-full min-h-[90vh] bg-cover bg-no-repeat py-10 px-16 flex justify-center items-center flex flex-col"
                    style={{
                        backgroundImage:
                            "linear-gradient(to bottom, rgba(254, 182, 0, 3), transparent), url(images/pertanian.jpg)",
                        backgroundPosition: "center",
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="flex flex-col justify-center mx-auto mt-20 mb-10">
                        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl md:text-center">
                            Jual Hasil Panen
                        </h1>
                        <h1 className="mt-1 font-sans text-3xl font-bold tracking-tight text-white md:text-5xl md:text-center w-fit md:mx-auto">
                            Langsung ke Pembeli
                        </h1>
                        <p className="px-3 py-1 mt-5 text-white text-md md:text-xl bg-lime-500 w-fit md:mx-auto">
                            {" "}
                            Belanja Hasil Pertanian
                        </p>
                        <p className="px-3 py-1 mt-2 text-white text-md md:text-xl bg-lime-500 w-fit md:mx-auto">
                            {" "}
                            Mudah dan Hemat!
                        </p>
                    </div>

                    <div>
                        <ul className="flex flex-col justify-center gap-5 md:flex-row md:items-center">
                            <li className="flex items-center justify-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-200 md:flex-row md:w-1/3">
                                <img
                                    src="images/padi.png"
                                    alt="step3"
                                    className="w-[80px] h-[80px] object-cover rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-md md:text-xl">
                                        Produk Segar Berkualitas
                                    </h1>
                                    <p className="text-sm font-medium md:text-md w-fit">
                                        {" "}
                                        Anda bisa mendapatkan hasil pertanian
                                        segar dan berkualitas tinggi setiap kali
                                        berbelanja di website ini
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center justify-center gap-3 p-3 rounded-lg cursor-pointer bg-amber-200 md:flex-row md:w-1/3">
                                <img
                                    src="images/petani.png"
                                    alt="step3"
                                    className="w-[80px] h-[80px] object-cover rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-md md:text-xl">
                                        Dukung Petani Lokal
                                    </h1>
                                    <p className="text-sm font-medium md:text-md w-fit">
                                        {" "}
                                        Dengan berbelanja melalui website ini,
                                        Anda secara langsung mendukung petani
                                        lokal dan ekonomi lokal
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center p-5 bg-amber-300 h-fit">
                    <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                        <img
                            src="images/padi.jpg"
                            alt="padi"
                            className="w-[500px] h-[300px] object-cover"
                            data-aos="fade-up"
                            data-aos-duration="100"
                        />
                        <div className="flex flex-col justify-center md:justify-start md:w-1/4">
                            <p
                                className="font-medium text-amber-600 text-md"
                                data-aos="fade-up"
                                data-aos-duration="100"
                            >
                                About Us
                            </p>
                            <h1
                                className="mt-3 text-xl font-bold text-black md:text-3xl"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                Bersama Kami, Jual Hasil Panen Anda Langsung ke
                                Pembeli
                            </h1>
                            <p
                                className="mt-3 font-medium text-black text-md"
                                data-aos="fade-up"
                                data-aos-duration="100"
                            >
                                Kami menghubungkan petani langsung dengan
                                konsumen, menciptakan sebuah ekosistem yang
                                menguntungkan bagi semua pihak. Untuk para
                                petani, inilah kesempatan emas untuk menjual
                                hasil panen Anda langsung ke pembeli tanpa biaya
                                perantara besar, memastikan Anda mendapatkan
                                keuntungan maksimal.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center p-5 bg-white h-fit">
                    <h1 className="my-3 text-xl font-bold text-center md:text-3xl">
                        Bagaimana cara memesan?
                    </h1>
                    <ul className="flex flex-col items-center justify-center gap-5 m-5 md:flex-row">
                        <li className="flex flex-col justify-center gap-3 p-3 rounded-lg bg-amber-200">
                            <img
                                src="images/step1.png"
                                alt="step1"
                                className="w-[200px] h-[200px] object-cover"
                            />
                            <p className="font-semibold text-center">
                                Memilih Produk
                            </p>
                        </li>
                        <li className="flex flex-col justify-center gap-3 p-3 rounded-lg bg-amber-200">
                            <img
                                src="images/step2.png"
                                alt="step2"
                                className="w-[200px] h-[200px] object-cover"
                            />
                            <p className="font-semibold text-center">
                                Lakukan pemesanan
                            </p>
                        </li>
                        <li className="flex flex-col justify-center gap-3 p-3 rounded-lg bg-amber-200">
                            <img
                                src="images/step3.png"
                                alt="step3"
                                className="w-[200px] h-[200px] object-cover"
                            />
                            <p className="font-semibold text-center">
                                Konfirmasi dan bayar
                            </p>
                        </li>
                        <li className="flex flex-col justify-center gap-3 p-3 rounded-lg bg-amber-200">
                            <img
                                src="images/step4.png"
                                alt="step4"
                                className="w-[200px] h-[200px] object-cover"
                            />
                            <p className="font-semibold text-center">
                                Pengiriman
                            </p>
                        </li>
                    </ul>
                    <p className="text-center">
                        Pesan dan nikmati hasil panen yang segar dari petani
                        lokal
                    </p>
                    <button className="px-4 py-3 mx-auto mt-3 text-base font-medium text-center text-white rounded-lg bg-amber-500 w-fit hover:bg-amber-400">
                        Mulai Belanja
                    </button>
                </div>
            </>
        );
    };

    return (
        <div>
            <Head title="Siphani" />
            {renderLayout()}{" "}
            {/* Call renderLayout function to display the layout based on user role */}
        </div>
    );
}
