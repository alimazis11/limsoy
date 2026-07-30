<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanExerciseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exercise' => new ExerciseResource($this->whenLoaded('exercise')),
            'sets' => $this->sets,
            'reps' => $this->reps,
        ];
    }
}
