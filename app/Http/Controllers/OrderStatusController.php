<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Http\Request;

class OrderStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderStatus $orderStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderStatus $orderStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $order_id)
    {
        $request->validate([
            'status' => ['required', 'numeric']
        ]);

        $order = Order::with(['status'])->find($order_id);

        $order->status_id = $request->status;
        $order->save();

        $notif = Notification::create([
            'user_id' => $order->user_id,
            'order_id' => $order->id,
            'target_id' => $order->user_id,
            'message' => "Status pesanan anda berubah menjadi " . $order->status->name,
            'is_read' => 0,
        ]);

        return back();
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderStatus $orderStatus)
    {
        //
    }
}
