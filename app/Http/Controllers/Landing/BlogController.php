<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input($request->pageSize, 10);
        $blogs = Blog::paginate($pageSize);
        return Inertia::render('landing/blogs/index',[
            "blogs" => $blogs
        ]);
    }
}
