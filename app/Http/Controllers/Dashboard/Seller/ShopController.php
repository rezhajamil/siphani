<?php

namespace App\Http\Controllers\Dashboard\Seller;

use App\Http\Controllers\Controller;
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

        if ($shop) {
            return Inertia::render('Shop/Index', [
                'shop' => $shop,
            ]);
        } else {
            return redirect()->route('seller.shop.create');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $shop = Shop::where('user_id', Auth::user()->id)->first();

        if ($shop) {
            return redirect()->route('seller.shop.index');
        } else {
            // If the shop does not exist, show the create form
            return Inertia::render('Shop/Create');
        }
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

        $userId = Auth::id();

        Shop::create([
            'user_id' => $userId,
            'name' => ucwords($request->name),
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'maps' => $request->maps,
            'avatar' => $url ?? null,
        ]);

        return redirect()->route('seller.shop.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        $shop = Shop::with(['user', 'products.category', 'products.unit', 'products.tag', 'products.images', 'product.orders'])->find($shop->id);

        return Inertia::render('Shop/Show', compact('shop'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        return Inertia::render('Shop/Edit', [
            'shop' => $shop,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shop $shop)
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

        $shop->name = ucwords($request->name);
        $shop->phone = $request->phone;
        $shop->email = $request->email;
        $shop->address = $request->address;
        $shop->maps = $request->maps;
        $shop->avatar = $url ?? null;
        $shop->save();

        return redirect()->route('seller.shop.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        //
    }
}
