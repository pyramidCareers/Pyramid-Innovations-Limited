<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection,WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function __construct($userIds)
    {
        $this->userIds = $userIds;
    }
    public function collection()
    {
        $UserData=User::whereIn('id', $this->userIds)->get(['id', 'firstname', 'lastname', 'email']);
        
        $UserData->map(function ($user) {
            $user->profilelink = env('FRONTEND_LINK').'/jobseeker/'.$user->id.'/profile';
            return $user;
        });
      return $UserData;
    }

    public function headings(): array
    {
        return [
            'id', 'firstname', 'lastname', 'email','profile Link'
        ];
    }

}