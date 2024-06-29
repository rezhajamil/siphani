import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import axios from 'axios';
import SellerLayout from "@/Layouts/SellerLayout";
import BuyerLayout from "@/Layouts/BuyerLayout";
import Template from "@/Layouts/Template";

const NotificationList = () => {
  const { notifications, user } = usePage().props;
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(() => {
    setUnreadNotificationCount(
      notifications.filter(notification => !notification.is_read).length
    );

    // Function to mark a notification as read
    const markNotificationAsRead = async (notificationId) => {
      try {
        await axios.put(`/notifications/${notificationId}`, { is_read: true });
        // Update unread count after marking as read
        setUnreadNotificationCount(prevCount => prevCount - 1);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    };

    // Clean up
    return () => {
      // Cleanup logic if needed
    };
  }, [notifications]);

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

  const renderContent = () => {
    return (
      <>
        {notifications && notifications.length > 0 ? (
          <ul className="w-full max-w-3xl mx-auto mt-20 space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 border rounded-lg shadow-md ${notification.is_read ? 'bg-gray-100' : 'bg-white'}`}
              >
                <Link 
                  href={route("seller.order.show", { order: notification.order.id })}
                  onClick={() => markNotificationAsRead(notification.id)}
                  className="flex flex-col justify-center w-full"
                >
                  <div className="flex justify-between w-full">
                    <p className="text-sm font-medium">
                      Dari: {notification.user.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatDate(notification.created_at)}
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
                        <span className="bg-amber-300 p-1 rounded-lg">
                          {notification.order.status.name}
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
    if (user && user.role === 'Buyer') {
      return (
        <BuyerLayout notificationCount={unreadNotificationCount}>
          {renderContent()}
        </BuyerLayout>
      );
    } else if (user && user.role === 'Seller') {
      return (
        <SellerLayout notificationCount={unreadNotificationCount}>
          {renderContent()}
        </SellerLayout>
      );
    } else {
      return (
        <Template>
          {renderContent()}
        </Template>
      );
    }
  };

  return renderLayout();
};

export default NotificationList;
