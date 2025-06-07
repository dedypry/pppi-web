<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::orderBy('id','desc')->get();
        return Inertia::render('settings/banners/index',[
            "layout" => 'admin',
            "banners" => $banners
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'required|image|max:2048',
        ]);

        $storedBanners = [];

        foreach ($request->file('images') as $image) {
            $path = $image->store('banners', 'public');

            $banner = Banner::create([
                'url' => Storage::url($path), // Generates URL like /storage/banners/xxxxx.jpg
                'size' => $image->getSize(), // in bytes
                'type' => $image->getClientMimeType(), // e.g. image/jpeg
            ]);

            $storedBanners[] = $banner;
        }

        return back()->with("success",'data berhasil disimpan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        $banner->update([
            'is_active' =>  $request->val
        ]);

        return response()->json(["success" => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $relativePath = str_replace('/storage/', '', $banner->url);
        if($banner->url && Storage::exists($relativePath)){
            Storage::delete($relativePath);
        }

        $banner->delete();

        return back()->with('success','Data berhasil di Hapus');
    }

    public function bulkDelete(Request $request){
        $ids = $request->input('ids');
        if (!is_array($ids) || empty($ids)) {
            return redirect()->back()->with('error', 'Tidak ada banner yang dipilih');
        }

        $banners = Banner::whereIn('id', $ids)->get();

        foreach ($banners as $banner) {
            $relativePath = str_replace('/storage/', '', $banner->url);
            if ($banner->url && Storage::disk('public')->exists($relativePath)) {
                Storage::disk('public')->delete($relativePath);
            }
            $banner->delete();
        }

        return back()->with('success', 'Banner berhasil dihapus semua');
    }
}
