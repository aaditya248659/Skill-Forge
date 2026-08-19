import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/auth`;

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response.json();
}

export async function loginUser(loginData) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}