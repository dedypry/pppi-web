<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = User::with(['profile.province', 'profile.city', 'profile.district', 'roles','department'])->find(Auth::user()->id);
        return Inertia::render('my-profile/index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            "layout" => 'admin',
            'user' => $user,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = User::find(Auth::user()->id);


        $request->validate([
            'front_title' => ['nullable', 'string', 'max:50'],
            'back_title' => ['nullable', 'string', 'max:50'],
            'nik' => [
                'required',
                'digits:16',
                Rule::unique('profiles', 'nik')->ignore(optional($user->profile)->id),
            ],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id),],
            'place_birth' => ['required', 'string', 'max:100'],
            'date_birth' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'citizenship' => ['required', 'in:wni,wna'],
            'address' => ['required', 'string'],
            'province_id' => ['required', 'integer', 'exists:provinces,id'],
            'city_id' => ['required', 'integer', 'exists:cities,id'],
            'district_id' => ['required', 'integer', 'exists:districts,id'],
            'phone' => ['required', 'string', 'regex:/^[0-9\+\-\s\(\)]{10,20}$/'],
            'last_education_nursing' => ['required', 'string'],
            'last_education' => ['nullable', 'string'],
            'workplace' => ['required', 'string'],
        ]);

        $user->update($request->only(['name', 'email']));

        $user->profile()->updateOrCreate(['user_id'=> $user->id],$request->except(['name', 'email']));

        return back()->with('success','Data berhasil di update');
    }

    public function updatePhoto(Request $request){
        $user = User::find(Auth::user()->id);
        if($request->hasFile('file')){
            $request->validate([
                'file' => 'image|max:2048'
            ]);
            $file = $request->file('file');

            $ext = $file->getClientOriginalExtension();

            $photoPath = $request->file('file')->storeAs('profile',"profile-$user->id.$ext" ,'public');

            $user->profile()->updateOrCreate(['user_id' => $user->id],["photo" => Storage::url($photoPath)]);
        }

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
