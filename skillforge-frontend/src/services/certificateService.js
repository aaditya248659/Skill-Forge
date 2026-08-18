const API_URL = "http://localhost:8080/api/certificates";

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getCertificates() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch certificates");
    }

    return response.json();
}

export async function addCertificate(certificateData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(certificateData),
    });

    if (!response.ok) {
        throw new Error("Failed to add certificate");
    }

    return response.json();
}

export async function updateCertificate(certificateId, certificateData) {
    const response = await fetch(`${API_URL}/${certificateId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(certificateData),
    });

    if (!response.ok) {
        throw new Error("Failed to update certificate");
    }

    return response.json();
}

export async function deleteCertificate(certificateId) {
    const response = await fetch(`${API_URL}/${certificateId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete certificate");
    }
}