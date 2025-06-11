<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Banner;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index(){
        $banners = Banner::where('is_active', true)->get();
        $agendas = Agenda::paginate(10);
        $blogs = Blog::paginate(10);
        return Inertia::render('landing/home/index', [
            "banners" => $banners,
            "blogs" => $blogs,
            "agendas" => $agendas,
        ]);
    }

    public function visiMisi(){
        return Inertia::render('landing/visi-misi/index');
    }
    public function organization(){
        $user = User::where('is_organization', true)
            ->where('is_active', true)
            ->whereNull('parent_id')
            ->with(['children.profile', 'profile'])
            ->get();
        return Inertia::render('landing/organization/index',[
            "users" => $user
        ]);
    }
}
