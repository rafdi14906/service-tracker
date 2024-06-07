<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@service-tracker.com',
            'password' => bcrypt('admin'),
            'role_id' => 1,
        ]);
        User::factory(20)->create();
    }
}
