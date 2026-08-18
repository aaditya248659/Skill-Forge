import { useEffect, useState } from "react";
import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
} from "../services/skillService";

const initialFormData = {
    skillName: "",
    category: "",
    skillLevel: "BEGINNER",
    description: "",
};

function Skills() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const data = await getSkills();
            setSkills(data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load skills");
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
                await updateSkill(editingId, formData);
                setMessage("Skill updated successfully");
            } else {
                await addSkill(formData);
                setMessage("Skill added successfully");
            }

            resetForm();
            await loadSkills();
            setShowForm(false);
        } catch (error) {
            console.error(error);

            setMessage(
                editingId !== null
                    ? "Failed to update skill"
                    : "Failed to add skill"
            );
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill.skillId);

        setFormData({
            skillName: skill.skillName ?? "",
            category: skill.category ?? "",
            skillLevel: skill.skillLevel ?? "BEGINNER",
            description: skill.description ?? "",
        });

        setMessage("");
        setShowForm(true);
    };

    const handleDelete = async (skillId) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this skill?"
            )
        ) {
            return;
        }

        try {
            await deleteSkill(skillId);

            if (editingId === skillId) {
                resetForm();
                setShowForm(false);
            }

            alert("Skill deleted successfully");
            await loadSkills();
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
        return <p>Loading skills...</p>;
    }

    return (
        <div className="skills-page">

            {/* Page Header */}
            <div className="page-header">
                <span className="dashboard-eyebrow">
                    SKILL PORTFOLIO
                </span>

                <h1>My Skills</h1>

                <p>
                    Build your skill portfolio and keep track of your
                    technical and professional capabilities.
                </p>
            </div>

            {/* Add / Update Skill */}
            {(skills.length === 0 ||
                showForm ||
                editingId !== null) && (
                <div className="skill-form-card">

                    <div className="skill-card-header">
                        <div className="skill-card-icon">
                            SK
                        </div>

                        <div>
                            <h2>
                                {editingId !== null
                                    ? "Update Skill"
                                    : "Add New Skill"}
                            </h2>

                            <p>
                                {editingId !== null
                                    ? "Update the information for this skill."
                                    : "Add a skill to your professional portfolio."}
                            </p>
                        </div>
                    </div>
                                        <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label
                                    htmlFor="skillName"
                                    className="form-label"
                                >
                                    Skill Name
                                </label>

                                <input
                                    id="skillName"
                                    type="text"
                                    name="skillName"
                                    className="form-control"
                                    value={formData.skillName}
                                    onChange={handleChange}
                                    placeholder="e.g. Java"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="category"
                                    className="form-label"
                                >
                                    Category
                                </label>

                                <input
                                    id="category"
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Programming Language"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label
                                    htmlFor="skillLevel"
                                    className="form-label"
                                >
                                    Skill Level
                                </label>

                                <select
                                    id="skillLevel"
                                    name="skillLevel"
                                    className="form-select"
                                    value={formData.skillLevel}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="BEGINNER">
                                        Beginner
                                    </option>

                                    <option value="INTERMEDIATE">
                                        Intermediate
                                    </option>

                                    <option value="ADVANCED">
                                        Advanced
                                    </option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="skillDescription"
                                    className="form-label"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="skillDescription"
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your experience with this skill..."
                                />
                            </div>

                        </div>

                        <div className="skill-form-actions">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId !== null
                                    ? "Update Skill"
                                    : "Add Skill"}
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
                    className={`alert skill-message ${
                        message.includes("successfully")
                            ? "alert-success"
                            : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Skills List */}
            <div className="skills-list-card">

                <div className="skills-list-header">

                    <div>
                        <h2>Skill Portfolio</h2>

                        <p>
                            Skills currently added to your professional
                            portfolio.
                        </p>
                    </div>

                    <span className="skills-count">
                        {skills.length}{" "}
                        {skills.length === 1
                            ? "Skill"
                            : "Skills"}
                    </span>

                </div>

                {skills.length === 0 ? (

                    <div className="skills-empty-state">

                        <div className="skills-empty-icon">
                            SK
                        </div>

                        <h3>No skills added yet</h3>

                        <p>
                            Add your first skill using the form above to
                            start building your skill portfolio.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table skill-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Skill</th>
                                    <th>Category</th>
                                    <th>Proficiency</th>
                                    <th>Description</th>
                                    <th className="text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {skills.map((skill) => (

                                    <tr key={skill.skillId}>

                                        <td>
                                            <div className="skill-name-cell">

                                                <div className="skill-row-icon">
                                                    {skill.skillName
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <strong>
                                                    {skill.skillName}
                                                </strong>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="skill-category">
                                                {skill.category}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`skill-level skill-level-${skill.skillLevel?.toLowerCase()}`}
                                            >
                                                {skill.skillLevel}
                                            </span>
                                        </td>

                                        <td className="skill-description-cell">
                                            <div className="skill-description-text">
                                                {skill.description || "-"}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="skill-actions">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() =>
                                                        handleEdit(skill)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            skill.skillId
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
                            {/* Add More Skills */}
                {skills.length > 0 && !showForm && (
                    <div className="add-more-skills">
                        <button
                            type="button"
                            className="btn btn-primary add-more-skills-btn"
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                        >
                            Add More Skills
                        </button>
                    </div>
                )}

            </div>
    );
}

export default Skills;