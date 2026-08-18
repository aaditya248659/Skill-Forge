import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

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
            const response = await loginUser(formData);

            if (response.role === "ADMIN") {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("fullName");
                localStorage.removeItem("email");
                localStorage.removeItem("role");

                setMessage("Please use the Admin Login page.");
                return;
            }

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("fullName", response.fullName);
            localStorage.setItem("email", response.email);
            localStorage.setItem("role", response.role);

            navigate("/dashboard", { replace: true });
        
        } catch (error) {
            console.error(error);
            setMessage("Login failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="text-center mb-4">
                    <h1 className="auth-brand">SkillForge</h1>
                    <h2 className="h4 fw-bold">Welcome Back</h2>

                    <p className="text-muted mb-0">
                        Sign in to continue to your portfolio.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="email"
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
                            htmlFor="password"
                            className="form-label"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {message && (
                        <div className="alert alert-danger py-2">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );

}

export default Login;