import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.units.store'), {
            onSuccess: () => {
                // Redirect or show success message
                console.log('Unit created successfully!');
            },
        });
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Create Unit</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={data.description} onChange={(e) => setData('description', e.target.value)}></textarea>
                    </div>
                    <div className="flex items-center">
                        <PrimaryButton type="submit" disabled={processing}>Create Unit</PrimaryButton>
                        <Link href={route('admin.unit.index')} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Create;
