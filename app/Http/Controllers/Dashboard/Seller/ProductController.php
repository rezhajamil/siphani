<?php

namespace App\Http\Controllers\Dashboard\Seller;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductTag;
use App\Models\Shop;
use App\Models\Tag;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shop = Auth::user()->shop->id;

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

        $products = $query->where('shop_id', $shop)->with(['shop.user', 'category', 'images', 'tags.tag'])->get();

        return Inertia::render('Dashboard/Seller/Product/Index', compact('products'));
    }

    public function create()
    {
        $categories = Category::orderBy('name')->get();
        $units = Unit::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Dashboard/Seller/Product/Create', compact('categories', 'units', 'tags'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string'],
            'category' => ['required'],
            'unit' => ['required'],
            'description' => ['string', 'nullable'],
            'price' => ['string', 'numeric'],
            'stock' => ['numeric'],
            'image' => ['required', 'max:4096'],
        ]);

        $product = Product::create([
            'name' => ucfirst($request->name),
            'shop_id' => Auth::user()->shop->id,
            'category_id' => $request->category,
            'unit_id' => $request->unit,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        if ($product) {
            if ($request->tag) {
                ProductTag::where('product_id', $product->id)->delete();

                foreach ($request->tag as $key => $tag) {
                    ProductTag::create([
                        'product_id' => $product->id,
                        'tag_id' => $tag,
                    ]);
                }
            }


            if ($request->hasFile('image')) {
                ProductImage::where('product_id', $product->id)->delete();

                foreach ($request->file('image') as $key => $image) {
                    $url = $image->store("product_images/$product->id");
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $url,
                    ]);
                }
            }
        }

        return to_route('seller.product.index')->with('success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = Product::with(['shop.user', 'images', 'category', 'tags'])->find($product->id);

        return Inertia::render('Dashboard/Seller/Product/Index', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $categories = Category::orderBy('name')->get();
        $units = Unit::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();
        $product = Product::with(['shop.user', 'category', 'images', 'tags.tag'])->find($id);

        return Inertia::render('Dashboard/Seller/Product/Edit', compact('categories', 'units', 'tags', 'product'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'category' => ['required'],
            'unit' => ['required'],
            'description' => ['string', 'nullable'],
            'price' => ['string', 'numeric'],
            'stock' => ['numeric'],
            'image' => ['required', 'max:4096'],
        ]);

        $product->name = ucfirst($request->name);
        $product->category_id = $request->category;
        $product->unit_id = $request->unit;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->save();

        if ($product) {
            if ($request->tag) {
                ProductTag::where('product_id', $product->id)->delete();

                foreach ($request->tag as $key => $tag) {
                    ProductTag::create([
                        'product_id' => $product->id,
                        'tag_id' => $tag,
                    ]);
                }
            }

            if ($request->hasFile('image')) {
                ProductImage::where('product_id', $product->id)->delete();

                foreach ($request->file('image') as $key => $image) {
                    $url = $image->store("product_images/$product->id");
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $url,
                    ]);
                }
            }
        }

        return redirect()->route('seller.product.index')->with('success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        ProductTag::where('product_id', $product->id)->delete();

        $images = ProductImage::where('product_id', $product->id)->get();

        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image_url);
        }

        ProductImage::where('product_id', $product->id)->delete();

        $product->delete();

        return back();
    }
}
