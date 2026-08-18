const API_URL = "http://localhost:8080/api/resume";

function getAuthHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

async function getErrorMessage(response, fallbackMessage) {
    try {
        const data = await response.json();
        return data.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
}

export async function getMyResume() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "Failed to fetch resume")
        );
    }

    return response.json();
}

export async function viewResume() {
    const response = await fetch(`${API_URL}/view`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                "Failed to open resume"
            )
        );
    }

    return response.blob();
}

export async function analyzeResume() {

    const response = await fetch(`${API_URL}/analyze`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                "Failed to analyze resume"
            )
        );
    }

    return response.json();
}

export async function applyResumeData() {

    const response = await fetch(`${API_URL}/apply`, {
        method: "PUT",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(
                response,
                "Failed to update profile from resume"
            )
        );
    }

    return response.json();
}

export async function uploadResume(resumeTitle, file) {
    const formData = new FormData();

    formData.append("resumeTitle", resumeTitle);
    formData.append("file", file);

    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "Failed to upload resume")
        );
    }

    return response.json();
}

export async function updateResume(resumeTitle, file) {
    const formData = new FormData();

    formData.append("resumeTitle", resumeTitle);
    formData.append("file", file);

    const response = await fetch(API_URL, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "Failed to update resume")
        );
    }

    return response.json();
}

export async function deleteResume() {
    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "Failed to delete resume")
        );
    }
}