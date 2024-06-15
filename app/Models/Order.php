<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    // protected $with = ['user', 'product.shop', 'product.category', 'product.images', 'product.tags', 'status', 'discuss'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function status()
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function discuss()
    {
        return $this->hasMany(OrderDiscussion::class);
    }
}
