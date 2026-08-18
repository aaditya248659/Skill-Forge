import { useEffect, useState } from "react";
import {
    getLearningGoals,
    addLearningGoal,
    updateLearningGoal,
    deleteLearningGoal,
} from "../services/learningGoalService";

const initialFormData = {
    goalTitle: "",
    description: "",
    targetDate: "",
    status: "NOT_STARTED",
    progress: 0,
};

function LearningGoals() {
    const [goals, setGoals] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const data = await getLearningGoals();
            setGoals(data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load learning goals");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const goalData = {
            ...formData,
            progress: Number(formData.progress),
        };

        try {
            if (editingId !== null) {
                await updateLearningGoal(editingId, goalData);
                setMessage("Learning goal updated successfully");
            } else {
                await addLearningGoal(goalData);
                setMessage("Learning goal added successfully");
            }

            resetForm();
            await loadGoals();
            setShowForm(false);
        } catch (error) {
            console.error(error);

            setMessage(
                editingId !== null
                    ? "Failed to update learning goal"
                    : "Failed to add learning goal"
            );
        }
    };

    const handleEdit = (goal) => {
        setEditingId(goal.goalId);

        setFormData({
            goalTitle: goal.goalTitle || "",
            description: goal.description || "",
            targetDate: goal.targetDate || "",
            status: goal.status || "NOT_STARTED",
            progress: goal.progress ?? 0,
        });

        setMessage("");
        setShowForm(true);
    };

    const handleDelete = async (goalId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this learning goal?"
            )
        ) {
            return;
        }

        try {
            await deleteLearningGoal(goalId);

            if (editingId === goalId) {
                resetForm();
                setShowForm(false);
            }

            alert("Learning goal deleted successfully");
            await loadGoals();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        setMessage("");
        setShowForm(false);
    };

    if (loading) {
        return <p>Loading learning goals...</p>;
    }

    return (
        <div className="learning-goals-page">

            {/* Page Header */}
            <div className="page-header">
                <span className="dashboard-eyebrow">
                    LEARNING PROGRESS
                </span>

                <h1>Learning Goals</h1>

                <p>
                    Set clear learning targets, monitor your progress,
                    and stay focused on your professional development.
                </p>
            </div>

            {/* Add / Update Goal */}
            {(goals.length === 0 || showForm || editingId !== null) && (
                <div className="goal-form-card">

                    <div className="goal-card-header">
                        <div className="goal-card-icon">
                            LG
                        </div>

                        <div>
                            <h2>
                                {editingId !== null
                                    ? "Update Learning Goal"
                                    : "Add New Learning Goal"}
                            </h2>

                            <p>
                                {editingId !== null
                                    ? "Update your goal details and current progress."
                                    : "Create a learning target and track your progress."}
                            </p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label
                                    htmlFor="goalTitle"
                                    className="form-label"
                                >
                                    Goal Title
                                </label>

                                <input
                                    id="goalTitle"
                                    type="text"
                                    name="goalTitle"
                                    className="form-control"
                                    value={formData.goalTitle}
                                    onChange={handleChange}
                                    placeholder="e.g. Learn Spring Boot"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="targetDate"
                                    className="form-label"
                                >
                                    Target Date
                                </label>

                                <input
                                    id="targetDate"
                                    type="date"
                                    name="targetDate"
                                    className="form-control"
                                    value={formData.targetDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="goalDescription"
                                    className="form-label"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="goalDescription"
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe what you want to achieve..."
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="goalStatus"
                                    className="form-label"
                                >
                                    Status
                                </label>

                                <select
                                    id="goalStatus"
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="NOT_STARTED">
                                        Not Started
                                    </option>

                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>

                                    <option value="COMPLETED">
                                        Completed
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="goalProgress"
                                    className="form-label"
                                >
                                    Progress (%)
                                </label>

                                <input
                                    id="goalProgress"
                                    type="number"
                                    name="progress"
                                    className="form-control"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="form-helper-text">
                                    Enter a value between 0 and 100.
                                </div>
                            </div>

                        </div>

                        {/* Progress Preview */}
                        <div className="goal-progress-preview">

                            <div className="goal-progress-preview-header">
                                <span>Current Progress</span>

                                <strong>
                                    {formData.progress || 0}%
                                </strong>
                            </div>

                            <div className="goal-progress-track">
                                <div
                                    className="goal-progress-fill"
                                    style={{
                                        width: `${Math.min(
                                            Math.max(
                                                Number(formData.progress) || 0,
                                                0
                                            ),
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>

                        </div>

                        <div className="goal-form-actions">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId !== null
                                    ? "Update Goal"
                                    : "Add Goal"}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>
                </div>
            )}

            {/* Message */}
            {message && (
                <div
                    className={`alert goal-message ${
                        message.includes("successfully")
                            ? "alert-success"
                            : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Goals List */}
            <div className="goals-list-card">

                <div className="goals-list-header">

                    <div>
                        <h2>My Learning Goals</h2>

                        <p>
                            Track your targets, status, and learning
                            progress.
                        </p>
                    </div>

                    <span className="goals-count">
                        {goals.length}{" "}
                        {goals.length === 1
                            ? "Goal"
                            : "Goals"}
                    </span>

                </div>

                {goals.length === 0 ? (

                    <div className="goals-empty-state">

                        <div className="goals-empty-icon">
                            LG
                        </div>

                        <h3>No learning goals yet</h3>

                        <p>
                            Create your first learning goal and start
                            tracking progress toward your next skill or
                            career milestone.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table goal-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Description</th>
                                    <th>Target Date</th>
                                    <th>Status</th>
                                    <th>Progress</th>
                                    <th className="text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {goals.map((goal) => (

                                    <tr key={goal.goalId}>

                                        <td>
                                            <div className="goal-name-cell">

                                                <div className="goal-row-icon">
                                                    {goal.goalTitle
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <strong>
                                                    {goal.goalTitle}
                                                </strong>

                                            </div>
                                        </td>

                                        <td className="goal-description-cell">
                                            {goal.description || "—"}
                                        </td>

                                        <td>
                                            {goal.targetDate ? (
                                                <span className="goal-target-date">
                                                    {goal.targetDate}
                                                </span>
                                            ) : (
                                                <span className="goal-empty-value">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            <span
                                                className={`goal-status goal-status-${goal.status
                                                    ?.toLowerCase()
                                                    .replaceAll("_", "-")}`}
                                            >
                                                {goal.status
                                                    ?.replaceAll("_", " ")}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="goal-table-progress">

                                                <div className="goal-table-progress-header">
                                                    <span>
                                                        {goal.progress}%
                                                    </span>
                                                </div>

                                                <div className="goal-table-progress-track">
                                                    <div
                                                        className="goal-table-progress-fill"
                                                        style={{
                                                            width: `${Math.min(
                                                                Math.max(
                                                                    Number(
                                                                        goal.progress
                                                                    ) || 0,
                                                                    0
                                                                ),
                                                                100
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            <div className="goal-actions">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() =>
                                                        handleEdit(goal)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            goal.goalId
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>
                            {/* Add More Goals */}
                {goals.length > 0 && !showForm && (
                    <div className="add-more-goals">
                        <button
                            type="button"
                            className="btn btn-primary add-more-goals-btn"
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                        >
                            Add More Goals
                        </button>
                    </div>
                )}

            </div>
    );
}

export default LearningGoals;