<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['plan_day_id', 'exercise_id', 'sets', 'reps'])]
class PlanExercise extends Model
{
    use HasFactory;

    public function planDay(): BelongsTo
    {
        return $this->belongsTo(PlanDay::class);
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
