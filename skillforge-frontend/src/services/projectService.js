import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/projects`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getMyProjects() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}

export async function addProject(projectData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        throw new Error("Failed to add project");
    }

    return response.json();
}

export async function updateProject(projectId, projectData) {
    const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        throw new Error("Failed to update project");
    }

    return response.json();
}

export async function deleteProject(projectId) {
    const response = await fetch(`${API_URL}/${projectId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete project");
    }
}