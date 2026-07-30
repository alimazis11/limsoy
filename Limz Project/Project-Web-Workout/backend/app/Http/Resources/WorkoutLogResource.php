<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exercise' => new ExerciseResource($this->whenLoaded('exercise')),
            'weight' => $this->weight,
            'reps' => $this->reps,
            'date' => $this->date,
        ];
    }
}
