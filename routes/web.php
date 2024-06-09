<?php

use App\Http\Controllers\Dashboard\Admin\UserController as AdminUserController;
use App\Http\Controllers\Dashboard\HomeController as DashboardHomeController;
use App\Http\Controllers\Dashboard\Seller\ProductController as SellerProductController;
use App\Http\Controllers\Dashboard\Seller\OrderController as SellerOrderController;
use App\Http\Controllers\ShopController as SellerShopController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderDiscussionController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShopController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('/');
Route::get('/produk', [HomeController::class, 'product'])->name('produk');
Route::get('/tentang-kami', [HomeController::class, 'about'])->name('tentang-kami');


Route::get('user/change-role', [UserController::class, 'changeRole']);
Route::get('user/change-role?role=seller', [UserController::class, 'changeRole'])->name('change-seller');
Route::middleware('auth')->group(function () {
    Route::put('/order-status/update/{order}', [OrderStatusController::class, 'update'])->name('order-status.update');
    Route::resource('notification', NotificationController::class);
    Route::resource('order-discussion', OrderDiscussionController::class);

    Route::get('/dashboard', [DashboardHomeController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->middleware(['checkUserRole:admin'])->group(function () {
        Route::resource('user', AdminUserController::class);
        Route::get('toggle-status/{user}', [AdminUserController::class, 'toggleStatus'])->name('toggle-status');
    });

    Route::prefix('seller')->name('seller.')->middleware(['checkUserRole:seller'])->group(function () {
        Route::resource('product', SellerProductController::class);
        Route::get('/product/create', [SellerProductController::class, 'create'])->name('product.create');
        Route::resource('order', SellerOrderController::class);
        Route::resource('shop', SellerShopController::class);
        Route::get('/shop/create', [SellerShopController::class, 'create'])->name('shop.create');
    });
});


require __DIR__ . '/auth.php';
