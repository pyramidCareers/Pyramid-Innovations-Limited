<?php

namespace Tests\Feature;

use App\Models\FavoriteJobs;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Job;
use App\Models\User;

class Favorite_jobs_Test extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_user_can_have_favorite_jobs(): void
    {
        $job = Job::factory()->create();
        $user = User::factory()->create();

        $this->postJson(route('jobs.favorite', ['id' => $job->id]), ['job_id' => $job->id, 'user_id' => $user->id, 'is_favorite' => 0])->assertSuccessful()->json();
        $this->assertDatabaseHas('favorite_jobs', ['user_id' => $user->id, 'is_favorite' => 0]);
    }

    public function test_get_all_favorite_jobs()
    {
        $job = Job::factory()->create();
        $user = User::factory()->create();

        $this->postJson(route('jobs.favorite', ['id' => $job->id]), ['user_id' => $user->id, 'is_favorite' => 1])->assertSuccessful()->json();
        $res = $this->getJson(route('getAllFavorite', ['id' => $user->id]))->assertOk()->json();

        $data = $this->assertDatabaseHas('favorite_jobs', ['user_id' => $user->id]);
        $this->assertEquals(3, count($res));
        $this->assertEquals(count($res['data']), count($data));
    }
}
