<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizedController extends Controller
{
    public function index()
    {
        $user = User::where('is_organization', true)
            ->where('is_active', true)
            ->whereNull('parent_id')
            ->with(['children.profile','profile'])
            ->get();
        return Inertia::render('admin/organization/index', [
            'users' => $user
        ]);
    }
}
