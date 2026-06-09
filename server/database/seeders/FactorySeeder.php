<?php

namespace Database\Seeders;

use App\Models\Factory;
use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Factory::factory(20)->create();
    }
}
