<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage',10);
        $role = Role::paginate($perPage);
        $users = User::all();

        return Inertia::render('settings/roles/list',[
            "layout" => 'admin',
            "roles" => $role,
            "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "name" => "required",
            "userId" => "array",
            "userId.*" => "numeric|exists:users,id",
        ]);

        $validate['guard_name'] = 'web';

        $role = Role::create($validate);


        if ($request->filled('userId')) {
            User::whereIn('id', $request->userId)
                ->get()
                ->each(fn($user) => $user->assignRole($role));
        }

        return back()->with('success','data berhasil di tambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validate = $request->validate([
            "name" => "required|unique:roles,name,$role->id,id",
            "userId" => "array",
            "userId.*" => "numeric|exists:users,id",
        ]);

        $validate['guard_name'] = 'web';

        $role->update($validate);

        if ($request->filled('userId')) {
            User::whereIn('id', $request->userId)
                ->get()
                ->each(fn($user) => $user->assignRole($role));
        }

        return back()->with('success', 'data berhasil di ubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
