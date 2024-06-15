import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import BuyerLayout from '@/Layouts/BuyerLayout';

const Index = () => {
    const { notifications } = usePage().props; // Mengambil properti notifications dari Inertia.js

    useEffect(() => {
        // Lakukan sesuatu setiap kali komponen di-mount atau properti notifications berubah
        console.log(notifications);
    }, [notifications]); // Memastikan useEffect dipanggil setiap kali properti notifications berubah

    return (
        <BuyerLayout>
            <div>
                <h1>Notifications</h1>
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            <strong>{notification.title}</strong>
                            <p>{notification.message}</p>
                            <p>From: {notification.user.name}</p>
                            <p>Regarding Order: {notification.order.id}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        </BuyerLayout>
    );
};

export default Index;
