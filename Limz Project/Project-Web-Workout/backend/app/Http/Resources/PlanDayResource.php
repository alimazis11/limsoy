<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanDayResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'day_name' => $this->day_name,
            'plan_exercises' => PlanExerciseResource::collection($this->whenLoaded('planExercises')),
        ];
    }
}
