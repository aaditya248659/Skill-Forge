const API_URL = "http://localhost:8080/api/admin";

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    };
}

async function handleResponse(response, errorMessage) {
    if (!response.ok) {
        let message = errorMessage;

        try {
            const data = await response.json();

            if (data.message) {
                message = data.message;
            }
        } catch {
            // Keep the default error message.
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function getAllUsers() {
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    return handleResponse(response, "Failed to fetch users");
}

export async function getUserById(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    return handleResponse(response, "Failed to fetch user");
}

export async function updateUserStatus(userId, accountStatus) {
    const response = await fetch(
        `${API_URL}/users/${userId}/status`,
        {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                accountStatus,
            }),
        }
    );

    return handleResponse(
        response,
        "Failed to update user status"
    );
}

export async function deleteUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    return handleResponse(response, "Failed to delete user");
}

export async function getAdminDashboard() {
    const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    return handleResponse(
        response,
        "Failed to fetch admin dashboard"
    );
}