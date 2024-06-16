<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::with(['user', 'order.status', 'target'])->where('target_id', Auth::user()->id)->get();

        Notification::where('target_id', Auth::user()->id)->update([
            'is_read' => 1
        ]);

        return Inertia::render('Dashboard/Buyer/Notif/Index', compact('notifications'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order' => ['nullable', 'numeric'],
            'target' => ['nullable', 'numeric'],
            'message' => ['required'],
        ]);

        $notif = Notification::create([
            'user_id' => Auth::user()->id,
            'order_id' => $request->order,
            'target_id' => $request->target,
            'message' => $request->message,
            'is_read' => 0,
        ]);

        return response($notif);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
