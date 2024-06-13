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
        $orders = Order::where('user_id', Auth::user()->id)->get();

        return Inertia::render('Order/Index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();

        if ($$orders) {
            return redirect()->route('buyer.order.create');
        } else {
            // If the shop does not exist, show the create form
            return Inertia::render('Buyer/Order/Create');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product' => ['required'],
            'quantity' => ['required', 'numeric'],
            'total_amount' => ['required', 'numeric'],
            'proof' => ['file', 'nullable']
        ]);

        if ($request->hasFile('proof')) {
            $proof = $request->proof->store('proof');
        }

        $order = Order::create([
            'user_id' => Auth::user()->id,
            'product_id' => $request->product,
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

        return Inertia::render('Order/Show', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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
