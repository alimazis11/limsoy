export default function ExerciseCard({ exercise, onSelect }) {
  return (
    <div className="exercise-card" onClick={() => onSelect(exercise)}>
      <h4>{exercise.name}</h4>
      <p className="muscle-group">{exercise.muscle_group}</p>
      <span className={`type-badge ${exercise.type}`}>
        {exercise.type}
      </span>
    </div>
  );
}
