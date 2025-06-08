<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $department = Department::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('settings/department/list', [
            'layout' => 'admin',
            'department' => $department
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
            'name'=> "required|string|min:3",
            "description" => "nullable|string"
        ]);

        Department::create($validate);

        return back()->with('success','Department Berhasil DItambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $validate = $request->validate([
            'name' => "required|string|min:3",
            "description" => "nullable|string"
        ]);

        $department->update($validate);

        return back()->with('success','Data berhasil di perbaharui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $count = $department->user()->count();

        if($count > 0) {
            return back()->with('error','Masih Ada Pengguna Yang memakai dept ini');
        }

        $department->delete();

        return back()->with('success','Department Berhasil dihapus');
    }
}
