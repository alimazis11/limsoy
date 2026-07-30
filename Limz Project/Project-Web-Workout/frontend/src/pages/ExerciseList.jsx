import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseAPI } from "../services/api";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchExercises = useCallback(async () => {
    try {
      const response = await exerciseAPI.getAll(page);
      setExercises(response.data.data);
    } catch {
      setError("Failed to load exercises");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchExercises();
  }, [fetchExercises]);

  return (
    <div className="exercise-list-page">
      <header>
        <button onClick={() => navigate("/dashboard")}>← Back</button>
        <h1>Exercise Library</h1>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading">Loading exercises...</div>
      ) : (
        <div className="exercises-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card-large">
              <h3>{exercise.name}</h3>
              <p className="muscle-group">{exercise.muscle_group}</p>
              <span className="type-badge">{exercise.type}</span>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
