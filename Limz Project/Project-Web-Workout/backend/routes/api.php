<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('workout-plans', \App\Http\Controllers\WorkoutPlanController::class);
    Route::apiResource('exercises', \App\Http\Controllers\ExerciseController::class)->only(['index', 'show']);
    Route::apiResource('workout-logs', \App\Http\Controllers\WorkoutLogController::class)->only(['store', 'index']);
});
