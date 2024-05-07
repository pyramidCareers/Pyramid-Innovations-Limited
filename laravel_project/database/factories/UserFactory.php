<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstname' => fake()->firstName,
            'lastname' => fake()->lastName,
            'email' => fake()->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => fake()->password,
            'phone' => fake()->phoneNumber,
            'user_type' => fake()->randomElement(['admin', 'user']),
            'moodle_userid' => fake()->randomNumber(),
            'moodle_username' => fake()->userName,
            'moodle_password' => fake()->password,
            'moodle_auth_token' => fake()->password,
            'profile_pic' => fake()->imageUrl(),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
