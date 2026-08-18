import { useEffect, useState } from "react";
import { getAIRecommendations } from "../services/aiRecommendationService.js";

import {
    getLearningResources,
    addLearningResource,
    updateLearningResource,
    deleteLearningResource,
} from "../services/learningResourcesService.js";

function LearningResources() {
    const [resources, setResources] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        resourceType: "YOUTUBE",
        resourceLink: "",
        description: "",
    });

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [recommendation, setRecommendation] = useState(() => {
        const savedRecommendation =
            localStorage.getItem("aiRecommendation");

        if (!savedRecommendation) {
            return null;
        }

        try {
            return JSON.parse(savedRecommendation);
        } catch {
            localStorage.removeItem("aiRecommendation");
            return null;
        }
    });

    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

    useEffect(() => {
        loadResources();
    }, []);

    const loadResources = async () => {
        try {
            const data = await getLearningResources();

            setResources(data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            resourceType: "YOUTUBE",
            resourceLink: "",
            description: "",
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            if (editingId !== null) {
                await updateLearningResource(
                    editingId,
                    formData
                );

                setMessage(
                    "Learning resource updated successfully"
                );
            } else {
                await addLearningResource(formData);

                setMessage(
                    "Learning resource added successfully"
                );
            }

            resetForm();

            await loadResources();

            setShowForm(false);
        } catch (err) {
            console.error(err);

            if (editingId !== null) {
                setError(
                    "Failed to update learning resource"
                );
            } else {
                setError(
                    "Failed to add learning resource"
                );
            }
        }
    };

    const handleEdit = (resource) => {
        setFormData({
            title: resource.title || "",
            resourceType:
                resource.resourceType || "YOUTUBE",
            resourceLink:
                resource.resourceLink || "",
            description:
                resource.description || "",
        });

        setEditingId(resource.resourceId);

        setMessage("");
        setError("");
        setShowForm(true);
    };

    const handleDelete = async (resourceId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this learning resource?"
            )
        ) {
            return;
        }

        try {
            await deleteLearningResource(resourceId);

            if (editingId === resourceId) {
                resetForm();
                setShowForm(false);
            }

            alert(
                "Learning resource deleted successfully"
            );

            setError("");

            await loadResources();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        setMessage("");
        setError("");
        setShowForm(false);
    };

    const handleGenerateRecommendations = async () => {
        try {
            setAiLoading(true);
            setAiError("");

            const data = await getAIRecommendations();

            setRecommendation(data);

            localStorage.setItem(
                "aiRecommendation",
                JSON.stringify(data)
            );
        } catch (err) {
            console.error(err);

            setAiError(err.message);
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="learning-resources-page">

            {/* Page Header */}
            <div className="page-header">
                <span className="dashboard-eyebrow">
                    LEARNING HUB
                </span>

                <h1>Learning Resources</h1>

                <p>
                    Organize useful learning materials and discover
                    personalized recommendations based on your career goals.
                </p>
            </div>

            {/* Add / Update Resource */}
            {(resources.length === 0 ||
                showForm ||
                editingId !== null) && (
                <div className="learning-resource-form-card">

                    <div className="resource-form-header">

                        <div className="resource-form-icon">
                            LR
                        </div>

                        <div>
                            <h2>
                                {editingId !== null
                                    ? "Update Learning Resource"
                                    : "Add Learning Resource"}
                            </h2>

                            <p>
                                {editingId !== null
                                    ? "Update the details of your saved learning resource."
                                    : "Save courses, documentation, books, videos, and other useful materials."}
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>
                                                <div className="row g-4">

                            <div className="col-md-6">
                                <label
                                    htmlFor="resourceTitle"
                                    className="form-label"
                                >
                                    Resource Title
                                </label>

                                <input
                                    id="resourceTitle"
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Spring Boot Documentation"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="resourceType"
                                    className="form-label"
                                >
                                    Resource Type
                                </label>

                                <select
                                    id="resourceType"
                                    name="resourceType"
                                    className="form-select"
                                    value={formData.resourceType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="YOUTUBE">
                                        YouTube
                                    </option>

                                    <option value="COURSE">
                                        Course
                                    </option>

                                    <option value="DOCUMENTATION">
                                        Documentation
                                    </option>

                                    <option value="BOOK">
                                        Book
                                    </option>

                                    <option value="ARTICLE">
                                        Article
                                    </option>

                                    <option value="WEBSITE">
                                        Website
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="resourceLink"
                                    className="form-label"
                                >
                                    Resource Link
                                </label>

                                <input
                                    id="resourceLink"
                                    type="url"
                                    name="resourceLink"
                                    className="form-control"
                                    value={formData.resourceLink}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="resourceDescription"
                                    className="form-label"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="resourceDescription"
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Briefly describe why this resource is useful..."
                                />
                            </div>

                        </div>

                        <div className="resource-form-actions">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId !== null
                                    ? "Update Resource"
                                    : "Add Resource"}
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

            {/* Messages */}

            {message && (
                <div className="alert alert-success resource-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger resource-message">
                    {error}
                </div>
            )}

            {/* Saved Learning Resources */}

            <div className="saved-resources-section">

                <div className="saved-resources-header">

                    <div>
                        <h2>My Learning Resources</h2>

                        <p>
                            Your saved courses, videos, documentation,
                            books, and other learning materials.
                        </p>
                    </div>

                    <span className="resources-count">
                        {resources.length}{" "}
                        {resources.length === 1
                            ? "Resource"
                            : "Resources"}
                    </span>

                </div>

                {resources.length === 0 ? (

                    <div className="resources-empty-state">

                        <div className="resources-empty-icon">
                            LR
                        </div>

                        <h3>No learning resources yet</h3>

                        <p>
                            Save useful courses, documentation, videos,
                            books, or websites to build your personal
                            learning library.
                        </p>

                    </div>

                ) : (

                    <div className="resource-grid">

                        {resources.map((resource) => (

                            <div
                                className="saved-resource-card"
                                key={resource.resourceId}
                            >

                                <div className="saved-resource-top">

                                    <span
                                        className={`resource-type resource-type-${resource.resourceType
                                            ?.toLowerCase()}`}
                                    >
                                        {resource.resourceType}
                                    </span>

                                </div>

                                <h3>
                                    {resource.title}
                                </h3>

                                <p className="saved-resource-description">
                                    {resource.description ||
                                        "No description provided."}
                                </p>

                                <div className="saved-resource-footer">

                                    <div>
                                        {resource.resourceLink ? (
                                            <a
                                                href={resource.resourceLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="resource-open-link"
                                            >
                                                Open Resource
                                            </a>
                                        ) : (
                                            <span className="resource-no-link">
                                                No link provided
                                            </span>
                                        )}
                                    </div>

                                    <div className="resource-actions">

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() =>
                                                handleEdit(resource)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    resource.resourceId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {resources.length > 0 && !showForm && (
                <div className="add-more-resources">
                    <button
                        type="button"
                        className="btn btn-primary add-more-resources-btn"
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                    >
                        Add More Resources
                    </button>
                </div>
            )}

            {/* AI Recommendation Section */}
            <div className="ai-learning-section">

                <div className="ai-learning-header">

                    <div className="ai-learning-title-area">

                        <div className="ai-icon">
                            AI
                        </div>

                        <div>
                            <span className="ai-label">
                                PERSONALIZED LEARNING
                            </span>

                            <h2>
                                AI Career Recommendations
                            </h2>

                            <p>
                                Analyze your profile, career goal, and
                                current skills to discover what to learn next.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="btn btn-primary ai-generate-btn"
                        onClick={handleGenerateRecommendations}
                        disabled={aiLoading}
                    >
                        {aiLoading
                            ? "Generating..."
                            : "Generate Recommendations"}
                    </button>

                </div>

                {/* AI Loading */}

                {aiLoading && (
                    <div className="ai-loading-box">

                        <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                        />

                        <div>
                            <strong>
                                Building your recommendations
                            </strong>

                            <p>
                                Analyzing your profile, skills, and
                                career goal...
                            </p>
                        </div>

                    </div>
                )}

                {/* AI Error */}

                {aiError && (
                    <div className="alert alert-danger ai-error-message">
                        {aiError}
                    </div>
                )}

                {/* AI Results */}

                {recommendation && (

                    <div className="ai-results">

                        {/* Career Summary */}

                        <div className="ai-summary-card">

                            <span className="ai-result-label">
                                CAREER ANALYSIS
                            </span>

                            <h3>
                                Career Summary
                            </h3>

                            <p>
                                {recommendation.careerSummary}
                            </p>

                        </div>

                        {/* Skill Gaps + Recommended Skills */}

                        <div className="ai-two-column-grid">

                            <div className="ai-insight-card">

                                <div className="ai-insight-heading">

                                    <div className="ai-insight-icon">
                                        SG
                                    </div>

                                    <div>
                                        <span>
                                            ANALYSIS
                                        </span>

                                        <h3>
                                            Skill Gaps
                                        </h3>
                                    </div>

                                </div>

                                {recommendation.skillGaps?.length > 0 ? (

                                    <div className="ai-chip-container">

                                        {recommendation.skillGaps.map(
                                            (skill, index) => (

                                                <span
                                                    className="ai-chip skill-gap-chip"
                                                    key={`${skill}-${index}`}
                                                >
                                                    {skill}
                                                </span>

                                            )
                                        )}

                                    </div>

                                ) : (

                                    <p className="ai-empty-text">
                                        No skill gaps found.
                                    </p>

                                )}

                            </div>

                            <div className="ai-insight-card">

                                <div className="ai-insight-heading">

                                    <div className="ai-insight-icon">
                                        RS
                                    </div>

                                    <div>
                                        <span>
                                            NEXT SKILLS
                                        </span>

                                        <h3>
                                            Recommended Skills
                                        </h3>
                                    </div>

                                </div>

                                {recommendation.recommendedSkills?.length > 0 ? (

                                    <div className="ai-chip-container">

                                        {recommendation.recommendedSkills.map(
                                            (skill, index) => (

                                                <span
                                                    className="ai-chip recommended-skill-chip"
                                                    key={`${skill}-${index}`}
                                                >
                                                    {skill}
                                                </span>

                                            )
                                        )}

                                    </div>

                                ) : (

                                    <p className="ai-empty-text">
                                        No recommended skills found.
                                    </p>

                                )}

                            </div>

                        </div>

                        {/* Learning Roadmap */}

                        <div className="ai-roadmap-card">

                            <div className="ai-section-heading">

                                <span>
                                    YOUR PATH
                                </span>

                                <h3>
                                    Learning Roadmap
                                </h3>

                            </div>

                            {recommendation.learningRoadmap?.length > 0 ? (

                                <div className="roadmap-timeline">

                                    {recommendation.learningRoadmap.map(
                                        (step, index) => (

                                            <div
                                                className="roadmap-step"
                                                key={`${step}-${index}`}
                                            >

                                                <div className="roadmap-marker">
                                                    {index + 1}
                                                </div>

                                                <div className="roadmap-content">

                                                    <span>
                                                        STEP {index + 1}
                                                    </span>

                                                    <p>
                                                        {step}
                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="ai-empty-text">
                                    No learning roadmap available.
                                </p>

                            )}

                        </div>

                        {/* AI Recommended Resources */}

                        <div className="ai-recommended-resources">

                            <div className="ai-section-heading">

                                <span>
                                    RECOMMENDED FOR YOU
                                </span>

                                <h3>
                                    Learning Resources
                                </h3>

                                <p>
                                    Resources selected according to your
                                    career goal and identified skill gaps.
                                </p>

                            </div>

                            {recommendation
                                .recommendedResources?.length > 0 ? (

                                <div className="ai-resource-grid">

                                    {recommendation.recommendedResources.map(
                                        (resource, index) => (

                                            <div
                                                className="ai-resource-card"
                                                key={`${resource.title}-${index}`}
                                            >

                                                <div className="ai-resource-card-top">

                                                    <div className="ai-resource-icon">
                                                        {resource.resourceType
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <span
                                                        className={`resource-type resource-type-${resource.resourceType
                                                            ?.toLowerCase()}`}
                                                    >
                                                        {resource.resourceType}
                                                    </span>

                                                </div>

                                                <h4>
                                                    {resource.title}
                                                </h4>

                                                <p>
                                                    {resource.description ||
                                                        "Recommended for your learning path."}
                                                </p>

                                                <div className="ai-resource-footer">

                                                    {resource.resourceLink ? (

                                                        <a
                                                            href={resource.resourceLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="resource-open-link"
                                                        >
                                                            Open Resource
                                                        </a>

                                                    ) : (

                                                        <span className="resource-no-link">
                                                            Link unavailable
                                                        </span>

                                                    )}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="ai-empty-text">
                                    No recommended learning resources available.
                                </p>

                            )}

                        </div>

                    </div>

                )}

                {/* Before AI Has Been Generated */}

                {!recommendation && !aiLoading && !aiError && (

                    <div className="ai-start-state">

                        <div className="ai-start-icon">
                            AI
                        </div>

                        <h3>
                            Discover what to learn next
                        </h3>

                        <p>
                            Generate personalized career insights, identify
                            skill gaps, discover recommended skills, and
                            receive a structured learning roadmap.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default LearningResources;