<?php

use App\Http\Controllers\Dashboard\Admin\UserController as AdminUserController;
use App\Http\Controllers\Dashboard\HomeController as DashboardHomeController;
use App\Http\Controllers\Dashboard\Seller\ProductController as SellerProductController;
use App\Http\Controllers\ShopController as SellerShopController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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

Route::get('/', [HomeController::class, 'index']);
Route::get('/produk', [HomeController::class, 'product']);
Route::get('/tentang-kami', [HomeController::class, 'about']);


Route::get('user/change-role', [UserController::class, 'changeRole']);
Route::middleware('auth')->group(function () {

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [DashboardHomeController::class, 'index']);

        Route::prefix('admin')->name('admin.')->middleware(['checkUserRole:admin'])->group(function () {
            Route::resource('user', AdminUserController::class);
            Route::get('toggle-status/{user}', [AdminUserController::class, 'toggleStatus'])->name('toggle-status');
        });

        Route::prefix('seller')->name('seller.')->middleware(['checkUserRole:seller'])->group(function () {
            Route::resource('product', SellerProductController::class);
            Route::resource('shop', SellerShopController::class);
        });
    });
});

require __DIR__ . '/auth.php';
