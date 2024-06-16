import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/atom/InputError';
import InputLabel from '@/Components/atom/InputLabel';
import PrimaryButton from '@/Components/atom/PrimaryButton';
import TextInput from '@/Components/atom/TextInput';
import Select from '@/Components/atom/Select';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        address: '',
        gender:'',
        addres: '',
        avatar: null,
        password: '',
        password_confirmation: '',
    });

    const genderOption = [
        { value: "Pria", label: "Pria" },
        { value: "Wanita", label: "Wanita" }
    ];

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('whatsapp', data.whatsapp);
        formData.append('address', data.address);
        formData.append('gender', data.gender);
        formData.append('avatar', data.avatar); // Tambahkan avatar ke FormData
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);

        post(route('register'), {
            data: formData, // Kirim data sebagai FormData
            onSuccess: () => {
                window.location.href= "/dashboard"
            },
        });
    };

    const handleFileChange = (e) => {
        setData('avatar', e.target.files[0]);
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <h1 className='text-center my-3 text-2xl font-bold'>Selamat Datang Kembali!</h1>
                    <div className='flex flex-row gap-2 justify-center mb-4'>
                        <p className='text-center text-sm font-light'>Sudah punya akun?</p>
                        <a href='/login' className='text-sm font-semibold text-amber-500 cursor-pointer'>Log in Sekarang</a>
                    </div>
            <form onSubmit={submit} className='flex flex-col items-center'>
                <div className='grid md:grid-cols-2 gap-3 justify-center items-center md:w-1/2 p-5'>
                <div className=''>
                    <InputLabel htmlFor="name" value="Name" />

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

                <div className="">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel htmlFor="phone" value="No Hp" />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel htmlFor="whastapp" value="No WhatsApp" />

                    <TextInput
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        value={data.whatsapp}
                        className="mt-1 block w-full"
                        autoComplete="whatsapp"
                        onChange={(e) => setData('whatsapp', e.target.value)}
                    />

                    <InputError message={errors.whastsapp} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel htmlFor="gender" value="Jenis Kelamin" />

                    <Select
                        id="gender"
                        name="gender"
                        value={data.gender}
                        className="mt-1 block w-full"
                        options={genderOption}
                        placeholder = "Pilih Jenis Kelamin"
                        autoComplete="gender"
                        onChange={(e) => setData('gender', e.target.value)}
                        required
                    />

                    <InputError message={errors.whastsapp} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel htmlFor="avatar" value="Foto Profile" />

                    <TextInput
                        id="avatar"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="mt-1 block w-full p-2.5 focus:outline file:rounded-lg file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-amber-400"
                        autoComplete="avatar"
                        onChange={handleFileChange}
                    />

                    <InputError message={errors.avatar} className="mt-2" />
                </div>
                <div className="w-full">

                    <InputLabel htmlFor="address" value="Alamat" />

                    <TextInput
                        id="address"
                        type="text"
                        name="whatsapp"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        onChange={(e) => setData('address', e.target.value)}
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="">
                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="w-full text-center" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
