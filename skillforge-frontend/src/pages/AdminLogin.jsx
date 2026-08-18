import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const role = localStorage.getItem("adminRole");

        if (token && role === "ADMIN") {
            navigate("/admin", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clearLoginData = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUserId");
        localStorage.removeItem("adminFullName");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminRole");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);

            if (data.role !== "ADMIN") {
                clearLoginData();
                setError("Admin access only");
                return;
            }

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminRole", data.role);

            if (data.userId !== undefined && data.userId !== null) {
                localStorage.setItem("adminUserId", data.userId);
            }

            if (data.fullName) {
                localStorage.setItem("adminFullName", data.fullName);
            }

            if (data.email) {
                localStorage.setItem("adminEmail", data.email);
            }

            navigate("/admin", { replace: true });
        } catch (err) {
            console.error(err);

            clearLoginData();

            setError("Invalid admin email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card admin-login-card">
                <div className="text-center mb-4">
                    <h1 className="auth-brand">
                        SkillForge
                    </h1>

                    <div className="admin-label mb-3">
                        Administration
                    </div>

                    <h2 className="h4 fw-bold">
                        Admin Login
                    </h2>

                    <p className="text-muted mb-0">
                        Sign in to access the SkillForge
                        administration dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="adminEmail"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="adminEmail"
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            placeholder="Enter admin email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="adminPassword"
                            className="form-label"
                        >
                            Password
                        </label>

                        <input
                            id="adminPassword"
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {error && (
                        <div
                            className="alert alert-danger py-2"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    aria-hidden="true"
                                />
                                Logging in...
                            </>
                        ) : (
                            "Admin Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;