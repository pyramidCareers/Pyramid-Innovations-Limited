<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate();

        return $this->sendResponse($users, 'Users retrieved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);

            if(!$user)
            {
                return $this->sendError($user, 'User not found.', 404);
            }
            return $this->sendResponse($user, 'User retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('User not found.', [], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if(!$user) {
            return $this->sendError('User not found');
        }

        // Custom validation.
        if($request->email || 
            $request->password || 
            $request->moodle_userid ||
            $request->moodle_password ||
            $request->moodle_auth_token) {
            return $this->sendError('Guarded fields cannot be updated');
        }

        $user->update($request->all());

        if ($request->hasFile('profile_pic')) {
            $profilePic = $request->file('profile_pic');

            // Generate a unique file name
            $fileName = time() . '_' . $id . '_'. $profilePic->getClientOriginalName();
            // Store the file in the storage/app/public directory
            $profilePic->storeAs('public', $fileName);
            // Update the user's profile picture field
            $user->profile_pic = $fileName;
            $user->save();

        }

        return $this->sendResponse($user, 'User updated successfully.');
    }

    public function getUserByName(Request $request) {
        $keyword = $request->keyword;
        $users = User::where('firstname', 'like', '%' . $keyword . '%')
                ->orWhere('lastname', 'like', '%' . $keyword . '%')
                ->paginate();
        return $this->sendResponse($users, 'Users retrieved successfully.');
    }

}
