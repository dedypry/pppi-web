<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegionController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $provinces = Province::orderBy('name', 'asc');

        if ($request->search) {
            $provinces = $provinces->where('name', 'like', "%$request->search%")
                ->orWhere('code', 'like', "%$request->search%");
        }
        return Inertia::render('settings/regions/tabs/province', [
            "layout" => 'admin',
            "provinces" => $provinces->paginate($pageSize)
        ]);
    }

    public function city(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $city = City::orderBy('name', 'asc');
        if ($request->search) {
            $city = $city->where('name', 'like', "%$request->search%")
                ->orWhere('code', 'like', "%$request->search%");
        }
        return Inertia::render('settings/regions/tabs/city', [
            "layout" => 'admin',
            "cities" => $city->paginate($pageSize)
        ]);
    }
    public function district(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $district = District::with('city.province')->orderBy('name', 'asc');
        $search = $request->search;

        $district = $district->where(function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhereHas('city', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('province', function ($qq) use ($search) {
                            $qq->where('name', 'like', "%{$search}%");
                        });
                });
        });
        return Inertia::render('settings/regions/tabs/district', [
            "layout" => 'admin',
            "district" => $district->paginate($pageSize)
        ]);
    }

    public function updateProvince(Request $request, Province $province)
    {
        $province->update([
            "code" => $request->code,
        ]);

        return back();
    }
    public function updateCity(Request $request, City $city)
    {
        $city->update([
            "code" => $request->code,
        ]);

        return back();
    }
    public function bulkUpdateCity(Request $request)
    {
        $request->validate([
            'code' => "required",
            'ids' => 'array',
            "ids.*" => 'required'
        ]);

        City::whereIn('id', $request->ids)->update([
            'code' => $request->code
        ]);

        return back();
    }
    public function updateDistrict(Request $request, District $district)
    {
        $district->update([
            "code" => $request->code,
        ]);

        return back();
    }
}
