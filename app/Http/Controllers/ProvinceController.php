<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function index(Request $request){
        $province = Province::all();

        return response()->json($province);
    }

    public function getCity(Request $request){
        $city = City::where('province_id', $request->id)->get();
        return response()->json($city);
    }

    public function getDistrict(Request $request){
        $district = District::where('city_id', $request->id)->get();
        return response()->json($district);
    }
}
