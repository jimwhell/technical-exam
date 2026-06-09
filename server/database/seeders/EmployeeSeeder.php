<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    // TODO: Fix employee seeder not being detected when running seeds.

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::factory(40)->create();
    }
}
