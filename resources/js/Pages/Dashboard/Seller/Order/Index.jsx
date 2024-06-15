// Import React dan Inertia
import { usePage } from '@inertiajs/inertia-react';
import PrimaryButton from './PrimaryButton'; // Misalnya PrimaryButton adalah komponen tombol primer yang telah dibuat

const Index = () => {

    const { orders } = usePage().props;

    const handleApprove = (orderId) => {
    
        console.log(`Approving order with ID ${orderId}`);

    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Daftar Pesanan</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-lg font-semibold">{order.product.name}</p>
                            <p className="text-sm font-medium">{order.status === 1 ? 'Pending' : 'Approved'}</p>
                        </div>
                        <div className="flex flex-row items-start justify-between gap-4">
                            <div className="flex flex-row gap-4">
                                <img
                                    src={order.product.images[0]?.url || '/images/empty.png'}
                                    alt={order.product.name || 'Unknown'}
                                    className="w-[200px] h-[120px] object-cover rounded-lg"
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-md">{order.product.name}</p>
                                    <p className="font-medium text-sm">{order.quantity} pcs</p>
                                    <p className="font-medium text-sm">Total Amount: ${order.total_amount}</p>
                                    <p className={`p-1 rounded-lg text-sm font-medium ${order.status === 1 ? 'bg-yellow-400 text-black' : 'bg-green-400 text-white'}`}>
                                        {order.status === 1 ? 'Pending' : 'Approved'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {order.status === 1 && (
                                    <PrimaryButton onClick={() => handleApprove(order.id)}>
                                        Approve
                                    </PrimaryButton>
                                )}
                                <PrimaryButton>
                                    <a href="#">Edit</a>
                                    
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
