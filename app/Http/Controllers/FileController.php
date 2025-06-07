<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "file" => 'required|max:2048'
        ]);

        $file = $request->file('file');
        if ($file) {
            $path = $file->store('blogs', 'public');

           $fileData = File::create([
                "url" => Storage::url($path),
                'name' => $file->getClientOriginalName(),
                "model" => File::class,
                "type" => $file->getClientMimeType(),
                "size" => $file->getSize()
            ]);
        }

        return response()->json([
            "success" => true,
            "url" => $fileData->url,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
