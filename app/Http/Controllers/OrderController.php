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
        $orders = Order::where('user_id', Auth::user()->id)
            ->with('product.images', 'product.category', 'product.tags')
            ->get();

        return Inertia::render('Dashboard/Buyer/Order/Index', [
            'orders' => $orders,
        ]);

        return Inertia::render('Dashboard/Buyer/Order/Index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $product = Product::with(['shop.user', 'category', 'images', 'tags.tag'])->find($id);

        return Inertia::render('Dashboard/Buyer/Order/Create', compact('product'));
    }


    public function store(Request $request, $id)
    {
        $request->validate([
            'quantity' => ['required', 'numeric'],
            'total_amount' => ['required', 'numeric'],
            'proof' => ['file', 'nullable']
        ]);

        if ($request->hasFile('proof')) {
            $proof = $request->proof->store('proof');
        }

        $order = Order::create([
            'user_id' => Auth::user()->id,
            'product_id' => $id,
            'quantity' => $request->quantity,
            'total_amount' => $request->total_amount,
            'status_id' => 1,
            'proof_of_payment_url' => $proof ?? '',
        ]);

        $product = Product::find($request->product);

        $notif = Notification::create([
            'user_id' => Auth::user()->id,
            'order_id' => $order->id,
            'target_id' => $product->shop->user->id,
            'message' => "Ada pesanan baru dari " . Auth::user()->name,
            'is_read' => 0,
        ]);

        return to_route('order.index')->with('success');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::find($id);

        return Inertia::render('Dashboard/Buyer/Order/Index', compact('order'));
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
}
