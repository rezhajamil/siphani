<?php

namespace App\Http\Controllers\Dashboard\Seller;

use App\Http\Controllers\Controller;
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
        $orders = Order::select('orders.*')->with(['user', 'product.shop', 'product.category', 'product.images', 'status', 'discuss'])->join('products', 'orders.product_id', '=', 'products.id')->where('products.shop_id', Auth::user()->shop->id)->get();

        return Inertia::render('Dashboard/Seller/Order/Index', compact('orders'));
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

    public function show($id)
    {
        $order = Order::with(['user', 'product.shop', 'product.category', 'product.images', 'product.unit', 'product.tags', 'status', 'discuss.user'])->find($id);

        return Inertia::render('Dashboard/Seller/Order/Detail', compact('order'));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    }

    public function report(Request $request)
    {
        $start_date = $request->start_date ?? date('Y-m-01');
        $end_date = $request->end_date ?? date('Y-m-d');

        $orders = Order::select('orders.*')->with(['user', 'product.shop', 'product.category', 'product.unit', 'status', 'discuss'])->join('products', 'orders.product_id', '=', 'products.id')->where('products.shop_id', Auth::user()->shop->id)->where('orders.created_at', '>=', $start_date)->where('orders.created_at', '<=', $end_date . ' 23:59:59')->where('orders.status_id', 6)->get();

        return Inertia::render('Dashboard/Seller/Order/Report', compact('orders', 'start_date', 'end_date'));
    }
}
