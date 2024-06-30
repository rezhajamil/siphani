import React, { useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import axios from "axios";
import SellerLayout from "@/Layouts/SellerLayout";
import BuyerLayout from "@/Layouts/BuyerLayout";
import Template from "@/Layouts/Template";

const NotificationList = (auth) => {
    const { notifications, user } = usePage().props;
    console.log("notifications", notifications);

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

    useEffect(() => {
        // Mark all notifications as read when component mounts
        const markNotificationsAsRead = async () => {
            try {
                await axios.get("/notification/read-notif", {
                    user_id: user.id,
                });
            } catch (error) {
                console.error("Error marking notifications as read:", error);
            }
        };

        markNotificationsAsRead();
    }, [user.id]);

    const renderContent = () => {
        return (
            <>
                {notifications && notifications.length > 0 ? (
                    <ul className="w-full max-w-3xl mx-auto mt-20 space-y-4">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className="p-4 border rounded-lg shadow-md"
                            >
                                <Link
                                    href={route("order.show", {
                                        order: notification.order_id,
                                    })}
                                    className={`flex flex-col justify-center w-full  ${
                                        notification.is_read
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    }`}
                                >
                                    <div className="flex justify-between w-full">
                                        <p className="text-sm font-medium">
                                            Dari: {notification.user.name}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {formatDate(
                                                notification.created_at
                                            )}
                                        </p>
                                    </div>
                                    <p className="mt-2 text-sm text-amber-500">
                                        {notification.message}
                                    </p>
                                    {notification.order && (
                                        <div className="mt-2 text-sm">
                                            <p className="font-medium">
                                                Pesanan: {notification.order.id}
                                            </p>
                                            <p>
                                                Status:{" "}
                                                <span className="p-1 rounded-lg bg-amber-300">
                                                    {
                                                        notification.order
                                                            .status.name
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Tidak ada notifikasi.</p>
                )}
            </>
        );
    };

    const renderLayout = () => {
        if (user && user.role === "Buyer") {
            return (
                <BuyerLayout notificationCount={notifications.length}>
                    {renderContent()}
                </BuyerLayout>
            );
        } else if (user && user.role === "Seller") {
            return (
                <SellerLayout notificationCount={notifications.length}>
                    {renderContent()}
                </SellerLayout>
            );
        } else {
            return <Template>{renderContent()}</Template>;
        }
    };

    return renderLayout();
};

export default NotificationList;
