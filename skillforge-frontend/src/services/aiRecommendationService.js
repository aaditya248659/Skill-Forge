import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/ai/recommendations`;

function getAuthHeaders() {
    return {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getAIRecommendations() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        let message = "Failed to generate AI recommendations";

        try {
            const data = await response.json();

            if (data.message) {
                message = data.message;
            }
        } catch {
            // Use default message.
        }

        throw new Error(message);
    }

    return response.json();
}