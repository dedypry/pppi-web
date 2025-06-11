<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10); // Default 10
        $blogs = Blog::with('writer')->paginate($pageSize);
        $categories = BlogCategory::withCount('blogs')->get();
        return Inertia::render('landing/blogs/index', [
            "blogs" => $blogs,
            "categories" => $categories
        ]);
    }

    public function detail($id)
    {
        $tags = Blog::pluck('tags')->flatten()->unique()->values();

        $blogs = Blog::with(['writer', 'category', 'comments.user']);
        $categories = BlogCategory::withCount('blogs')->get();
        return Inertia::render('landing/blogs/detail', [
            "blog" => $blogs->find($id),
            "categories" => $categories,
            'tags' => $tags
        ]);
    }

    public function blogComment(Request $request, $id)
    {
        $userId = optional(Auth::user())->id;
        $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|email",
            "content" => "required|string",
        ]);

        try {
            BlogComment::create([
                "user_id" => $userId,
                "name" => $request->name,
                "email" => $request->email,
                "content" => $request->content,
                "website" => $request->website,
                "blog_id" => $id,
                "parent_id" => $request->parent_id
            ]);
            return back()->with('success', 'Komentar berhasil di kirim');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }


    }
}
