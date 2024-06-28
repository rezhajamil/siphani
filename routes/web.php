<?php

use App\Http\Controllers\Dashboard\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Dashboard\Admin\UserController as AdminUserController;
use App\Http\Controllers\Dashboard\Admin\UnitController as AdminUnitController;
use App\Http\Controllers\Dashboard\Admin\TagController as AdminTagController;
use App\Http\Controllers\Dashboard\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Dashboard\Admin\DashboardController;
use App\Http\Controllers\HomeController as DashboardHomeController;
use App\Http\Controllers\Dashboard\Seller\ProductController as SellerProductController;
use App\Http\Controllers\Dashboard\Seller\OrderController as SellerOrderController;
use App\Http\Controllers\Dashboard\Seller\ShopController as SellerShopController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDiscussionController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\ProductController;
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

Route::get('user/change-role', [UserController::class, 'changeRole'])->name('change-role');

Route::resource('shop', ShopController::class);



Route::middleware('auth')->group(function () {
    Route::patch('/order-status/update/{order}', [OrderStatusController::class, 'update'])->name('order-status.update');
    Route::resource('notification', NotificationController::class);
    Route::get('/notification/read-notif', [NotificationController::class, 'readNotif'])->name('notification.read-notif');
    Route::resource('order-discussion', OrderDiscussionController::class);

    Route::get('order', [OrderController::class, 'index'])->name('order.index');
    Route::get('order/{product}/create', [OrderController::class, 'create'])->name('order.create');
    Route::post('order/store', [OrderController::class, 'store'])->name('order.store');
    Route::get('order/{order}', [OrderController::class, 'show'])->name('order.show');
    Route::put('order/upload-proof', [OrderController::class, 'uploadProof'])->name('order.uploadProof');

    Route::get('/dashboard', [DashboardHomeController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->middleware(['checkUserRole:admin'])->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::resource('category', AdminCategoryController::class);
        Route::resource('user', AdminUserController::class);
        Route::resource('unit', AdminUnitController::class);
        Route::resource('tag', AdminTagController::class);
        Route::get('toggle-status/{user}', [AdminUserController::class, 'toggleStatus'])->name('toggle-status');
    });

    Route::prefix('seller')->name('seller.')->middleware(['checkUserRole:seller'])->group(function () {
        Route::resource('order', SellerOrderController::class);
        Route::resource('shop', SellerShopController::class);
        Route::get('/shop/create', [SellerShopController::class, 'create'])->name('shop.create');
        Route::resource('product', SellerProductController::class);
        Route::get('/product/create', [SellerProductController::class, 'create'])->name('product.create');
        Route::get('/product/edit/{id}', [SellerProductController::class, 'edit'])->name('product.edit');
    });
});


require __DIR__ . '/auth.php';
