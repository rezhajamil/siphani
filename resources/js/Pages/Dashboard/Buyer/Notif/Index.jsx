import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import axios from 'axios';

const NotificationList = () => {
    const { notifications, user } = usePage().props;

    useEffect(() => {
        // Mark all notifications as read when component mounts
        const markNotificationsAsRead = async () => {
            try {
                await axios.post('/notifications/read', { user_id: user.id });
            } catch (error) {
                console.error('Error marking notifications as read:', error);
            }
        };

        markNotificationsAsRead();
    }, [user.id]);

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
        <BuyerLayout notificationCount={notifications.length}>
            <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-10 bg-white md:py-10">
                {notifications && notifications.length > 0 ? (
                    <ul className="w-full max-w-3xl mx-auto mt-4 space-y-4">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={`p-4 border rounded-lg shadow-md ${notification.is_read ? 'bg-gray-100' : 'bg-white'}`}
                            >
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
                                        <p>
                                            Status:{" "}
                                            {notification.order.status.name}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Tidak ada notifikasi.</p>
                )}
            </div>
        </BuyerLayout>
    );
};

export default NotificationList;
