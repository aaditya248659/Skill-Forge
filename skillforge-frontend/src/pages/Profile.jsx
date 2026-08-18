import { useEffect, useState } from "react";
import {
    createProfile,
    getMyProfile,
    updateProfile,
} from "../services/profileService";
import { deleteProfile } from "../services/profileService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";

const initialFormData = {
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    bio: "",
    careerGoal: "",
    collegeName: "",
    university: "",
    degree: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    companyName: "",
    designation: "",
    experienceYears: "",
    linkedin: "",
    github: "",
};

const handleDeleteProfile = async () => {

    const confirmed = window.confirm(
        "Are you sure you want to delete your profile?\n\nThis will delete your profile, resume, skills and certificates.\n\nYour account will remain active."
    );

    if (!confirmed) {
        return;
    }

    try {
        await deleteProfile();
        alert("Profile deleted successfully.");
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
};

function Profile() {
    const [formData, setFormData] = useState(initialFormData);
    const [profileExists, setProfileExists] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [dobDate, setDobDate] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getMyProfile();

                if (!profile) {
                    setProfileExists(false);
                    return;
                }

                setFormData({
                    phone: profile.phone ?? "",
                    gender: profile.gender ?? "",
                    dateOfBirth: profile.dateOfBirth ?? "",
                    address: profile.address ?? "",
                    bio: profile.bio ?? "",
                    careerGoal: profile.careerGoal ?? "",
                    collegeName: profile.collegeName ?? "",
                    university: profile.university ?? "",
                    degree: profile.degree ?? "",
                    branch: profile.branch ?? "",
                    cgpa: profile.cgpa ?? "",
                    graduationYear: profile.graduationYear ?? "",
                    companyName: profile.companyName ?? "",
                    designation: profile.designation ?? "",
                    experienceYears: profile.experienceYears ?? "",
                    linkedin: profile.linkedin ?? "",
                    github: profile.github ?? "",
                });

                if (profile.dateOfBirth) {
                    const [year, month, day] =
                        profile.dateOfBirth.split("-");

                    setDobDate(
                        new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day)
                        )
                    );
                } else {
                    setDobDate(null);
                }

                setProfile(profile);

                setProfileExists(true);

                setIsEditing(false);
            } catch (error) {
                setProfileExists(false);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const formatDob = (date) => {
        if (!date) {
            return "";
        }

        const year = date.getFullYear();
        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");
        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const getMaximumDob = () => {
        const today = new Date();

        return new Date(
            today.getFullYear() - 16,
            today.getMonth(),
            today.getDate()
        );
    };

    const handleDobChange = (date) => {
        setDobDate(date);

        setFormData((previousData) => ({
            ...previousData,
            dateOfBirth: formatDob(date),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!dobDate) {
            alert("Please select your date of birth.");
            return;
        }

        const today = new Date();

        if (dobDate > today) {
            alert("Date of birth cannot be in the future.");
            return;
        }

        let age =
            today.getFullYear() -
            dobDate.getFullYear();

        const month =
            today.getMonth() -
            dobDate.getMonth();

        if (
            month < 0 ||
            (
                month === 0 &&
                today.getDate() < dobDate.getDate()
            )
        ) {
            age--;
        }

        if (age < 16) {
            alert("Age must be at least 16 years.");
            return;
        }

        const profileData = {
            ...formData,

            dateOfBirth: formatDob(dobDate),

            cgpa:
                formData.cgpa === ""
                    ? null
                    : Number(formData.cgpa),

            graduationYear:
                formData.graduationYear === ""
                    ? null
                    : Number(formData.graduationYear),

            experienceYears:
                formData.experienceYears === ""
                    ? null
                    : Number(formData.experienceYears),
        };

        try {
            if (profileExists) {
                const updatedProfile =
                    await updateProfile(profileData);

                setFormData({
                    phone: updatedProfile.phone ?? "",
                    gender: updatedProfile.gender ?? "",
                    dateOfBirth:
                        updatedProfile.dateOfBirth ?? "",
                    address: updatedProfile.address ?? "",
                    bio: updatedProfile.bio ?? "",
                    careerGoal:
                        updatedProfile.careerGoal ?? "",
                    collegeName:
                        updatedProfile.collegeName ?? "",
                    university:
                        updatedProfile.university ?? "",
                    degree: updatedProfile.degree ?? "",
                    branch: updatedProfile.branch ?? "",
                    cgpa: updatedProfile.cgpa ?? "",
                    graduationYear:
                        updatedProfile.graduationYear ?? "",
                    companyName:
                        updatedProfile.companyName ?? "",
                    designation:
                        updatedProfile.designation ?? "",
                    experienceYears:
                        updatedProfile.experienceYears ?? "",
                    linkedin:
                        updatedProfile.linkedin ?? "",
                    github:
                        updatedProfile.github ?? "",
                });

                if (updatedProfile.dateOfBirth) {
                    const [
                        year,
                        month,
                        day,
                    ] =
                        updatedProfile.dateOfBirth.split(
                            "-"
                        );

                    setDobDate(
                        new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day)
                        )
                    );
                } else {
                    setDobDate(null);
                }

                setProfile(updatedProfile);
                setProfileExists(true);
                setIsEditing(false);
                setMessage(
                    "Profile updated successfully"
                );
            } else {
                const createdProfile =
                    await createProfile(profileData);

                setFormData({
                    phone: createdProfile.phone ?? "",
                    gender: createdProfile.gender ?? "",
                    dateOfBirth:
                        createdProfile.dateOfBirth ?? "",
                    address:
                        createdProfile.address ?? "",
                    bio:
                        createdProfile.bio ?? "",
                    careerGoal:
                        createdProfile.careerGoal ?? "",
                    collegeName:
                        createdProfile.collegeName ?? "",
                    university:
                        createdProfile.university ?? "",
                    degree:
                        createdProfile.degree ?? "",
                    branch:
                        createdProfile.branch ?? "",
                    cgpa:
                        createdProfile.cgpa ?? "",
                    graduationYear:
                        createdProfile.graduationYear ?? "",
                    companyName:
                        createdProfile.companyName ?? "",
                    designation:
                        createdProfile.designation ?? "",
                    experienceYears:
                        createdProfile.experienceYears ?? "",
                    linkedin:
                        createdProfile.linkedin ?? "",
                    github:
                        createdProfile.github ?? "",
                });

                if (createdProfile.dateOfBirth) {
                    const [
                        year,
                        month,
                        day,
                    ] =
                        createdProfile.dateOfBirth.split(
                            "-"
                        );

                    setDobDate(
                        new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day)
                        )
                    );
                } else {
                    setDobDate(null);
                }

                setProfile(createdProfile);
                setProfileExists(true);
                setIsEditing(false);
                setMessage(
                    "Profile created successfully"
                );
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to save profile");
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (profileExists && !isEditing) {

        return (

            <div className="profile-page">

                <div className="page-header">

                    <span className="dashboard-eyebrow">
                        PROFESSIONAL PORTFOLIO
                    </span>

                    <h1>My Profile</h1>

                    <p>
                        Manage the information that represents your
                        professional identity on SkillForge.
                    </p>

                </div>

                <div className="profile-section">

                    <div className="profile-section-heading">

                        <div className="profile-section-icon">
                            PI
                        </div>

                        <div>

                            <h2>
                                Profile Information
                            </h2>

                            <p>
                                Your professional profile.
                            </p>

                        </div>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">
                            <strong>Phone</strong>
                            <p>{profile.phone || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Gender</strong>
                            <p>{profile.gender || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Date of Birth</strong>
                            <p>{profile.dateOfBirth || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Address</strong>
                            <p>{profile.address || "-"}</p>
                        </div>

                        <div className="col-12">
                            <strong>Bio</strong>
                            <p>{profile.bio || "-"}</p>
                        </div>

                        <div className="col-12">
                            <strong>Career Goal</strong>
                            <p>{profile.careerGoal || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>College</strong>
                            <p>{profile.collegeName || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>University</strong>
                            <p>{profile.university || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Degree</strong>
                            <p>{profile.degree || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Branch</strong>
                            <p>{profile.branch || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>CGPA</strong>
                            <p>{profile.cgpa || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Graduation Year</strong>
                            <p>{profile.graduationYear || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Company</strong>
                            <p>{profile.companyName || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Designation</strong>
                            <p>{profile.designation || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>Experience</strong>
                            <p>{profile.experienceYears || "-"}</p>
                        </div>

                        <div className="col-md-6">
                            <strong>LinkedIn</strong>
                            <br />

                            {profile.linkedin ? (
                                <a
                                    href={
                                        profile.linkedin.startsWith("http://") ||
                                        profile.linkedin.startsWith("https://")
                                            ? profile.linkedin
                                            : `https://www.linkedin.com/in/${profile.linkedin}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-link"
                                >
                                    <i className="bi bi-linkedin"></i>
                                    LinkedIn Profile
                                </a>
                            ) : (
                                <p className="text-muted">Not Provided</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <strong>GitHub</strong>
                            <br />

                            {profile.github ? (
                                <a
                                    href={
                                        profile.github.startsWith("http://") ||
                                        profile.github.startsWith("https://")
                                            ? profile.github
                                            : `https://github.com/${profile.github}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-link"
                                >
                                    <i className="bi bi-github"></i>
                                    GitHub Profile
                                </a>
                            ) : (
                                <p className="text-muted">Not Provided</p>
                            )}
                        </div>

                    </div>

                    <div
                        className="profile-actions"
                        style={{ marginTop: "30px" }}
                    >

                        <button
                            className="btn btn-primary profile-save-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>

                        <button
                            className="btn btn-outline-danger"
                            onClick={handleDeleteProfile}
                        >
                            Delete Profile
                        </button>

                    </div>

                </div>

            </div>

        );

    }

    return (
        <div className="profile-page">

            <div className="page-header">

                <span className="dashboard-eyebrow">
                    PROFESSIONAL PORTFOLIO
                </span>

                <h1>My Profile</h1>

                <p>
                    Manage the information that represents your
                    professional identity on SkillForge.
                </p>

            </div>

            <form onSubmit={handleSubmit}>

                {/* Personal Information */}
                <div className="profile-section">

                    <div className="profile-section-heading">

                        <div className="profile-section-icon">
                            PI
                        </div>

                        <div>
                            <h2>Personal Information</h2>

                            <p>
                                Basic information about you and your
                                career objective.
                            </p>
                        </div>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                htmlFor="phone"
                                className="form-label"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter 10-digit phone number"
                                maxLength={10}
                                pattern="[0-9]{10}"
                                required
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="gender"
                                className="form-label"
                            >
                                Gender
                            </label>

                            <select
                                id="gender"
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Gender
                                </option>

                                <option value="MALE">
                                    Male
                                </option>

                                <option value="FEMALE">
                                    Female
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="dateOfBirth"
                                className="form-label"
                            >
                                Date of Birth
                            </label>

                            <DatePicker
                                id="dateOfBirth"
                                selected={dobDate}
                                onChange={handleDobChange}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select your date of birth"
                                minDate={new Date(1950, 0, 1)}
                                maxDate={getMaximumDob()}
                                popperPlacement="bottom-start"
                                popperClassName="modern-datepicker-popper"
                                popperContainer={({ children }) =>
                                    createPortal(children, document.body)
                                }
                                className="form-control modern-date-picker"
                                wrapperClassName="modern-date-picker-wrapper"
                                autoComplete="off"
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div className="custom-datepicker-header">

                                        <button
                                            type="button"
                                            className="datepicker-nav-btn"
                                            onClick={decreaseMonth}
                                            disabled={prevMonthButtonDisabled}
                                        >
                                            ‹
                                        </button>

                                        <select
                                            className="datepicker-month-select"
                                            value={date.getMonth()}
                                            onChange={(e) =>
                                                changeMonth(Number(e.target.value))
                                            }
                                        >
                                            {Array.from(
                                                { length: 12 },
                                                (_, index) => (
                                                    <option
                                                        key={index}
                                                        value={index}
                                                    >
                                                        {new Date(
                                                            2000,
                                                            index,
                                                            1
                                                        ).toLocaleString(
                                                            "default",
                                                            { month: "long" }
                                                        )}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                        <select
                                            className="datepicker-year-select"
                                            value={date.getFullYear()}
                                            onChange={(e) =>
                                                changeYear(Number(e.target.value))
                                            }
                                        >
                                            {Array.from(
                                                {
                                                    length:
                                                        getMaximumDob().getFullYear() -
                                                        1950 +
                                                        1,
                                                },
                                                (_, index) =>
                                                    1950 + index
                                            )
                                                .reverse()
                                                .map((year) => (
                                                    <option
                                                        key={year}
                                                        value={year}
                                                    >
                                                        {year}
                                                    </option>
                                                ))}
                                        </select>

                                        <button
                                            type="button"
                                            className="datepicker-nav-btn"
                                            onClick={increaseMonth}
                                            disabled={nextMonthButtonDisabled}
                                        >
                                            ›
                                        </button>

                                    </div>
                                )}
                            />

                            <small className="dob-helper">
                                You must be at least 16 years old.
                            </small>

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="address"
                                className="form-label"
                            >
                                Address
                            </label>

                            <input
                                id="address"
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                            />

                        </div>

                        <div className="col-12">

                            <label
                                htmlFor="bio"
                                className="form-label"
                            >
                                Bio
                            </label>

                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                rows="4"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Write a short professional bio..."
                            />

                        </div>

                        <div className="col-12">

                            <label
                                htmlFor="careerGoal"
                                className="form-label"
                            >
                                Career Goal
                            </label>

                            <textarea
                                id="careerGoal"
                                name="careerGoal"
                                className="form-control"
                                rows="4"
                                value={formData.careerGoal}
                                onChange={handleChange}
                                placeholder="Describe your career goal..."
                            />

                        </div>

                    </div>

                </div>

                {/* Education */}
                <div className="profile-section">

                    <div className="profile-section-heading">

                        <div className="profile-section-icon">
                            ED
                        </div>

                        <div>
                            <h2>Education</h2>

                            <p>
                                Add your academic background and
                                graduation details.
                            </p>
                        </div>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                htmlFor="collegeName"
                                className="form-label"
                            >
                                College Name
                            </label>

                            <input
                                id="collegeName"
                                type="text"
                                name="collegeName"
                                className="form-control"
                                value={formData.collegeName}
                                onChange={handleChange}
                                placeholder="Enter college name"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="university"
                                className="form-label"
                            >
                                University
                            </label>

                            <input
                                id="university"
                                type="text"
                                name="university"
                                className="form-control"
                                value={formData.university}
                                onChange={handleChange}
                                placeholder="Enter university"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="degree"
                                className="form-label"
                            >
                                Degree
                            </label>

                            <input
                                id="degree"
                                type="text"
                                name="degree"
                                className="form-control"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="Example: B.Tech"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="branch"
                                className="form-label"
                            >
                                Branch
                            </label>

                            <input
                                id="branch"
                                type="text"
                                name="branch"
                                className="form-control"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="Example: Computer Science"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="cgpa"
                                className="form-label"
                            >
                                CGPA
                            </label>

                            <input
                                id="cgpa"
                                type="number"
                                min="0"
                                max="10"
                                step="0.01"
                                step="0.01"
                                name="cgpa"
                                className="form-control"
                                value={formData.cgpa}
                                onChange={handleChange}
                                placeholder="Enter CGPA"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="graduationYear"
                                className="form-label"
                            >
                                Graduation Year
                            </label>

                            <input
                                id="graduationYear"
                                type="number"
                                min="1950"
                                max={new Date().getFullYear() + 10}
                                name="graduationYear"
                                className="form-control"
                                value={formData.graduationYear}
                                onChange={handleChange}
                                placeholder="Enter graduation year"
                            />

                        </div>

                    </div>

                </div>

                {/* Professional Information */}
                <div className="profile-section">

                    <div className="profile-section-heading">

                        <div className="profile-section-icon">
                            WK
                        </div>

                        <div>
                            <h2>Professional Information</h2>

                            <p>
                                Add your current employment and
                                professional experience.
                            </p>
                        </div>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                htmlFor="companyName"
                                className="form-label"
                            >
                                Company Name
                            </label>

                            <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                className="form-control"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="designation"
                                className="form-label"
                            >
                                Designation
                            </label>

                            <input
                                id="designation"
                                type="text"
                                name="designation"
                                className="form-control"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter designation"
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="experienceYears"
                                className="form-label"
                            >
                                Experience Years
                            </label>

                            <input
                                id="experienceYears"
                                type="number"
                                min="0"
                                step="0.1"
                                name="experienceYears"
                                className="form-control"
                                value={formData.experienceYears}
                                onChange={handleChange}
                                placeholder="Enter years of experience"
                            />

                        </div>

                    </div>

                </div>

                {/* Professional Links */}
                <div className="profile-section">

                    <div className="profile-section-heading">

                        <div className="profile-section-icon">
                            LN
                        </div>

                        <div>
                            <h2>Professional Links</h2>

                            <p>
                                Connect your external professional
                                profiles with SkillForge.
                            </p>
                        </div>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                htmlFor="linkedin"
                                className="form-label"
                            >
                                LinkedIn
                            </label>

                       <input
                            id="linkedin"
                            type="text"
                            name="linkedin"
                            className="form-control"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="LinkedIn username or profile URL"
                        />

                        </div>

                        <div className="col-md-6">

                            <label
                                htmlFor="github"
                                className="form-label"
                            >
                                GitHub
                            </label>

                            <input
                                id="github"
                                type="text"
                                name="github"
                                className="form-control"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="GitHub username or profile URL"
                            />

                        </div>

                    </div>

                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`alert profile-message ${
                            message.includes("successfully")
                                ? "alert-success"
                                : "alert-danger"
                        }`}
                    >
                        {message}
                    </div>
                )}

                {/* Save */}
                <div className="profile-actions">

                    <div className="profile-actions-info">

                        <h4>Complete Your Profile</h4>

                        <p>
                            Keep your information updated to build a stronger professional
                            portfolio, showcase your achievements, and improve your career
                            opportunities.
                        </p>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary profile-save-btn"
                    >
                        {profileExists
                            ? "Update Profile"
                            : "Create Profile"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleDeleteProfile}
                    >
                        Delete Profile
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Profile;