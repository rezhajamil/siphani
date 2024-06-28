import React from "react";
import { usePage, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import PrimaryButton from "@/Components/atom/PrimaryButton";
const Index = () => {
    const { units } = usePage().props; // Mendapatkan data units dari props page

    const handleToggleStatus = (id) => {
        Inertia.post(route('admin.units.toggleStatus', id)); // Mengirimkan POST request untuk toggle status unit
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Unit List</h1>
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
                        {units.map((unit) => (
                            <tr key={unit.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{unit.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{unit.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{unit.status ? 'Active' : 'Inactive'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <PrimaryButton onClick={() => handleToggleStatus(unit.id)}>{unit.status ? 'Deactivate' : 'Activate'}</PrimaryButton>
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
