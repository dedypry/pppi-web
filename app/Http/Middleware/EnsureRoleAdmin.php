<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureRoleAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if(!$user){
            return redirect('/');
        }

        if ($user && (!$user->hasRole('admin') || !$user->hasRole('super_admin')) && $user->hasRole('member')) {
            return redirect('/member/dashboard');
        }


        return $next($request);
    }
}
