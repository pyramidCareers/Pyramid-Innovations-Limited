<?php

namespace App\Http\Middleware;

use App\Http\Controllers\API\BaseController as APIBaseController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController;
class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::user()->user_type !== 'admin') {
            // return (new BaseController)->sendErrorResponse('Failed to create user', false, 403, 'You do not have the permission for this action');
            abort('403', 'Unauthorized');
        }

        return $next($request);
    }
}
