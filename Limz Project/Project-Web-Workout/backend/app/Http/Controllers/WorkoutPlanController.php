<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkoutPlanRequest;
use App\Http\Resources\WorkoutPlanResource;
use App\Models\WorkoutPlan;
use Illuminate\Http\Request;

class WorkoutPlanController extends Controller
{
    public function index(Request $request)
    {
        $plans = $request->user()->workoutPlans()->paginate(10);

        return response()->json([
            "success" => true,
            "message" => "Workout plans retrieved successfully",
            "data" => WorkoutPlanResource::collection($plans),
            "pagination" => [
                "current_page" => $plans->currentPage(),
                "total" => $plans->total(),
                "per_page" => $plans->perPage(),
                "last_page" => $plans->lastPage(),
            ],
        ]);
    }

    public function store(StoreWorkoutPlanRequest $request)
    {
        $plan = $request->user()->workoutPlans()->create([
            "name" => $request->name,
            "is_active" => $request->is_active ?? true,
        ]);

        return response()->json([
            "success" => true,
            "message" => "Workout plan created successfully",
            "data" => new WorkoutPlanResource($plan),
        ], 201);
    }

    public function show($id)
    {
        $plan = WorkoutPlan::with("planDays.planExercises.exercise")->find($id);

        if (!$plan) {
            return response()->json([
                "success" => false,
                "message" => "Workout plan not found",
            ], 404);
        }

        if ($plan->user_id !== auth()->id()) {
            return response()->json([
                "success" => false,
                "message" => "Unauthorized",
            ], 403);
        }

        return response()->json([
            "success" => true,
            "message" => "Workout plan retrieved successfully",
            "data" => new WorkoutPlanResource($plan),
        ]);
    }

    public function update(StoreWorkoutPlanRequest $request, $id)
    {
        $plan = WorkoutPlan::find($id);

        if (!$plan) {
            return response()->json([
                "success" => false,
                "message" => "Workout plan not found",
            ], 404);
        }

        if ($plan->user_id !== auth()->id()) {
            return response()->json([
                "success" => false,
                "message" => "Unauthorized",
            ], 403);
        }

        $plan->update([
            "name" => $request->name,
            "is_active" => $request->is_active ?? $plan->is_active,
        ]);

        return response()->json([
            "success" => true,
            "message" => "Workout plan updated successfully",
            "data" => new WorkoutPlanResource($plan),
        ]);
    }

    public function destroy($id)
    {
        $plan = WorkoutPlan::find($id);

        if (!$plan) {
            return response()->json([
                "success" => false,
                "message" => "Workout plan not found",
            ], 404);
        }

        if ($plan->user_id !== auth()->id()) {
            return response()->json([
                "success" => false,
                "message" => "Unauthorized",
            ], 403);
        }

        $plan->delete();

        return response()->json([
            "success" => true,
            "message" => "Workout plan deleted successfully",
        ]);
    }
}
