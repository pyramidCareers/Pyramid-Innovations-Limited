<?php

namespace App\Services;

use App\Models\Certification;
use App\Models\JobApplication;
use App\Models\JobSeeker;
use App\Models\User;

class JobApplicationFilter
{

    public function jobApplication_Filter($request, $id = null)
    {
        try {

            $shortlisted = $request->shortlisted;
            $institution = $request->institution;
            $speciality = $request->speciality;
            $field_of_study = $request->field_of_study;
            $certificate_name = $request->certificate_name;
            $issuing_organization = $request->issuing_organization;
            $gender = $request->gender;
            $experience = $request->experience;
            $commonArrays = [];

            $shortlistedUsers = $institutionUser = $specialityUser = $field_of_study_user = $certificate_name_user = $issuing_organization_user = $user_gender = $user_experience = [];
            if ($shortlisted != null) {
                $shortlistedUsers = $this->getShortlistedUsers($shortlisted,$id);
                array_push($commonArrays, $shortlistedUsers);
            }
            if ($institution) {
                $institutionUser = $this->getInstitutionUsers($institution);
                array_push($commonArrays, $institutionUser);
            }
            if ($speciality) {
                $specialityUser = $this->getSpecialtyUsers($speciality);
                array_push($commonArrays, $specialityUser);
            }
            if ($field_of_study) {
                $field_of_study_user = $this->getFieldOfStudyUsers($field_of_study);
                array_push($commonArrays, $field_of_study_user);
            }
            if ($certificate_name) {
                $certificate_name_user = $this->getCertificateUsers($certificate_name);
                array_push($commonArrays, $certificate_name_user);
            }
            if ($issuing_organization) {
                $issuing_organization_user = $this->getIssuingOrganizationUsers($issuing_organization);
                array_push($commonArrays, $issuing_organization_user);
            }
            if ($gender) {
                $user_gender = $this->getUserByGender($gender);
                array_push($commonArrays, $user_gender);
            }
            if ($experience) {
                $user_experience = $this->getUserByExperience($experience);
                array_push($commonArrays, $user_experience);
            }

            if ($commonArrays) {
                // Get common elements from non-blank arrays
                $commonElements = call_user_func_array('array_intersect', $commonArrays);
                return $commonElements;
            }

        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getShortlistedUsers($shortlisted, $id=null)
    {

        $results = JobApplication::where(function ($query) use ($shortlisted, $id) {
            if ($shortlisted == 0) {
                $query->where('shortlisted', 0)->where('job_id', $id);
            } else {
                $query->where('shortlisted', '>=', $shortlisted)->where('job_id', $id);
            }
        })
            ->pluck('user_id')
            ->toArray();
        return $results;
    }
    public function getInstitutionUsers($institution)
    {
        $results = \DB::select("
                            SELECT js.user_id
                            FROM job_seekers js
                             JOIN education e ON js.user_id = e.user_id
                               WHERE e.institution LIKE ?", ["%" . $institution . "%"]);
        $userIds = [];
        foreach ($results as $item) {
            $userIds[] = $item->user_id;
        }
        return $userIds;
    }
    public function getSpecialtyUsers($speciality)
    {
        $results = JobSeeker::where('speciality', 'like', '%' . $speciality . '%')
            ->pluck('user_id')
            ->toArray();
        return $results;
    }
    public function getFieldOfStudyUsers($field_of_study)
    {
        $results = JobSeeker::where('field_of_study', 'like', '%' . $field_of_study . '%')
            ->pluck('user_id')
            ->toArray();
        return $results;
    }
    public function getCertificateUsers($certificate_name)
    {
        $results = Certification::where('certificate_name', 'LIKE', '%' . $certificate_name . '%')->pluck('user_id')->toArray();

        return $results;
    }
    public function getIssuingOrganizationUsers($issuing_organization)
    {
        $results = Certification::where('issuing_organization', 'LIKE', '%' . $issuing_organization . '%')->pluck('user_id')->toArray();
        return $results;
    }

    public function getUserByGender($gender)
    {
        $results = User::where('gender', $gender)->pluck('id')
            ->toArray();
        return $results;
    }

    public function getUserByExperience($experience)
    {
        $results = JobSeeker::where('years_of_experience', '>=', (int) $experience)->pluck('user_id')->toArray();
        return $results;
    }
}