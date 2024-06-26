<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index(Request $request)
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

        $products = $query->with(['shop.user', 'category', 'images', 'tags.tag'])->get();
        $categories = Category::all();
        $tags = Tag::all();
        $units = Unit::all();

        return Inertia::render('Dashboard/Buyer/Product/Index', [
            'user' => Auth::user(), // Kirim data pengguna ke halaman
        ]);

        return Inertia::render('Dashboard/Buyer/Product/Index', compact('products', 'categories', 'tags', 'units'));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = Product::with(['shop.user', 'images', 'category', 'tags'])->find($product->id);

        return Inertia::render('Pages/Produk', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
