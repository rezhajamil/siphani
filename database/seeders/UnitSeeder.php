<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Piece'
            ],
            [
                'name' => 'Kg'
            ],
            [
                'name' => 'Ton'
            ],
            [
                'name' => 'Box'
            ],
        ];

        foreach ($data as $key => $d) {
            Unit::create($d);
        }
    }
}
