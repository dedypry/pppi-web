<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('size', 10);
        return Inertia::render('admin/blogs/list', [
            'blogs' => Inertia::defer(fn() => Blog::with(['category', 'writer'])->orderBy('id','asc')->paginate($perPage, page: $page))->deepMerge(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/blogs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'isDraft' => 'boolean',
            'categoryId' => 'required|exists:blog_categories,id',
            'schedule' => 'nullable|date',
        ]);

        if ($request->hasFile('cover')) {
            $request->validate([
                'cover' =>  'nullable|image|max:2048',
            ]);

            $path = $request->file('cover')->store('blog/covers', 'public');
            $validated['cover'] = Storage::url($path);
        }else{
            $validated['cover'] = $request->cover;
        }

        $payload = [
            'cover' => $validated['cover'] ?? null,
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'content' => $validated['content'],
            'status' => $validated['isDraft'] ? "draft" : "submission",
            'category_id' => $validated['categoryId'],
            'schedule' => $validated['schedule'],
            'tags' => isset($validated['tags']) ? json_encode($validated['tags']) : null,
            'writer_id' => Auth::user()->id
        ];

        if($request->id){
            Blog::where('id', $request->id)->update($payload);
        }else{
            Blog::create($payload);
        }

        return redirect()->route('blogs.index')->with('success', 'data berhasil disimpan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('admin/blogs/create', [
            "blog" => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {

        $validated = $request->validate([
            "status" => "required|in:publish,draft,reject,submission"
        ]);

        if($validated['status'] == 'publish'){
            $validated['publish_at'] = now();
        }

        $blog->update($validated);
        return back()->with('success', 'Blog berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->cover) {
            if (Storage::disk('public')->exists($blog->cover)) {
                Storage::disk('public')->delete($blog->cover);
            }
        }
        $blog->delete();
        return back()->with('success', 'Blog berhasil dihapus.');
    }
}
