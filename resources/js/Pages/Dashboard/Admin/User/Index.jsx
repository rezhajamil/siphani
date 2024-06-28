import React from "react";
import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Index = () => {
    const { users } = usePage().props; // Mendapatkan data users dari props page

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Users List</h1>
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notifications</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.shop ? user.shop.name : '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.orders ? user.orders.length : 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.notifications ? user.notifications.length : 0}</td>
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
