<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Menunggu Konfirmasi'
            ],
            [
                'name' => 'Menunggu Pembayaran'
            ],
            [
                'name' => 'Pembayaran Ditolak'
            ],
            [
                'name' => 'Pesanan Diproses'
            ],
            [
                'name' => 'Pesanan Dikirim'
            ],
            [
                'name' => 'Pesanan Selesai'
            ],
            [
                'name' => 'Pesanan Dibatalkan'
            ],
        ];

        foreach ($data as $key => $d) {
            OrderStatus::create($d);
        }
    }
}
