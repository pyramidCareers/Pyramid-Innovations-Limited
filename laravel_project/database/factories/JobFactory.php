<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employer_user_id' => function () {
                return User::factory()->create()->id;
            },
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'requirement_details' => $this->faker->paragraph,
            'additional_requirements' => $this->faker->paragraph,
            'responsibilities' => $this->faker->paragraph,
            'salary_lower_limit' => $this->faker->randomDigit,
            'salary_upper_limit' => $this->faker->randomDigit,
            'currency' => $this->faker->currencyCode,
            'other_benefits' => $this->faker->paragraph,
            'location' => $this->faker->city,
            'category' => $this->faker->word,
            'created_by' => $this->faker->randomDigit,
            'job_type' => $this->faker->word,
            'experience_level' => $this->faker->word,
            'experience_lower_limit' => $this->faker->randomDigit,
            'experience_upper_limit' => $this->faker->randomDigit,
            'company_site_link' => $this->faker->url,
            'published' => $this->faker->boolean,
        ];
    }
}
