<?php

namespace Database\Factories;

use App\Models\Factory as ModelsFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory class used to generate fake Factory data
 * for database seeding and testing.
 *
 * @extends Factory<Factory>
 */
class FactoryFactory extends Factory
{
    protected $model = ModelsFactory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'factory_name' => $this->faker->company(),
            'location' => $this->faker->city().', '.$this->faker->state(),
            'email' => $this->faker->unique()->companyEmail(),
            'website' => $this->faker->url(),
        ];
    }
}
