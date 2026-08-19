import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/learning-resources`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getLearningResources() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch learning resources");
    }

    return response.json();
}

export async function addLearningResource(resourceData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(resourceData),
    });

    if (!response.ok) {
        throw new Error("Failed to add learning resource");
    }

    return response.json();
}

export async function updateLearningResource(resourceId, resourceData) {
    const response = await fetch(`${API_URL}/${resourceId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(resourceData),
    });

    if (!response.ok) {
        throw new Error("Failed to update learning resource");
    }

    return response.json();
}

export async function deleteLearningResource(resourceId) {
    const response = await fetch(`${API_URL}/${resourceId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete learning resource");
    }
}