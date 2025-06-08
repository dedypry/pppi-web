<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('is_organization', true)
            ->with(['roles', 'superior'])
            ->paginate(10);

        return Inertia::render('admin/user-management/list', [
            'users' => $users, // PASTIKAN ini hasil akhir query
            'superiors' => User::select('id', 'name')->where('is_organization', true)->get()
        ]);
    }
}
