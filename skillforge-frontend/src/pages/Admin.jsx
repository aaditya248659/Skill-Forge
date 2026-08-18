import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllUsers,
    getAdminDashboard,
    updateUserStatus,
    deleteUser,
} from "../services/adminService";

function Admin() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        blockedUsers: 0,
    });

    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const role = localStorage.getItem("adminRole");

        if (!token || role !== "ADMIN") {
            navigate("/admin-login", { replace: true });
            return;
        }

        loadAdminData();
    }, [navigate]);

    const loadAdminData = async () => {
        try {
            setLoading(true);
            setError("");

            const [dashboardData, usersData] =
                await Promise.all([
                    getAdminDashboard(),
                    getAllUsers(),
                ]);

            setDashboard(dashboardData);
            setUsers(usersData);
        } catch (err) {
            console.error(err);

            setError("Failed to load admin data");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (
        userId,
        accountStatus
    ) => {
        try {
            setMessage("");
            setError("");

            await updateUserStatus(
                userId,
                accountStatus
            );

            setMessage(
                "User status updated successfully"
            );

            await loadAdminData();
        } catch (err) {
            console.error(err);

            setError(
                "Failed to update user status"
            );
        }
    };

    const handleDelete = async (userId) => {
        if(!window.confirm(
            "Are you sure you want to delete this user?"
        )) {
            return;
        }

        try {
            setMessage("");
            setError("");

            await deleteUser(userId);

            alert("User deleted successfully");

            await loadAdminData();

            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUserId");
        localStorage.removeItem("adminFullName");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminRole");

        navigate("/admin-login", {
            replace: true,
        });
    };

    if (loading) {
        return (
            <p>Loading admin dashboard...</p>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1 className="fw-bold mb-1">
                        SkillForge Admin Dashboard
                    </h1>

                    <p className="text-muted mb-0">
                        Monitor users and manage SkillForge accounts.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {message && (
                <div className="alert alert-success mt-4">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-4">
                    {error}
                </div>
            )}

            <div className="mt-4">
                <h2 className="admin-section-heading">
                    Dashboard Summary
                </h2>

                <div className="row g-3">
                    <div className="col-sm-6 col-xl-3">
                        <div className="admin-stat-card">
                            <span className="admin-stat-label">
                                Total Users
                            </span>

                            <span className="admin-stat-number">
                                {dashboard.totalUsers}
                            </span>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="admin-stat-card">
                            <span className="admin-stat-label">
                                Active Users
                            </span>

                            <span className="admin-stat-number">
                                {dashboard.activeUsers}
                            </span>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="admin-stat-card">
                            <span className="admin-stat-label">
                                Inactive Users
                            </span>

                            <span className="admin-stat-number">
                                {dashboard.inactiveUsers}
                            </span>
                        </div>
                    </div>

                    <div className="col-sm-6 col-xl-3">
                        <div className="admin-stat-card">
                            <span className="admin-stat-label">
                                Blocked Users
                            </span>

                            <span className="admin-stat-number">
                                {dashboard.blockedUsers}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-card mt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                    <div>
                        <h2 className="section-title border-0 p-0 mb-1">
                            User Management
                        </h2>

                        <p className="text-muted mb-0">
                            View users, change account status, or
                            remove user accounts.
                        </p>
                    </div>

                    <span className="badge admin-user-count">
                        {users.length} Users
                    </span>
                </div>

                {users.length === 0 ? (
                    <div className="empty-state">
                        <p className="text-muted mb-0">
                            No users found.
                        </p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0 admin-user-table">
                            <thead className="table-light">
                                <tr>
                                    <th>User ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Profile Type</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                    <th className="text-end">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>

                                        <td className="fw-semibold">
                                            {user.fullName}
                                        </td>

                                        <td>{user.email}</td>

                                        <td>
                                            <span className="badge admin-info-badge">
                                                {user.profileType}
                                            </span>
                                        </td>

                                        <td>
                                            {user.roleName}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge admin-status-badge admin-status-${user.accountStatus?.toLowerCase()}`}
                                            >
                                                {user.accountStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm admin-status-select"
                                                value={user.accountStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        user.userId,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="ACTIVE">
                                                    Active
                                                </option>

                                                <option value="INACTIVE">
                                                    Inactive
                                                </option>

                                                <option value="BLOCKED">
                                                    Blocked
                                                </option>
                                            </select>
                                        </td>

                                        <td className="text-end">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(
                                                        user.userId
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;