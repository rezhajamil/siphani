import React from "react";
import { usePage } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";

const NotificationList = () => {
    const { notifications } = usePage().props;

    if (!notifications || notifications.length === 0) {
        return <p>Tidak ada notifikasi.</p>;
    }

    const formatDate = (createdAt) => {
        const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        const formattedTime = new Date(createdAt).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <BuyerLayout>
            <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-white py-10 md:py-10">
                <h1 className="mx-auto mb-6 text-xl font-semibold text-center bg-amber-300 md:text-4xl w-fit">
                    Notifikasi
                </h1>
                <ul className="w-full max-w-3xl mx-auto mt-4 space-y-4">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="p-4 border rounded-lg shadow-md">
                            <div className="flex justify-between">
                                <p className="text-sm font-medium">
                                    Dari: {notification.user.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {formatDate(notification.created_at)}
                                </p>
                            </div>
                            <p className="mt-2 text-sm">
                                {notification.message}
                            </p>
                            {notification.order && (
                                <div className="mt-2 text-sm">
                                    <p className="font-medium">
                                        Pesanan: {notification.order.id}
                                    </p>
                                    <p>Status: {notification.order.status.name}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </BuyerLayout>
    );
};

export default NotificationList;
