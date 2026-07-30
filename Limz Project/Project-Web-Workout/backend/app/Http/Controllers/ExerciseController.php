<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::paginate(20);

        return response()->json([
            "success" => true,
            "message" => "Exercises retrieved successfully",
            "data" => ExerciseResource::collection($exercises),
            "pagination" => [
                "current_page" => $exercises->currentPage(),
                "total" => $exercises->total(),
                "per_page" => $exercises->perPage(),
                "last_page" => $exercises->lastPage(),
            ],
        ]);
    }

    public function show($id)
    {
        $exercise = Exercise::find($id);

        if (!$exercise) {
            return response()->json([
                "success" => false,
                "message" => "Exercise not found",
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Exercise retrieved successfully",
            "data" => new ExerciseResource($exercise),
        ]);
    }
}
