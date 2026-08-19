import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/learning-goals`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getLearningGoals() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch learning goals");
    }

    return response.json();
}

export async function addLearningGoal(goalData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData),
    });

    if (!response.ok) {
        throw new Error("Failed to add learning goal");
    }

    return response.json();
}

export async function updateLearningGoal(goalId, goalData) {
    const response = await fetch(`${API_URL}/${goalId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData),
    });

    if (!response.ok) {
        throw new Error("Failed to update learning goal");
    }

    return response.json();
}

export async function deleteLearningGoal(goalId) {
    const response = await fetch(`${API_URL}/${goalId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete learning goal");
    }
}