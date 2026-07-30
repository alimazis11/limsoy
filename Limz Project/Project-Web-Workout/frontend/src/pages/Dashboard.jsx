import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { workoutPlanAPI, exerciseAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const plansRes = await workoutPlanAPI.getAll(1);
      const exercisesRes = await exerciseAPI.getAll(1);
      setPlans(plansRes.data.data);
      setExercises(exercisesRes.data.data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [user, navigate, fetchData]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>FitJourney Dashboard</h1>
        <div className="header-actions">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="dashboard-content">
          <section className="workout-plans">
            <h2>Your Workout Plans</h2>
            {plans.length === 0 ? (
              <p>No workout plans yet</p>
            ) : (
              <div className="plans-grid">
                {plans.map((plan) => (
                  <div key={plan.id} className="plan-card">
                    <h3>{plan.name}</h3>
                    <p>Status: {plan.is_active ? "Active" : "Inactive"}</p>
                    <button onClick={() => navigate(`/workout/${plan.id}`)}>
                      Start Workout
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="exercises">
            <h2>Popular Exercises</h2>
            <div className="exercises-grid">
              {exercises.slice(0, 6).map((exercise) => (
                <div key={exercise.id} className="exercise-card">
                  <h4>{exercise.name}</h4>
                  <p>{exercise.muscle_group}</p>
                  <span className="type-badge">{exercise.type}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
