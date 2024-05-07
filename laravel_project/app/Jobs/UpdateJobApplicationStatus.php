<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\JobApplicationService;

class UpdateJobApplicationStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $jobId;
    protected $jobApplicationService;

    /**
     * Create a new job instance.
     */
    public function __construct($jobId)
    {
        $this->jobId = $jobId;
        $this->jobApplicationService = new JobApplicationService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->jobApplicationService->updateAllApplicationStatusInfo($this->jobId);
    }
}
