<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Profile;
use App\Models\Province;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        
        $rules = [
            'nik' => "required|min:14|unique:profiles",
            'front_title' => 'required|string|max:255',
            'back_title' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' =>  'required|email|unique:users,email',
            'place_birth' => 'required|string|max:255',
            'date_birth' => 'required|date',
            'gender' => 'required|in:male,female',
            'citizenship' => 'required|string|max:255',
            'address' => 'required|string',
            'province_id' => 'required|exists:provinces,id',
            'city_id' => 'required|exists:cities,id',
            'district_id' => 'required|exists:districts,id',
            'phone' => 'required|string|max:20',
            'last_education_nursing' => 'required|string|max:255',
            'last_education' => 'nullable|string|max:255',
            'workplace' => 'required|string|max:255',
            'hope_in' => 'nullable|string|max:1000',
            'contribution' => 'nullable|string|max:1000',
            'is_member_payment' => 'required|in:yes,no',
            'reason_reject' => 'nullable|string|max:1000',
            'photo' => 'required|file|mimes:jpg,jpeg,png|max:2048'
        ];

        if ($request->is_member_payment == 'yes') {
            $rules['member_payment_file'] = 'required|file|mimes:pdf,jpg,jpeg,png|max:2048';
        }else{
            $rules['reason_reject'] = 'required|string|max:1000';
        }

        $validate = $request->validate($rules);
        // dd($validate);

        //         Kode NIA artinya :
        // 23 -> Thn bergabung
        // 18 -> Jawa Barat
        // 13 -> Kab. Bogor
        // 91 - Thn lahir 1991
        // 0007 - urutan cetak KTA ke 7
        $province = Province::find($validate['province_id']);
        $city = City::find($validate['city_id']);
        $sort = User::max('sort') + 1;
        $joinYear =  now()->format('y');

        $yearShort = Carbon::parse($validate['date_birth'])->format('y');
        $sortCard = str_pad($sort, 4, '0', STR_PAD_LEFT);

        $NIA = $joinYear . '.' . $province->code . '.' . $city->id . '.' . $yearShort . '.' . $sortCard;

        DB::beginTransaction();

        try {
            $files = [];

            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('profile', 'public');
                $files['photo'] = Storage::url($photoPath);
            }

            if ($request->hasFile('member_payment_file')) {
                $paymentPath = $request->file('member_payment_file')->store('member/payment', 'public');
                $files['member_payment_file'] = Storage::url($paymentPath);
            }


            $user = User::updateOrCreate(['id' => $request->id], [
                "name" => strtoupper($validate['name']),
                "email" => $validate['email'],
                "password" => bcrypt(Carbon::parse($validate['date_birth'])->format('dmY')),
                "sort" => $sort,
                'nia' => $NIA,
                'status' => 'submission',
                'join_year' => $joinYear,
            ]);


            Profile::updateOrCreate(['user_id' => $user->id], array_merge([
                'nik' => $validate['nik'],
                'place_birth' => $validate['place_birth'],
                'date_birth' => $validate['date_birth'],
                'gender' => $validate['gender'],
                'citizenship' => $validate['citizenship'],
                'address' => $validate['address'],
                'province_id' => $validate['province_id'],
                'city_id' => $validate['city_id'],
                'district_id' => $validate['district_id'],
                'phone' => $validate['phone'],
                'last_education_nursing' => $validate['last_education_nursing'],
                'last_education' => $validate['last_education'],
                'workplace' => $validate['workplace'],
                'hope_in' => $validate['hope_in'],
                'contribution' => $validate['contribution'],
                'is_member_payment' => $validate['is_member_payment']  === 'yes',
                'reason_reject' => $validate['reason_reject'],
                'front_title' => $validate['front_title'],
                'back_title' => $validate['back_title'],
            ], $files));

            $role = Role::findOrCreate('member', 'web');

            $user->assignRole($role);

            DB::commit();

            $message = 'Anggota baru berhasil di tambahkan';

            if ($request->type === 'redirect') {
                return redirect()->route('member.index')->with('success', $message);
            }

            return back()->with('success', $message);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
