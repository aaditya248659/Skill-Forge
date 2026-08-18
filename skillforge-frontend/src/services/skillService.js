const API_URL = "http://localhost:8080/api/skills";

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getSkills() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }

    return response.json();
}

export async function addSkill(skillData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(skillData),
    });

    if (!response.ok) {
        throw new Error("Failed to add skill");
    }

    return response.json();
}

export async function updateSkill(skillId, skillData) {
    const response = await fetch(`${API_URL}/${skillId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(skillData),
    });

    if (!response.ok) {
        throw new Error("Failed to update skill");
    }

    return response.json();
}

export async function deleteSkill(skillId) {
    const response = await fetch(`${API_URL}/${skillId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete skill");
    }

    return response.text();
}