import React from "react";
import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";
import { Inertia } from "@inertiajs/inertia";

const Index = () => {
    const { tags } = usePage().props; // Mendapatkan data tags dari props page

    const handleToggleStatus = (id) => {
        Inertia.post(route('admin.tags.toggleStatus', id)); // Mengirimkan POST request untuk toggle status tag
    };

    const handleEdit = (id) => {
        Inertia.visit(route('admin.tags.edit', id)); // Mengarahkan ke halaman edit tag berdasarkan ID
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Tag List</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tags.map((tag) => (
                            <tr key={tag.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{tag.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{tag.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{tag.status ? 'Active' : 'Inactive'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <PrimaryButton onClick={() => handleToggleStatus(tag.id)}>{tag.status ? 'Deactivate' : 'Activate'}</PrimaryButton>
                                    <PrimaryButton onClick={() => handleEdit(tag.id)} className="ml-2">Edit</PrimaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default Index;
