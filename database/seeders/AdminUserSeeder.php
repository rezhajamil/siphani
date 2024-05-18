<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'phone' => '081234567890',
            'address' => 'Medan',
            'email' => 'admin@siphani.com',
            'password' => bcrypt('123')
        ]);
    }
}
