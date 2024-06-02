<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Segar'
            ],
            [
                'name' => 'Terbaik'
            ],
            [
                'name' => 'Enak'
            ],
        ];

        foreach ($data as $key => $d) {
            Tag::create($d);
        }
    }
}
