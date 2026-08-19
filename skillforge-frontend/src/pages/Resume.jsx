import { useEffect, useState } from "react";

import {
    getMyResume,
    uploadResume,
    updateResume,
    deleteResume,
    analyzeResume,
    applyResumeData,
    viewResume,
} from "../services/resumeService";

function Resume() {
    const [resume, setResume] = useState(null);

    const [resumeTitle, setResumeTitle] = useState("");
    const [file, setFile] = useState(null);

    const [analysis, setAnalysis] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {
            setLoading(true);

            const data = await getMyResume();

            setResume(data);

            setResumeTitle(data.resumeTitle || "");

            setError("");
        } catch (err) {
            setResume(null);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewResume = async () => {
        const newWindow = window.open("", "_blank");

        if (!newWindow) {
            alert("Please allow pop-ups for SkillForge.");
            return;
        }

        try {
            newWindow.document.write(`
                <html>
                    <head>
                        <title>SkillForge Resume</title>
                    </head>
                    <body style="margin:0;">
                        <p style="text-align:center;margin-top:20px;">
                            Loading resume...
                        </p>
                    </body>
                </html>
            `);

            const blob = await viewResume();

            const fileUrl = window.URL.createObjectURL(blob);

            newWindow.location.href = fileUrl;

            setTimeout(() => {
                window.URL.revokeObjectURL(fileUrl);
            }, 60000);

        } catch (err) {
            newWindow.close();
            alert(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!resumeTitle.trim()) {
            setError("Resume title is required");
            return;
        }

        if (!file) {
            setError("Please select a resume file");
            return;
        }

        try {
            if (resume) {
                const updatedResume = await updateResume(
                    resumeTitle,
                    file
                );

                setResume(updatedResume);
                setAnalysis(null);

                setMessage(
                    "Resume updated successfully"
                );
            } else {
                const uploadedResume = await uploadResume(
                    resumeTitle,
                    file
                );

                setResume(uploadedResume);
                setAnalysis(null);

                setMessage(
                    "Resume uploaded successfully"
                );
            }

            setFile(null);

            const fileInput =
                document.getElementById("resumeFile");

            if (fileInput) {
                fileInput.value = "";
            }

            setShowForm(false);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {

        if (
            !window.confirm(
                "Are you sure you want to delete your resume?"
            )
        ) {
            return;
        }

        try {
            await deleteResume();

            setResume(null);
            setAnalysis(null);
            setResumeTitle("");
            setFile(null);
            setShowForm(true);

            const fileInput =
                document.getElementById("resumeFile");

            if (fileInput) {
                fileInput.value = "";
            }

            alert("Resume deleted successfully");

        } catch (err) {
            alert(err.message);
        }
    };

    const handleAnalyzeResume = async () => {
        try {
            setAnalyzing(true);
            setMessage("");
            setError("");

            const data = await analyzeResume();

            setAnalysis(data);

            setMessage(
                "Resume analyzed successfully."
            );

        } catch (err) {
            setError(err.message);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleApplyResume = async () => {
        try {
            setUpdatingProfile(true);
            setMessage("");
            setError("");

            await applyResumeData();
            await loadResume();

            setMessage(
                "Profile updated successfully."
            );

        } catch (err) {
            setError(err.message);
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handleCancelForm = () => {
        setFile(null);

        const fileInput =
            document.getElementById("resumeFile");

        if (fileInput) {
            fileInput.value = "";
        }

        setMessage("");
        setError("");
        setShowForm(false);
    };

    if (loading) {
        return <p>Loading resume...</p>;
    }

    return (
        <div className="resume-page">

            {/* Page Header */}
            <div className="page-header">

                <span className="dashboard-eyebrow">
                    PROFESSIONAL DOCUMENT
                </span>

                <h1>My Resume</h1>

                <p>
                    Upload and manage your professional resume
                    from your SkillForge portfolio.
                </p>

            </div>

            {/* Upload / Update Form */}
            {(resume === null || showForm) && (
                <div className="resume-upload-card">

                    <div className="resume-upload-header">

                        <div className="resume-upload-icon">
                            CV
                        </div>

                        <div>
                            <h2>
                                {resume
                                    ? "Update Resume"
                                    : "Upload Resume"}
                            </h2>

                            <p>
                                {resume
                                    ? "Replace your current resume."
                                    : "Upload your professional resume."}
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Resume Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={resumeTitle}
                                    onChange={(e) =>
                                        setResumeTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Resume File
                                </label>

                                <input
                                    id="resumeFile"
                                    type="file"
                                    className="form-control"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files[0]
                                        )
                                    }
                                    required={!resume}
                                />

                            </div>

                        </div>

                        <div className="resume-form-actions">

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                {resume
                                    ? "Update Resume"
                                    : "Upload Resume"}
                            </button>

                            {resume && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancelForm}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>
            )}

            {/* Messages */}
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
                        {/* Resume Analysis */}
            {analysis && (
                <div className="resume-analysis-card">

                    <div className="resume-analysis-header">

                        <div className="resume-analysis-icon">
                            AI
                        </div>

                        <div>
                            <h2>Resume Analysis</h2>

                            <p>
                                Information extracted from your uploaded
                                resume.
                            </p>
                        </div>

                    </div>

                    {/* Basic Information */}

                    <div className="resume-info-grid">

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Name
                            </span>

                            <div className="resume-info-value">
                                {analysis.fullName || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Email
                            </span>

                            <div className="resume-info-value">
                                {analysis.email || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Phone
                            </span>

                            <div className="resume-info-value">
                                {analysis.phone || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Address
                            </span>

                            <div className="resume-info-value">
                                {analysis.address || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                College
                            </span>

                            <div className="resume-info-value">
                                {analysis.collegeName || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                University
                            </span>

                            <div className="resume-info-value">
                                {analysis.university || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Degree
                            </span>

                            <div className="resume-info-value">
                                {analysis.degree || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Branch
                            </span>

                            <div className="resume-info-value">
                                {analysis.branch || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Company
                            </span>

                            <div className="resume-info-value">
                                {analysis.companyName || "-"}
                            </div>
                        </div>

                        <div className="resume-info-card">
                            <span className="resume-info-label">
                                Designation
                            </span>

                            <div className="resume-info-value">
                                {analysis.designation || "-"}
                            </div>
                        </div>

                    </div>

                    {/* Skills */}

                    <h3 className="resume-section-title">
                        Skills
                    </h3>

                    <div className="skills-container">

                        {analysis.skills?.length > 0 ? (

                            analysis.skills.map(
                                (skill, index) => (
                                    <span
                                        key={index}
                                        className="skill-chip"
                                    >
                                        {skill}
                                    </span>
                                )
                            )

                        ) : (

                            <span className="resume-info-value">
                                No skills found
                            </span>

                        )}

                    </div>

                    {/* Recommended Skills */}

                    <h3 className="resume-section-title">
                        Recommended Skills
                    </h3>

                    <div className="skills-container">

                        {analysis.recommendedSkills?.length > 0 ? (

                            analysis.recommendedSkills.map(
                                (skill, index) => (
                                    <span
                                        key={index}
                                        className="recommended-chip"
                                    >
                                        {skill}
                                    </span>
                                )
                            )

                        ) : (

                            <span className="resume-info-value">
                                No recommended skills found
                            </span>

                        )}

                    </div>

                    {/* Career Suggestions */}

                    <h3 className="resume-section-title">
                        Career Suggestions
                    </h3>

                    <div className="career-suggestions">

                        {analysis.careerSuggestions?.length > 0 ? (

                            analysis.careerSuggestions.map(
                                (career, index) => {

                                    let careerText = "";

                                    if (typeof career === "string") {
                                        careerText = career;
                                    } else if (typeof career === "number") {
                                        careerText = `Career suggestion ${career}`;
                                    } else if (
                                        career &&
                                        typeof career === "object"
                                    ) {
                                        careerText =
                                            career.title ||
                                            career.role ||
                                            career.career ||
                                            career.name ||
                                            career.description ||
                                            Object.values(career)
                                                .filter(
                                                    (value) =>
                                                        typeof value === "string"
                                                )
                                                .join(" - ");
                                    }

                                    return (
                                        <div
                                            className="career-suggestion-card"
                                            key={index}
                                        >
                                            <div className="career-suggestion-icon">
                                                {index + 1}
                                            </div>

                                            <div className="career-suggestion-content">
                                                <span>
                                                    CAREER OPTION {index + 1}
                                                </span>

                                                <p>
                                                    {careerText ||
                                                        "No career suggestion available."}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            )

                        ) : (

                            <p className="resume-info-value">
                                No career suggestions available.
                            </p>

                        )}

                    </div>

                    {/* Apply Resume Data */}

                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={handleApplyResume}
                        disabled={updatingProfile}
                    >
                        {updatingProfile
                            ? "Updating..."
                            : "Update My Profile"}
                    </button>

                </div>
            )}

            {/* Current Resume */}

            {resume ? (

                <div className="current-resume-card">

                    <div className="current-resume-header">

                        <div>

                            <span className="resume-section-label">
                                CURRENT DOCUMENT
                            </span>

                            <h2>
                                Current Resume
                            </h2>

                            <p>
                                Your currently saved professional resume.
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={handleDelete}
                        >
                            Delete Resume
                        </button>

                    </div>

                    {/* Resume Document */}

                    <div className="resume-document-preview">

                        <div className="resume-document-main">

                            <div className="resume-document-icon">
                                CV
                            </div>

                            <div className="resume-document-details">

                                <span className="resume-document-type">
                                    PROFESSIONAL RESUME
                                </span>

                                <h3>
                                    {resume.resumeTitle}
                                </h3>

                                <p>
                                    {resume.fullName ||
                                        "SkillForge User"}
                                </p>

                            </div>

                        </div>

                        <div className="resume-document-status">
                            SAVED
                        </div>

                    </div>

                    {/* Resume Information */}

                    <div className="resume-details-grid">

                        <div className="resume-detail-item">

                            <span className="resume-detail-label">
                                Resume ID
                            </span>

                            <strong className="resume-detail-value">
                                {resume.resumeId}
                            </strong>

                        </div>

                        <div className="resume-detail-item">

                            <span className="resume-detail-label">
                                Full Name
                            </span>

                            <strong className="resume-detail-value">
                                {resume.fullName || "—"}
                            </strong>

                        </div>

                        <div className="resume-detail-item">

                            <span className="resume-detail-label">
                                Resume Title
                            </span>

                            <strong className="resume-detail-value">
                                {resume.resumeTitle}
                            </strong>

                        </div>

                        <div className="resume-detail-item">

                            <span className="resume-detail-label">
                                File Name
                            </span>

                            <strong className="resume-detail-value resume-file-name">
                                {resume.resumeFile}
                            </strong>

                        </div>

                        {resume.createdAt && (
                            <div className="resume-detail-item">

                                <span className="resume-detail-label">
                                    Created At
                                </span>

                                <strong className="resume-detail-value">
                                    {resume.createdAt}
                                </strong>

                            </div>
                        )}

                    </div>

                    {/* Update Resume Button */}

                    {!showForm && (
                        <div className="resume-current-actions">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleViewResume}
                            >
                                View Resume
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    setMessage("");
                                    setError("");
                                    setFile(null);
                                    setShowForm(true);
                                }}
                            >
                                Update Resume
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAnalyzeResume}
                                disabled={analyzing}
                            >
                                {analyzing
                                    ? "Analyzing..."
                                    : "Analyze Resume"}
                            </button>

                        </div>
                    )}

                </div>

            ) : (

                <div className="resume-empty-card">

                    <div className="resume-empty-icon">
                        CV
                    </div>

                    <h2>
                        No resume uploaded yet
                    </h2>

                    <p>
                        Upload your professional resume above to keep it
                        connected with your SkillForge portfolio.
                    </p>

                </div>

            )}

        </div>
    );
}

export default Resume;