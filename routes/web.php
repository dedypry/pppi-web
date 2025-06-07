<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('home');

Route::get('/province', [ProvinceController::class, 'index'])->name('province');
Route::get('/city/{id}', [ProvinceController::class, 'getCity'])->name('city');
Route::get('/district/{id}', [ProvinceController::class, 'getDistrict'])->name('district');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            "layout" => 'admin'
        ]);
    })->name('dashboard');

    Route::post('upload-file', [FileController::class, 'store'])->name('file.store');

    Route::group(["prefix" => "settings", "middleware" => ["role:super_admin|admin"]], function () {
        Route::delete('banners/bulk', [BannerController::class, 'bulkDelete'])->name('banner.bulk.delete');
        Route::resource('banners', BannerController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('roles', RoleController::class);
    });

    Route::group(["prefix" => "admin"], function () {
        Route::get('member/kta/{user}', [MemberController::class, 'generateKta'])->name('member.kta');
        Route::resource('member', MemberController::class);

        Route::resource('blogs/category', BlogCategoryController::class);
        Route::resource('blogs/comments', BlogCommentController::class);
        Route::resource('blogs', BlogController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
