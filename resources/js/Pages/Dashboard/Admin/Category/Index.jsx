import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";

const Index = () => {
    const { categories } = usePage().props || { categories: [] }; // Default to empty array if props are undefined

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Category List</h1>
                <Link href={route('admin.category.create')}>
                    <PrimaryButton>Create New Category</PrimaryButton>
                </Link>
                <div className="mt-4">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="border border-gray-300 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{category.id}</td>
                                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{category.name}</td>
                                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap">{category.description}</td>
                                    {/* Add more cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
