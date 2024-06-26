<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'product.shop', 'product.category', 'product.images', 'product.unit', 'product.tags', 'status', 'discuss.user'])->where('user_id', Auth::user()->id)
            ->get();

        return Inertia::render('Dashboard/Buyer/Order/Index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $product = Product::with(['shop.user', 'category', 'images', 'unit', 'tags.tag'])->find($id);

        return Inertia::render('Dashboard/Buyer/Order/Create', compact('product'));
    }


    public function store(Request $request)
    {
        $request->validate([
            'quantity' => ['required', 'numeric'],
            'total_amount' => ['required', 'numeric'],
            'proof' => ['file', 'nullable']
        ]);

        $order = Order::create([
            'user_id' => Auth::user()->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'total_amount' => $request->total_amount,
            'status_id' => 1,
        ]);

        $product = Product::with(['shop.user'])->find($request->product_id);
        $product->stock -= $request->quantity;
        $product->save();

        $notif = Notification::create([
            'user_id' => Auth::user()->id,
            'order_id' => $order->id,
            'target_id' => $product->shop->user->id,
            'message' => "Ada pesanan baru dari " . Auth::user()->name,
            'is_read' => 0,
        ]);

        return to_route('order.index')->with('success');
    }

    public function show($id)
    {
        $order = Order::with(['user', 'product.shop', 'product.category', 'product.images', 'product.unit', 'product.tags', 'status', 'discuss.user'])->find($id);

        return Inertia::render('Dashboard/Buyer/Order/Detail', compact('order'));
    }

    public function edit(Order $order)
    {
        //
    }


    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
    }

    public function uploadProof(Request $request, $order)
    {
        $order = Order::with(['product.shop.user'])->find($order);

        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        $request->validate([
            'proof' => 'required|file',
        ]);

        $url = $request->file('proof')->store('proof/' . $order->id);

        $order->proof_of_payment_url = $url;
        $order->save();

        $notif = Notification::create([
            'user_id' => Auth::user()->id,
            'order_id' => $order->id,
            'target_id' => $order->product->shop->user->id,
            'message' => Auth::user()->name . " telah mengupload bukti pembayaran pesanan",
            'is_read' => 0,
        ]);

        return redirect()->route('order.show', $order)->with('success');
    }
}
