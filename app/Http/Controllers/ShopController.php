<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shop = Shop::where('user_id', Auth::user()->id)->first();

        return Inertia::render('Shop/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Shop/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'phone' => ['required', 'numeric'],
            'email' => ['nullable', 'email'],
            'address' => ['required', 'string'],
            'maps' => ['nullable', 'string'],
            'avatar' => ['nullable', 'max:4096'],
        ]);

        if ($request->hasFile('avatar')) {
            $url = $request->avatar->store("avatar");
        }

        $shop = Shop::create([
            'name' => ucwords($request->name),
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'maps' => $request->maps,
            'url' => $url ?? null,
        ]);

        return to_route('dashboard.seller.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shop $shop)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        //
    }
}
