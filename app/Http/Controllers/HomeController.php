<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Unit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::check() ? Auth::user() : null;
        return Inertia::render('Welcome', compact('user'));
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

        $products = $query->with(['shop.user', 'category', 'images', 'tags.tag'])->where('status', 1)->get();
        $categories = Category::all();
        $tags = Tag::all();
        $units = Unit::all();

        $user = Auth::check() ? Auth::user() : null;
        return Inertia::render('Produk', compact('products', 'categories', 'tags', 'units', 'user'), []);
    }

    public function about()
    {
        $user = Auth::check() ? Auth::user() : null;
        return Inertia::render('About', compact('user'));
    }
}
