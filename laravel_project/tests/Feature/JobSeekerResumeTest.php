<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JobSeekerResumeTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {

        $this->getJson(route('jobseeker.resume',['id'=>3]));
    }
}
