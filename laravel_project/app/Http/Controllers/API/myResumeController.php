<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\JobSeeker;
use App\Models\Education;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\User;

class myResumeController extends Controller
{

    public function download_Resume($id)
    {
        $data = User::with('jobseeker', 'usersSkills', 'experience', 'educations', 'certifications', 'extracurriculars')->find($id);
        $data = \Barryvdh\DomPDF\Facade\Pdf::loadView('resume', compact('data'));
        return $data->download('resume.pdf');
    }
}
