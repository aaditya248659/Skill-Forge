import API_BASE_URL from "./apiConfig";

const API_URL = `${API_BASE_URL}/api/profile`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getMyProfile() {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok){
        throw new Error("Failed to fetch profile")
    }
    
    return response.json();
}

export async function createProfile(profileData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
    });

    if (!response.ok) {
        throw new Error("Failed to create profile");
    }

    return response.json();
}

export async function updateProfile(profileData) {
    const response = await fetch(API_URL, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return response.json();
}

export async function deleteProfile() {

    const response = await fetch(
        API_URL,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (!response.ok) {

        throw new Error(
            await getErrorMessage(
                response,
                "Failed to delete profile"
            )
        );
    }

    return response.text();
}