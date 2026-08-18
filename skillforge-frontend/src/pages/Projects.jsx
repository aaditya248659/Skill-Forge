import { useEffect, useState } from "react";

import {
    getMyProjects,
    addProject,
    updateProject,
    deleteProject,
} from "../services/projectService";

function Projects() {
    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({
        projectTitle: "",
        description: "",
        technologyUsed: "",
        projectLink: "",
        githubLink: "",
        startDate: "",
        endDate: "",
    });

    const [editingProjectId, setEditingProjectId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await getMyProjects();
            setProjects(data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load projects");
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
        setFormData({
            projectTitle: "",
            description: "",
            technologyUsed: "",
            projectLink: "",
            githubLink: "",
            startDate: "",
            endDate: "",
        });

        setEditingProjectId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editingProjectId !== null) {
                await updateProject(editingProjectId, formData);
                setMessage("Project updated successfully");
            } else {
                await addProject(formData);
                setMessage("Project added successfully");
            }

            resetForm();
            await loadProjects();
            setShowForm(false);
        } catch (error) {
            console.error(error);

            setMessage(
                editingProjectId !== null
                    ? "Failed to update project"
                    : "Failed to add project"
            );
        }
    };

    const handleEdit = (project) => {
        setEditingProjectId(project.projectId);

        setFormData({
            projectTitle: project.projectTitle || "",
            description: project.description || "",
            technologyUsed: project.technologyUsed || "",
            projectLink: project.projectLink || "",
            githubLink: project.githubLink || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
        });

        setMessage("");
        setShowForm(true);
    };

    const handleDelete = async (projectId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this project?"
            )
        ) {
            return;
        }

        try {
            await deleteProject(projectId);

            if (editingProjectId === projectId) {
                resetForm();
                setShowForm(false);
            }

            alert("Project deleted successfully.");
            await loadProjects();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        setMessage("");
        setShowForm(false);
    };

    return (
        <div className="projects-page">

            {/* Page Header */}
            <div className="page-header">
                <span className="dashboard-eyebrow">
                    PROJECT PORTFOLIO
                </span>

                <h1>My Projects</h1>

                <p>
                    Showcase the projects you have built, the technologies
                    you used, and links to your work.
                </p>
            </div>

            {/* Add / Update Project */}
            {(projects.length === 0 ||
                showForm ||
                editingProjectId !== null) && (
                <div className="project-form-card">

                    <div className="project-card-header">
                        <div className="project-card-icon">
                            PR
                        </div>

                        <div>
                            <h2>
                                {editingProjectId !== null
                                    ? "Update Project"
                                    : "Add New Project"}
                            </h2>

                            <p>
                                {editingProjectId !== null
                                    ? "Update the information for this project."
                                    : "Add a project to your professional portfolio."}
                            </p>
                        </div>
                    </div>
                                        <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label
                                    htmlFor="projectTitle"
                                    className="form-label"
                                >
                                    Project Title
                                </label>

                                <input
                                    id="projectTitle"
                                    type="text"
                                    name="projectTitle"
                                    className="form-control"
                                    value={formData.projectTitle}
                                    onChange={handleChange}
                                    placeholder="Enter project title"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="technologyUsed"
                                    className="form-label"
                                >
                                    Technology Used
                                </label>

                                <input
                                    id="technologyUsed"
                                    type="text"
                                    name="technologyUsed"
                                    className="form-control"
                                    value={formData.technologyUsed}
                                    onChange={handleChange}
                                    placeholder="e.g. React, Spring Boot, MySQL"
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="projectDescription"
                                    className="form-label"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="projectDescription"
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the project, its purpose, and your work..."
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="projectLink"
                                    className="form-label"
                                >
                                    Project Link
                                </label>

                                <input
                                    id="projectLink"
                                    type="url"
                                    name="projectLink"
                                    className="form-control"
                                    value={formData.projectLink}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />

                                <div className="form-helper-text">
                                    Add a deployed project URL if available.
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="githubLink"
                                    className="form-label"
                                >
                                    GitHub Link
                                </label>

                                <input
                                    id="githubLink"
                                    type="url"
                                    name="githubLink"
                                    className="form-control"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..."
                                />

                                <div className="form-helper-text">
                                    Add the repository URL for your project.
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="startDate"
                                    className="form-label"
                                >
                                    Start Date
                                </label>

                                <input
                                    id="startDate"
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="endDate"
                                    className="form-label"
                                >
                                    End Date
                                </label>

                                <input
                                    id="endDate"
                                    type="date"
                                    name="endDate"
                                    className="form-control"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="project-form-actions">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingProjectId !== null
                                    ? "Update Project"
                                    : "Add Project"}
                            </button>

                            {editingProjectId !== null && (
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
                    className={`alert project-message ${
                        message.includes("successfully")
                            ? "alert-success"
                            : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Project List */}
            <div className="projects-list-card">

                <div className="projects-list-header">

                    <div>
                        <h2>Project Portfolio</h2>

                        <p>
                            Projects currently added to your SkillForge
                            portfolio.
                        </p>
                    </div>

                    <span className="projects-count">
                        {projects.length}{" "}
                        {projects.length === 1
                            ? "Project"
                            : "Projects"}
                    </span>

                </div>

                {projects.length === 0 ? (

                    <div className="projects-empty-state">

                        <div className="projects-empty-icon">
                            PR
                        </div>

                        <h3>No projects added yet</h3>

                        <p>
                            Add your first project above to start building
                            your professional project portfolio.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table project-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Technology</th>
                                    <th>Description</th>
                                    <th>Links</th>
                                    <th>Duration</th>
                                    <th className="text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {projects.map((project) => (

                                    <tr key={project.projectId}>

                                        <td>
                                            <div className="project-name-cell">

                                                <div className="project-row-icon">
                                                    {project.projectTitle
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <strong>
                                                    {project.projectTitle}
                                                </strong>

                                            </div>
                                        </td>

                                        <td>
                                            {project.technologyUsed ? (
                                                <span className="project-technology">
                                                    {project.technologyUsed}
                                                </span>
                                            ) : (
                                                <span className="project-empty-value">
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td className="project-description-cell">
                                            <div className="project-description-text">
                                                {project.description || "—"}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="project-links">

                                                {project.projectLink && (
                                                    <a
                                                        href={project.projectLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-link"
                                                    >
                                                        Live Project ↗
                                                    </a>
                                                )}

                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-link"
                                                    >
                                                        GitHub ↗
                                                    </a>
                                                )}

                                                {!project.projectLink &&
                                                    !project.githubLink && (
                                                        <span className="project-empty-value">
                                                            —
                                                        </span>
                                                    )}

                                            </div>
                                        </td>

                                        <td>
                                            <div className="project-duration">

                                                <span>
                                                    {project.startDate || "—"}
                                                </span>

                                                <span className="project-duration-arrow">
                                                    →
                                                </span>

                                                <span>
                                                    {project.endDate || "—"}
                                                </span>

                                            </div>
                                        </td>

                                        <td>
                                            <div className="project-actions">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() =>
                                                        handleEdit(project)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            project.projectId
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
                            {/* Add More Projects */}
                {projects.length > 0 && !showForm && (
                    <div className="add-more-projects">
                        <button
                            type="button"
                            className="btn btn-primary add-more-projects-btn"
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                        >
                            Add More Projects
                        </button>
                    </div>
                )}

            </div>

    );
}

export default Projects;