<?php

use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Member\DocumentController;
use App\Http\Controllers\Member\ProfileController;
use App\Http\Controllers\Member\SettingController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "member", "middleware" => ['ensure.role.member', 'verified', "role:member",]], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('member.dashboard');
    Route::get('/profile', [ProfileController::class, 'index'])->name('member.dashboard');
    Route::get('/setting', [SettingController::class, 'index'])->name('member.dashboard');
    Route::get('/document', [DocumentController::class, 'index'])->name('member.dashboard');
});
