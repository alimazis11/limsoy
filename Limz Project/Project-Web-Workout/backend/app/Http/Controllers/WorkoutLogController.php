<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkoutLogRequest;
use App\Http\Resources\WorkoutLogResource;
use App\Models\WorkoutLog;
use Illuminate\Http\Request;

class WorkoutLogController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->workoutLogs()->with("exercise");

        if ($request->has("from_date") && $request->has("to_date")) {
            $query->whereBetween("date", [$request->from_date, $request->to_date]);
        }

        $logs = $query->paginate(20);

        return response()->json([
            "success" => true,
            "message" => "Workout logs retrieved successfully",
            "data" => WorkoutLogResource::collection($logs),
            "pagination" => [
                "current_page" => $logs->currentPage(),
                "total" => $logs->total(),
                "per_page" => $logs->perPage(),
                "last_page" => $logs->lastPage(),
            ],
        ]);
    }

    public function store(StoreWorkoutLogRequest $request)
    {
        $log = $request->user()->workoutLogs()->create([
            "exercise_id" => $request->exercise_id,
            "weight" => $request->weight,
            "reps" => $request->reps,
            "date" => $request->date,
        ]);

        $log->load("exercise");

        return response()->json([
            "success" => true,
            "message" => "Workout log created successfully",
            "data" => new WorkoutLogResource($log),
        ], 201);
    }
}
