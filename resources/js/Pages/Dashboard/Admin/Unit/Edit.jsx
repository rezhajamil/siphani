import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Edit = ({ unit }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: unit.name,
        description: unit.description
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.units.update', unit.id), {
            onSuccess: () => {
                // Redirect or show success message
                console.log('Unit updated successfully!');
            },
        });
    };

    return (
        <AdminLayout>
            <div className="w-1/2 mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Edit Unit</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" className="mt-2 block w-full px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <PrimaryButton type="submit" disabled={processing}>Update Unit</PrimaryButton>
                        <Link href={route('admin.unit.index')} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Edit;
