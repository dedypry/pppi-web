<?php

namespace App\Http\Controllers;

use App\Models\SettingApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingAppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $app = SettingApp::pluck('value', 'key',)->toArray();
        return Inertia::render('settings/apps/pages/apps', [
            'layout' => 'admin',
            'app' => $app
        ]);
    }
    public function visi()
    {
        $app = SettingApp::pluck('value', 'key',)->toArray();
        return Inertia::render('settings/apps/pages/visi', [
            'layout' => 'admin',
            'app' => $app
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
        if($request->hasFile('logo')){
            $request->validate([
                'logo' =>  'image|max:2048',
            ]);
            $extension = $request->file('logo')->getClientOriginalExtension();

            $filename = 'logo.' . $extension;

            $path = $request->file('logo')->storeAs('apps',$filename,'public');

            $logoUrl = Storage::url($path);
            SettingApp::updateOrCreate(['key' => 'logo'], ['value' => $logoUrl]);
        }

        foreach ($request->except('logo') as $key => $value) {
            SettingApp::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('success', 'Data Berhasil di Update');
    }

    /**
     * Display the specified resource.
     */
    public function show(SettingApp $settingApp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SettingApp $settingApp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SettingApp $settingApp)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SettingApp $settingApp)
    {
        //
    }
}
