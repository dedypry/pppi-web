<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Profile;
use App\Models\Province;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Validation\Rule;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $user = User::role('member')->with([
            'profile.province',
            'profile.city',
            'profile.district'
        ]);

        if ($search) {
            $user = $user->where('name', 'ilike', "%$search%");
        }
        return Inertia::render('admin/member/list', [
            "users" => $user->paginate($perPage)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sort = User::max('sort');
        return Inertia::render('admin/member/create', [
            'sort' => $sort + 1
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $ID = "";
        $PID = "";
        if ($request->id) {
            $usr = User::find($request->id);
            $ID = $usr->id;
            $PID = $usr->profile->id;
        }
        $validate = $request->validate([
            'nik' => [
                'required',
                'digits:16',
                Rule::unique('profiles', 'nik')->ignore($PID)
            ],
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($ID)
            ],
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
            'sort' => 'required|integer',
            'join_year' => 'required|string',
        ]);
        // dd($validate);

        //         Kode NIA artinya :
        // 23 -> Thn bergabung
        // 18 -> Jawa Barat
        // 13 -> Kab. Bogor
        // 91 - Thn lahir 1991
        // 0007 - urutan cetak KTA ke 7
        $province = Province::find($validate['province_id']);
        $city = City::find($validate['city_id']);

        $yearShort = Carbon::parse($validate['date_birth'])->format('y');
        $sortCard = str_pad($validate['sort'], 4, '0', STR_PAD_LEFT);

        $NIA = $validate['join_year'] . '.' . $province->code . '.' . $city->id . '.' . $yearShort . '.' . $sortCard;

        DB::beginTransaction();

        try {
            $files = [];

            if ($request->hasFile('photo')) {
                $request->validate([
                    'photo' => 'image|max:2048'
                ]);
                $photoPath = $request->file('photo')->store('profile', 'public');
                $files['photo'] = Storage::url($photoPath);
            }

            if ($request->hasFile('member_payment_file')) {
                $request->validate([
                    'member_payment_file' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
                ]);
                $paymentPath = $request->file('member_payment_file')->store('member/payment', 'public');
                $files['member_payment_file'] = Storage::url($paymentPath);
            }


            $user = User::updateOrCreate(['id' => $request->id], [
                "name" => $validate['name'],
                "email" => $validate['email'],
                "password" => bcrypt(Carbon::parse($validate['date_birth'])->format('dmY')),
                "sort" => $validate['sort'],
                "created_by" => Auth::user()->id,
                'nia' => $NIA,
                'status' => 'submission',
                'join_year' => $validate['join_year'],
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
                'is_member_payment' => $validate['is_member_payment'],
                'reason_reject' => $validate['reason_reject']
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with([
            'profile.province',
            'profile.city',
            'profile.district'
        ])->find($id);
        return Inertia::render('admin/member/detail', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $member)
    {
        $user = User::with('profile')->find($member->id);
        return Inertia::render('admin/member/create', [
            'sort' => $member->sort,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $member)
    {
        if ($member->profile && $member->profile->photo) {
            Storage::disk('public')->delete($member->profile->photo);
        }
        if ($member->profile && $member->profile->member_payment_file) {
            Storage::disk('public')->delete($member->profile->member_payment_file);
        }

        $member->profile()->delete();
        $member->delete();

        return back()->with('success', 'data berhasil dihapus');
    }

    public function generateKta(User $user)
    {
        $pdf = Pdf::loadView('pdf.kta', ['user' => $user])->setPaper('a4', 'landscape');
        return $pdf->stream('kta-' . $user->name . '.pdf');
    }
}
