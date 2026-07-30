<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = [
            ['name' => 'Bench Press', 'muscle_group' => 'Chest', 'type' => 'weight'],
            ['name' => 'Incline Bench Press', 'muscle_group' => 'Chest', 'type' => 'weight'],
            ['name' => 'Dumbbell Flyes', 'muscle_group' => 'Chest', 'type' => 'weight'],
            ['name' => 'Push-ups', 'muscle_group' => 'Chest', 'type' => 'weight'],
            ['name' => 'Cable Chest Press', 'muscle_group' => 'Chest', 'type' => 'weight'],
            ['name' => 'Barbell Squats', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Leg Press', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Leg Curls', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Leg Extensions', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Romanian Deadlifts', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Lunges', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Calf Raises', 'muscle_group' => 'Legs', 'type' => 'weight'],
            ['name' => 'Deadlifts', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Pull-ups', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Bent Over Rows', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Lat Pulldowns', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Face Pulls', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Dumbbell Rows', 'muscle_group' => 'Back', 'type' => 'weight'],
            ['name' => 'Barbell Curls', 'muscle_group' => 'Arms', 'type' => 'weight'],
            ['name' => 'Dumbbell Curls', 'muscle_group' => 'Arms', 'type' => 'weight'],
            ['name' => 'Tricep Dips', 'muscle_group' => 'Arms', 'type' => 'weight'],
            ['name' => 'Tricep Pushdowns', 'muscle_group' => 'Arms', 'type' => 'weight'],
            ['name' => 'Overhead Press', 'muscle_group' => 'Shoulders', 'type' => 'weight'],
            ['name' => 'Lateral Raises', 'muscle_group' => 'Shoulders', 'type' => 'weight'],
            ['name' => 'Shoulder Shrugs', 'muscle_group' => 'Shoulders', 'type' => 'weight'],
            ['name' => 'Machine Shoulder Press', 'muscle_group' => 'Shoulders', 'type' => 'weight'],
            ['name' => 'Treadmill', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Stationary Bike', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Rowing Machine', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Elliptical', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Jump Rope', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Burpees', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Mountain Climbers', 'muscle_group' => 'Cardio', 'type' => 'cardio'],
            ['name' => 'Plank', 'muscle_group' => 'Core', 'type' => 'weight'],
            ['name' => 'Ab Crunches', 'muscle_group' => 'Core', 'type' => 'weight'],
            ['name' => 'Russian Twists', 'muscle_group' => 'Core', 'type' => 'weight'],
            ['name' => 'Hanging Leg Raises', 'muscle_group' => 'Core', 'type' => 'weight'],
        ];

        foreach ($exercises as $exercise) {
            Exercise::create($exercise);
        }
    }
}