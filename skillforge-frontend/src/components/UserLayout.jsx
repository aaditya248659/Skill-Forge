import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function UserLayout() {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const fullName = localStorage.getItem("fullName") || "User";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("aiRecommendation");

        navigate("/login", { replace: true });
    };

    const getNavClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (

        <div className={`user-layout ${collapsed ? "collapsed" : ""}`}>

            <aside className="skillforge-sidebar">

                <div className="sidebar-top">

                    {!collapsed && (
                        <NavLink
                            className="skillforge-user-brand"
                            to="/"
                        >
                            <span className="skillforge-brand-icon">
                                SF
                            </span>

                            <span className="brand-text">
                                SkillForge
                            </span>
                        </NavLink>
                    )}

                    <button
                        type="button"
                        className="sidebar-toggle-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <i
                            className={
                                collapsed
                                    ? "bi bi-list"
                                    : "bi bi-chevron-left"
                            }
                        />
                    </button>

                </div>

                <div className="sidebar-menu">

                    <NavLink
                        className={getNavClass}
                        to="/dashboard"
                    >
                        <i className="bi bi-grid-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Dashboard</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/profile"
                    >
                        <i className="bi bi-person-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Profile</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/skills"
                    >
                        <i className="bi bi-stars menu-icon"></i>

                        {!collapsed && (
                            <span>Skills</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/projects"
                    >
                        <i className="bi bi-briefcase-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Projects</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/certificates"
                    >
                        <i className="bi bi-patch-check-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Certificates</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/learning-goals"
                    >
                        <i className="bi bi-bullseye menu-icon"></i>

                        {!collapsed && (
                            <span>Goals</span>
                        )}
                    </NavLink>
                                        <NavLink
                        className={getNavClass}
                        to="/learning-resources"
                    >
                        <i className="bi bi-book-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Resources</span>
                        )}
                    </NavLink>

                    <NavLink
                        className={getNavClass}
                        to="/resume"
                    >
                        <i className="bi bi-file-earmark-person-fill menu-icon"></i>

                        {!collapsed && (
                            <span>Resume</span>
                        )}
                    </NavLink>

                </div>

                <div className="sidebar-footer">

                    <div className="user-navbar-account">

                        <div className="user-avatar">
                            {fullName
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        {!collapsed && (

                            <div className="user-navbar-info">

                                <span>
                                    Signed in as
                                </span>

                                <strong>
                                    {fullName}
                                </strong>

                            </div>

                        )}

                    </div>

                    <button
                        type="button"
                        className="user-logout-btn"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right menu-icon"></i>

                        {!collapsed && (
                            <span>Logout</span>
                        )}
                    </button>

                </div>

            </aside>

            <main className="user-main-content">

                <div className="page-container">

                    <Outlet />

                </div>

            </main>

        </div>

    );
}

export default UserLayout;