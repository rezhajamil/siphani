<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1, // Assuming user IDs range from 1 to 100
            'name' => $this->faker->company,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->optional()->companyEmail,
            'address' => $this->faker->address,
            'maps' => $this->faker->optional()->latitude($min = -90, $max = 90) . ', ' . $this->faker->optional()->longitude($min = -180, $max = 180),
            'avatar' => $this->faker->optional()->imageUrl(640, 480, 'business'),
            'description' => $this->faker->optional()->realText(200),
        ];
    }
}
