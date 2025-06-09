<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('is_organization', true)
            ->with(['roles', 'superior', 'department'])
            ->orderBy('id', 'asc')
            ->paginate(10);

        return Inertia::render('admin/user-management/list', [
            'users' => $users,
            'superiors' => User::select('id', 'name')->where('is_organization', true)->where('is_active', true)->get(),
            'department' => Department::select('id', 'name')->get(),
            'roles' => Role::select('id', 'name')->get(),
            'members' => User::select('id', 'name', 'nia')->with('profile')->where('is_organization', false)->where('is_active', true)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validate = [
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,$request->id",
            'job_title' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:users,id',
            'role_id' => 'required',
            'department_id' => 'required|exists:departments,id',

        ];

        if (!$request->id || $request->password) {
            $validate['password'] = 'required|string|min:6';
        }

        $validate = $request->validate($validate);

        $validate['is_organization'] = true;
        $validate['is_active'] = true;

        if (!empty($validate['password'])) {
            $validate['password'] = bcrypt($validate['password']);
        }

        $user = User::UpdateOrCreate(["id" => $request->id], $validate);

        if (count($validate['role_id']) > 0) {
            foreach ($validate['role_id'] as $roleId) {
                $user->assignRole(Role::find($roleId));
            }
        }

        return back()->with('success', 'Data User Berhasil ditambahkan');
    }

    public function member(Request $request)
    {
        $validate = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
            'job_title' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:users,id',
            'role_id' => 'required|array',
            'role_id.*' => 'exists:roles,id',
            'department_id' => 'required|exists:departments,id',

        ]);
        $roleNames = Role::whereIn('id', $validate['role_id'])->pluck('name')->toArray();

        foreach ($validate['user_ids'] as $userId) {
            $user = User::find($userId);
            $user->update([
                'job_title' => $validate['job_title'],
                'parent_id' => $validate['parent_id'],
                'department_id' => $validate['department_id'],
                'is_organization' => true,
                'is_active' => true,
            ]);

            $user->syncRoles($roleNames);
        }

        return back()->with('success', 'Anggota berhasil diperbarui dan role ditetapkan.');
    }

    public function dropOut(User $user){
        $user->update([
            'is_organization' => false,
        ]);

        return back()->with('success','Anggota dikeluarkan');
    }
}
