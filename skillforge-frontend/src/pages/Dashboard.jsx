import { Link } from "react-router-dom";

function Dashboard() {
    const fullName = localStorage.getItem("fullName");

    const firstName = fullName
        ? fullName.trim().split(" ")[0]
        : "User";

    return (
        <div className="dashboard-page">

            {/* Welcome Section */}
            <section className="dashboard-welcome">
                <div>
                    <span className="dashboard-eyebrow">
                        SKILLFORGE DASHBOARD
                    </span>

                    <h1>
                        Welcome back, {firstName}
                    </h1>

                    <p>
                        Build your professional portfolio, track your
                        learning progress, and grow your skills from
                        one place.
                    </p>
                </div>

                <Link
                    to="/profile"
                    className="btn btn-primary dashboard-profile-btn"
                >
                    Update Profile
                </Link>
            </section>


            {/* Main Modules */}
            <section className="dashboard-section">
                <div className="dashboard-section-header">
                    <div>
                        <h2>Your Workspace</h2>
                        <p>
                            Access and manage your SkillForge modules.
                        </p>
                    </div>
                </div>

                <div className="row g-4">

                    {/* Profile */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/profile"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    PF
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Professional Profile</h3>

                                    <p>
                                        Manage your education,
                                        experience, bio, and career
                                        goal.
                                    </p>

                                    <span className="dashboard-card-action">
                                        Manage Profile →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>


                    {/* Skills */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/skills"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    SK
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Skills</h3>

                                    <p>
                                        Add your technical and
                                        professional skills and track
                                        your proficiency.
                                    </p>

                                    <span className="dashboard-card-action">
                                        Manage Skills →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>


                    {/* Projects */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/projects"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    PR
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Projects</h3>

                                    <p>
                                        Showcase projects,
                                        technologies, GitHub links,
                                        and project experience.
                                    </p>

                                    <span className="dashboard-card-action">
                                        View Projects →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>


                    {/* Certificates */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/certificates"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    CT
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Certificates</h3>

                                    <p>
                                        Store your certifications,
                                        issuing organizations, and
                                        credential information.
                                    </p>

                                    <span className="dashboard-card-action">
                                        View Certificates →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>


                    {/* Learning Goals */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/learning-goals"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    LG
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Learning Goals</h3>

                                    <p>
                                        Set learning goals, target
                                        dates, status, and track your
                                        progress.
                                    </p>

                                    <span className="dashboard-card-action">
                                        Track Goals →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>


                    {/* Resume */}
                    <div className="col-md-6 col-xl-4">
                        <Link
                            to="/resume"
                            className="dashboard-module-link"
                        >
                            <div className="dashboard-module-card">
                                <div className="dashboard-module-icon">
                                    CV
                                </div>

                                <div className="dashboard-module-content">
                                    <h3>Resume</h3>

                                    <p>
                                        Manage your resume alongside
                                        your professional SkillForge
                                        portfolio.
                                    </p>

                                    <span className="dashboard-card-action">
                                        Manage Resume →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </section>


            {/* AI Section */}
            <section className="dashboard-ai-banner">
                <div className="dashboard-ai-icon">
                    AI
                </div>

                <div className="dashboard-ai-content">
                    <span>AI CAREER ASSISTANT</span>

                    <h2>
                        Get personalized career recommendations
                    </h2>

                    <p>
                        Analyze your profile and skills to discover
                        skill gaps, recommended skills, learning
                        resources, and a personalized roadmap.
                    </p>
                </div>

                <Link
                    to="/learning-resources"
                    className="dashboard-ai-btn"
                >
                    Generate Recommendations →
                </Link>
            </section>

        </div>
    );
}

export default Dashboard;