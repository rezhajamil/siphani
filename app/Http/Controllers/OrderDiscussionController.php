<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderDiscussion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderDiscussionController extends Controller
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
        //
    }


    public function store(Request $request)
    {
        $request->validate([
            'message' => ['required'],
            'order_id' => ['required']
        ]);

        $discuss = OrderDiscussion::create([
            'user_id' => Auth::user()->id,
            'order_id' => $request->order_id,
            'message' => ucfirst($request->message)
        ]);

        $seller = Order::with(['product.shop.user'])->find($request->order_id);

        $notif = Notification::create([
            'user_id' => Auth::user()->id,
            'order_id' => $request->order_id,
            'target_id' => $seller->product->shop->user->id,
            'message' => "Ada mendapat pesan diskusi baru"
        ]);

        return back();
    }


    public function show(OrderDiscussion $orderDiscussion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderDiscussion $orderDiscussion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderDiscussion $orderDiscussion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderDiscussion $orderDiscussion)
    {
        $orderDiscussion = OrderDiscussion::find($orderDiscussion);
        $orderDiscussion->delete();

        return back();
    }
}
