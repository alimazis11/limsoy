import { useState } from "react";
import { workoutLogAPI } from "../../services/api";

export default function WorkoutLogger({ exerciseId, exerciseName, onSuccess }) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await workoutLogAPI.create({
        exercise_id: exerciseId,
        reps: parseInt(reps),
        weight: weight ? parseFloat(weight) : null,
        date: new Date().toISOString().split("T")[0],
      });
      setReps("");
      setWeight("");
      onSuccess();
    } catch {
      setError("Failed to log exercise");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-logger">
      <h3>{exerciseName}</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging..." : "Log Exercise"}
        </button>
      </form>
    </div>
  );
}
