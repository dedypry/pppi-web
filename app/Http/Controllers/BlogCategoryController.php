<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = BlogCategory::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/blogs/category/list', [
            "categories" => $category
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = BlogCategory::where('is_active', true)->get();
        return response()->json($category);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "name" => 'required|unique:blog_categories,name',
            "description" => "string",
        ]);

        if($request->hasFile('icon')){
            $request->validate([
                "icon" => 'required|image|max:2048'
            ]);
            $path = $request->file('icon')->store('blog/category','public');
            $validate['icon'] = Storage::url($path);
        }
        $data = BlogCategory::create($validate);

        return response()->json([
            "success" => true,
            "message" => "Category Berhasil disimpan",
            "data" => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogCategory $blogCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogCategory $category)
    {
        $validate = $request->validate([
            "name" => "required|unique:blog_categories,name," . $category->id . ',id'
        ]);

        $validate['is_active'] = $request->isActive ?? true;

        $category->update($validate);

        return response()->json([
            'message' => 'Kategori berhasil diperbarui.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogCategory $category)
    {
        $blog = Blog::where('category_id', $category->id)->count();

        if ($blog > 0) {
            return response()->json([
                "success" => false,
                "message" => "Data Tidak Bisa di hapus"
            ], 400);
        }

        $category->delete();
        return response()->json([
            "success" => true,
            "message" => "Data Berhasil di hapus"
        ]);
    }
}
