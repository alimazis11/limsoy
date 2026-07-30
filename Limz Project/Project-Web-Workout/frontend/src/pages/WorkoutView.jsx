import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { workoutPlanAPI, workoutLogAPI } from "../services/api";

export default function WorkoutView() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlan = useCallback(async () => {
    try {
      const response = await workoutPlanAPI.getById(planId);
      setPlan(response.data.data);
    } catch {
      setError("Failed to load workout plan");
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    setLoading(true);
    fetchPlan();
  }, [fetchPlan]);

  const handleLogExercise = async (exerciseId, sets, reps) => {
    try {
      await workoutLogAPI.create({
        exercise_id: exerciseId,
        reps: parseInt(reps),
        weight: 0,
        date: new Date().toISOString().split("T")[0],
      });
      alert("Exercise logged!");
    } catch {
      setError("Failed to log exercise");
    }
  };

  if (loading) return <div className="loading">Loading workout...</div>;
  if (error) return <div className="error-banner">{error}</div>;
  if (!plan) return <div>Plan not found</div>;

  return (
    <div className="workout-view">
      <header>
        <button onClick={() => navigate("/dashboard")}>← Back</button>
        <h1>{plan.name}</h1>
      </header>

      <div className="plan-days">
        {plan.plan_days && plan.plan_days.map((day) => (
          <div key={day.id} className="day-section">
            <h2>{day.day_name}</h2>
            <div className="exercises-list">
              {day.plan_exercises && day.plan_exercises.map((pe) => (
                <div key={pe.id} className="exercise-item">
                  <div className="exercise-info">
                    <h3>{pe.exercise.name}</h3>
                    <p>Sets: {pe.sets} | Reps: {pe.reps}</p>
                    <span className="muscle-group">{pe.exercise.muscle_group}</span>
                  </div>
                  <button 
                    onClick={() => handleLogExercise(pe.exercise.id, pe.sets, pe.reps)}
                    className="log-btn"
                  >
                    Log Exercise
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
