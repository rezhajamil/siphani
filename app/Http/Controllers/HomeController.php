<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Seller/Home');
    }

    public function product(Request $request)
    {
        $name = $request->name;
        $tags = $request->tags;
        $category = $request->category;
        $order = $request->order;
        $sort = $request->sort ?? 'asc';


        $query = Product::query();

        if ($name) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        if ($tags) {
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->whereIn('id', $tags);
            });
        }

        if ($category) {
            $query->where('category_id', $category);
        }

        if (in_array($order, ['name', 'price'])) {
            $query->orderBy($order, $sort);
        }

        $products = $query->with(['shop.user', 'images', 'tags'])->get();

        return Inertia::render('Produk', compact('products'));
    }

    public function about()
    {
        return Inertia::render('About');
    }
}
