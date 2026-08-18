import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        profileType: "STUDENT",
    });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await registerUser(formData);

            console.log(response);
            setSuccess(true);
            setMessage("Registration successful");
        } catch (error) {
            console.error(error);
            setSuccess(false);
            setMessage("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <h1 className="auth-brand">SkillForge</h1>

                    <h2 className="h4 fw-bold">
                        Create Account
                    </h2>

                    <p className="text-muted mb-0">
                        Create your account and start building
                        your professional portfolio.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="fullName"
                            className="form-label"
                        >
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={formData.fullName}
                            onChange={handleChange}
                            autoComplete="name"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerEmail"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="registerEmail"
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerPassword"
                            className="form-label"
                        >
                            Password
                        </label>

                        <input
                            id="registerPassword"
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="profileType"
                            className="form-label"
                        >
                            Profile Type
                        </label>

                        <select
                            id="profileType"
                            name="profileType"
                            className="form-select"
                            value={formData.profileType}
                            onChange={handleChange}
                        >
                            <option value="STUDENT">
                                Student
                            </option>

                            <option value="FRESHER">
                                Fresher
                            </option>

                            <option value="PROFESSIONAL">
                                Professional
                            </option>
                        </select>
                    </div>

                    {message && (
                        <div
                            className={`alert ${
                                success
                                    ? "alert-success"
                                    : "alert-danger"
                            } py-2`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );

}

export default Register;