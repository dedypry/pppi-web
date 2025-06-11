<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogCommentController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OrganizedController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingAppController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('home');

Route::get('/province', [ProvinceController::class, 'index'])->name('province');
Route::get('/city/{id}', [ProvinceController::class, 'getCity'])->name('city');
Route::get('/district/{id}', [ProvinceController::class, 'getDistrict'])->name('district');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class,'index'])->name('dashboard');

    Route::post('upload-file', [FileController::class, 'store'])->name('file.store');

    Route::group(["prefix" => "settings", "middleware" => ["role:super_admin|admin"]], function () {
        Route::delete('banners/bulk', [BannerController::class, 'bulkDelete'])->name('banner.bulk.delete');
        Route::resource('banners', BannerController::class)->only(['index', 'store', 'update', 'destroy']);
        Route::resource('roles', RoleController::class);
        Route::get('apps/visi', [SettingAppController::class, 'visi'])->name('apps.visi');
        Route::resource('apps', SettingAppController::class);
        Route::resource('department', DepartmentController::class);

        Route::group(['prefix' => 'regions'], function () {
            Route::get('', [RegionController::class, 'index'])->name('region.index');
            Route::patch('{province}', [RegionController::class, 'updateProvince'])->name('province.update');
            Route::get('city', [RegionController::class, 'city'])->name('region.city');
            Route::post('city', [RegionController::class, 'bulkUpdateCity'])->name('city.bulk.update');
            Route::patch('city/{city}', [RegionController::class, 'updateCity'])->name('city.update');
            Route::get('district', [RegionController::class, 'district'])->name('region.district');
            Route::patch('district/{district}', [RegionController::class, 'updateDistrict'])->name('district.update');
        });
        Route::group(['prefix' => 'user-management'], function () {
            Route::get('', [UserManagementController::class, 'index'])->name('user.management.index');
            Route::post('', [UserManagementController::class, 'store'])->name('user.management.store');
            Route::post('member', [UserManagementController::class, 'member'])->name('user.management.member');
            Route::patch('{user}', [UserManagementController::class, 'dropOut'])->name('user.management.dropout');
        });
    });

    Route::group(["prefix" => "admin", "middleware" => ["role:super_admin|admin"]], function () {
        Route::get('member/kta/{user}', [MemberController::class, 'generateKta'])->name('member.kta');
        Route::resource('member', MemberController::class);

        Route::resource('blogs/category', BlogCategoryController::class);
        Route::resource('blogs/comments', BlogCommentController::class);
        Route::resource('blogs', BlogController::class);
        Route::group(['prefix' => 'organization'], function () {
            Route::get('', [OrganizedController::class, 'index'])->name('organization.index');
        });
        Route::group(['prefix' => 'agenda'], function () {
            Route::get('', [AgendaController::class, 'index'])->name('agenda.index');
            Route::post('', [AgendaController::class, 'store'])->name('agenda.store');
            Route::delete('{agenda}', [AgendaController::class, 'destroy'])->name('agenda.destroy');
            Route::patch('{agenda}', [AgendaController::class, 'update'])->name('agenda.update');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
