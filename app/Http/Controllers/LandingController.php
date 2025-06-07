<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index(){
        $banners = Banner::where('is_active', true)->get();
        return Inertia::render('landing/home/index', [
            "banners" => $banners
        ]);
    }
}
