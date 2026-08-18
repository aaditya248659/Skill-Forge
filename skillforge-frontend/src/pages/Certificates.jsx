import { useEffect, useState } from "react";
import {
    getCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
} from "../services/certificateService";

const initialFormData = {
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
};

function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const data = await getCertificates();
            setCertificates(data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load certificates");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            if (editingId !== null) {
                await updateCertificate(editingId, formData);
                setMessage("Certificate updated successfully");
            } else {
                await addCertificate(formData);
                setMessage("Certificate added successfully");
            }

            resetForm();
            await loadCertificates();
            setShowForm(false);
        } catch (error) {
            console.error(error);

            setMessage(
                editingId !== null
                    ? "Failed to update certificate"
                    : "Failed to add certificate"
            );
        }
    };

    const handleEdit = (certificate) => {
        setEditingId(certificate.certificateId);

        setFormData({
            certificateName: certificate.certificateName || "",
            issuingOrganization:
                certificate.issuingOrganization || "",
            issueDate: certificate.issueDate || "",
            expiryDate: certificate.expiryDate || "",
            credentialId: certificate.credentialId || "",
            credentialUrl: certificate.credentialUrl || "",
        });

        setMessage("");
        setShowForm(true);
    };

    const handleDelete = async (certificateId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this certificate?"
            )
        ) {
            return;
        }

        try {
            await deleteCertificate(certificateId);

            if (editingId === certificateId) {
                resetForm();
                setShowForm(false);
            }

            alert("Certificate deleted successfully");
            await loadCertificates();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        setMessage("");
        setShowForm(false);
    };

    if (loading) {
        return <p>Loading certificates...</p>;
    }

    return (
        <div className="certificates-page">

            {/* Page Header */}
            <div className="page-header">
                <span className="dashboard-eyebrow">
                    CERTIFICATION PORTFOLIO
                </span>

                <h1>My Certificates</h1>

                <p>
                    Manage your certifications, credentials, and
                    professional achievements in one place.
                </p>
            </div>

            {/* Add / Update Certificate */}
            {(certificates.length === 0 ||
                showForm ||
                editingId !== null) && (
                <div className="certificate-form-card">

                    <div className="certificate-card-header">
                        <div className="certificate-card-icon">
                            CR
                        </div>

                        <div>
                            <h2>
                                {editingId !== null
                                    ? "Update Certificate"
                                    : "Add New Certificate"}
                            </h2>

                            <p>
                                {editingId !== null
                                    ? "Update the information for this certificate."
                                    : "Add a certification to your professional portfolio."}
                            </p>
                        </div>
                    </div>
                                        <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label
                                    htmlFor="certificateName"
                                    className="form-label"
                                >
                                    Certificate Name
                                </label>

                                <input
                                    id="certificateName"
                                    type="text"
                                    name="certificateName"
                                    className="form-control"
                                    value={formData.certificateName}
                                    onChange={handleChange}
                                    placeholder="e.g. Java Programming"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="issuingOrganization"
                                    className="form-label"
                                >
                                    Issuing Organization
                                </label>

                                <input
                                    id="issuingOrganization"
                                    type="text"
                                    name="issuingOrganization"
                                    className="form-control"
                                    value={formData.issuingOrganization}
                                    onChange={handleChange}
                                    placeholder="e.g. Oracle"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="issueDate"
                                    className="form-label"
                                >
                                    Issue Date
                                </label>

                                <input
                                    id="issueDate"
                                    type="date"
                                    name="issueDate"
                                    className="form-control"
                                    value={formData.issueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="expiryDate"
                                    className="form-label"
                                >
                                    Expiry Date
                                </label>

                                <input
                                    id="expiryDate"
                                    type="date"
                                    name="expiryDate"
                                    className="form-control"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                />

                                <div className="form-helper-text">
                                    Leave empty if the certificate does not expire.
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="credentialId"
                                    className="form-label"
                                >
                                    Credential ID
                                </label>

                                <input
                                    id="credentialId"
                                    type="text"
                                    name="credentialId"
                                    className="form-control"
                                    value={formData.credentialId}
                                    onChange={handleChange}
                                    placeholder="Enter credential ID"
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="credentialUrl"
                                    className="form-label"
                                >
                                    Credential URL
                                </label>

                                <input
                                    id="credentialUrl"
                                    type="url"
                                    name="credentialUrl"
                                    className="form-control"
                                    value={formData.credentialUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />

                                <div className="form-helper-text">
                                    Add a public verification link if available.
                                </div>
                            </div>

                        </div>

                        <div className="certificate-form-actions">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId !== null
                                    ? "Update Certificate"
                                    : "Add Certificate"}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>
                </div>
            )}

            {/* Message */}
            {message && (
                <div
                    className={`alert certificate-message ${
                        message.includes("successfully")
                            ? "alert-success"
                            : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Certificate List */}
            <div className="certificates-list-card">

                <div className="certificates-list-header">

                    <div>
                        <h2>Certificate Portfolio</h2>

                        <p>
                            Certifications and credentials currently
                            added to your SkillForge portfolio.
                        </p>
                    </div>

                    <span className="certificates-count">
                        {certificates.length}{" "}
                        {certificates.length === 1
                            ? "Certificate"
                            : "Certificates"}
                    </span>

                </div>

                {certificates.length === 0 ? (

                    <div className="certificates-empty-state">

                        <div className="certificates-empty-icon">
                            CR
                        </div>

                        <h3>No certificates added yet</h3>

                        <p>
                            Add your certifications and credentials to
                            showcase your professional achievements.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table certificate-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Certificate</th>
                                    <th>Organization</th>
                                    <th>Issued</th>
                                    <th>Expiry</th>
                                    <th>Credential ID</th>
                                    <th>Credential</th>
                                    <th className="text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {certificates.map((certificate) => (

                                    <tr
                                        key={certificate.certificateId}
                                    >

                                        <td>
                                            <div className="certificate-name-cell">

                                                <div className="certificate-row-icon">
                                                    {certificate.certificateName
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <strong>
                                                    {certificate.certificateName}
                                                </strong>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="certificate-organization">
                                                {certificate.issuingOrganization}
                                            </span>
                                        </td>

                                        <td className="certificate-date">
                                            {certificate.issueDate || "—"}
                                        </td>

                                        <td>
                                            {certificate.expiryDate ? (
                                                <span className="certificate-expiry">
                                                    {certificate.expiryDate}
                                                </span>
                                            ) : (
                                                <span className="certificate-no-expiry">
                                                    No Expiry
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {certificate.credentialId ? (
                                                <span className="credential-id">
                                                    {certificate.credentialId}
                                                </span>
                                            ) : (
                                                <span className="certificate-empty-value">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {certificate.credentialUrl ? (
                                                <a
                                                    href={certificate.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="credential-link"
                                                >
                                                    View Credential ↗
                                                </a>
                                            ) : (
                                                <span className="certificate-empty-value">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            <div className="certificate-actions">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() =>
                                                        handleEdit(certificate)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            certificate.certificateId
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>
                            {/* Add More Certificates */}
                {certificates.length > 0 && !showForm && (
                    <div className="add-more-certificates">
                        <button
                            type="button"
                            className="btn btn-primary add-more-certificates-btn"
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                        >
                            Add More Certificates
                        </button>
                    </div>
                )}

            </div>
    );
}

export default Certificates;