<?php

use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/member/dashboard', [DashboardController::class, 'index'])->name('member.dashboard');
});
