import { Link, useNavigate } from "react-router-dom";

function Home() {
    const Navigate = useNavigate();

    const token = localStorage.getItem("token");
    const fullName = localStorage.getItem("fullName");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        Navigate("/", { replace: true });
    };

    return (
        <div className="landing-page">

            {/* Navbar */}
            <nav className="landing-navbar">
                <div className="landing-container landing-nav-content">
                    <Link to="/" className="landing-logo">
                        <span className="landing-logo-icon">S</span>
                        <span>SkillForge</span>
                    </Link>

                    <div className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                    </div>

                    <div className="landing-nav-actions">
                        {token ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="btn landing-primary-btn"
                                >
                                    {fullName
                                        ? `${fullName}'s Dashboard`
                                        : "Dashboard"}
                                </Link>

                                <button
                                    type="button"
                                    className="btn landing-login-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="btn landing-login-btn"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn landing-primary-btn"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero */}
                <section className="landing-hero">
                    <div className="landing-container">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-6">
                                <div className="hero-badge">
                                    Professional Growth Platform
                                </div>

                                <h1 className="landing-hero-title">
                                    Build your skills.
                                    <span> Shape your career.</span>
                                </h1>

                                <p className="landing-hero-description">
                                    Build your professional portfolio,
                                    track your learning journey, showcase
                                    your achievements, and discover what
                                    to learn next with SkillForge.
                                </p>

                                <div className="landing-hero-actions">
                                    <Link
                                        to={
                                            token
                                                ? "/dashboard"
                                                : "/register"
                                        }
                                        className="btn landing-primary-btn landing-hero-btn"
                                    >
                                        {token
                                            ? "Go to Your Dashboard"
                                            : "Start Building Your Portfolio"}
                                        <span>→</span>
                                    </Link>

                                    <a
                                        href="#features"
                                        className="btn landing-secondary-btn landing-hero-btn"
                                    >
                                        Explore Features
                                    </a>
                                </div>

                                <div className="hero-highlights">
                                    <span>✓ Track Skills</span>
                                    <span>✓ Build Portfolio</span>
                                    <span>✓ Plan Learning</span>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="hero-dashboard-preview">
                                    <div className="preview-topbar">
                                        <div className="preview-logo">
                                            <span>S</span>
                                            SkillForge
                                        </div>

                                        <div className="preview-avatar">
                                            AP
                                        </div>
                                    </div>

                                    <div className="preview-body">
                                        <div className="preview-sidebar">
                                            <div className="preview-nav active">
                                                Dashboard
                                            </div>

                                            <div className="preview-nav">
                                                Profile
                                            </div>

                                            <div className="preview-nav">
                                                Skills
                                            </div>

                                            <div className="preview-nav">
                                                Projects
                                            </div>

                                            <div className="preview-nav">
                                                Learning
                                            </div>
                                        </div>

                                        <div className="preview-content">
                                            <div className="preview-welcome">
                                                <small>
                                                    YOUR WORKSPACE
                                                </small>

                                                <h3>
                                                    Keep growing.
                                                </h3>

                                                <p>
                                                    Your professional
                                                    journey in one place.
                                                </p>
                                            </div>

                                            <div className="preview-stats">
                                                <div>
                                                    <strong>Skills</strong>
                                                    <span>
                                                        Track proficiency
                                                    </span>
                                                </div>

                                                <div>
                                                    <strong>Goals</strong>
                                                    <span>
                                                        Measure progress
                                                    </span>
                                                </div>

                                                <div>
                                                    <strong>Projects</strong>
                                                    <span>
                                                        Showcase work
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="preview-progress-card">
                                                <div className="d-flex justify-content-between">
                                                    <strong>
                                                        Learning Progress
                                                    </strong>

                                                    <span>68%</span>
                                                </div>

                                                <div className="preview-progress">
                                                    <div />
                                                </div>
                                            </div>

                                            <div className="preview-ai-card">
                                                <span className="preview-ai-icon">
                                                    ✦
                                                </span>

                                                <div>
                                                    <strong>
                                                        Career Recommendations
                                                    </strong>

                                                    <p>
                                                        Discover skills and
                                                        learning resources
                                                        based on your goals.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="landing-section landing-features"
                >
                    <div className="landing-container">
                        <div className="landing-section-heading">
                            <span className="section-eyebrow">
                                EVERYTHING IN ONE PLACE
                            </span>

                            <h2>
                                Tools for your professional growth
                            </h2>

                            <p>
                                Organize your skills, achievements,
                                learning plans, and career development
                                from one workspace.
                            </p>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card">
                                    <div className="feature-icon">
                                        01
                                    </div>

                                    <h3>Professional Profile</h3>

                                    <p>
                                        Maintain your education,
                                        experience, bio, and career goals
                                        in a structured professional
                                        profile.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card">
                                    <div className="feature-icon">
                                        02
                                    </div>

                                    <h3>Skill Tracking</h3>

                                    <p>
                                        Organize your skills by category
                                        and proficiency level as your
                                        capabilities grow.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card">
                                    <div className="feature-icon">
                                        03
                                    </div>

                                    <h3>Project Portfolio</h3>

                                    <p>
                                        Showcase projects, technologies,
                                        project links, and GitHub work in
                                        your portfolio.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card">
                                    <div className="feature-icon">
                                        04
                                    </div>

                                    <h3>Certificates</h3>

                                    <p>
                                        Keep certifications and
                                        credentials organized alongside
                                        your professional achievements.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card">
                                    <div className="feature-icon">
                                        05
                                    </div>

                                    <h3>Learning Goals</h3>

                                    <p>
                                        Set learning goals, target dates,
                                        statuses, and progress to keep
                                        development measurable.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-4">
                                <div className="landing-feature-card feature-card-highlight">
                                    <div className="feature-icon">
                                        ✦
                                    </div>

                                    <h3>Smart Recommendations</h3>

                                    <p>
                                        Analyze your profile, skills, and
                                        career goal to identify skill gaps
                                        and receive a learning roadmap.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section
                    id="how-it-works"
                    className="landing-section how-section"
                >
                    <div className="landing-container">
                        <div className="landing-section-heading">
                            <span className="section-eyebrow">
                                SIMPLE WORKFLOW
                            </span>

                            <h2>
                                Turn career goals into progress
                            </h2>

                            <p>
                                Build your professional profile and use it
                                to guide your learning journey.
                            </p>
                        </div>

                        <div className="how-grid">
                            <div className="how-item">
                                <div className="how-number">
                                    1
                                </div>

                                <h3>Create your profile</h3>

                                <p>
                                    Add your education, experience,
                                    professional information, and career
                                    goal.
                                </p>
                            </div>

                            <div className="how-connector" />

                            <div className="how-item">
                                <div className="how-number">
                                    2
                                </div>

                                <h3>Build your portfolio</h3>

                                <p>
                                    Add skills, projects, certificates,
                                    resources, and learning goals.
                                </p>
                            </div>

                            <div className="how-connector" />

                            <div className="how-item">
                                <div className="how-number">
                                    3
                                </div>

                                <h3>Plan what comes next</h3>

                                <p>
                                    Track your progress and generate
                                    recommendations aligned with your
                                    career direction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Section */}
                <section className="landing-ai-section">
                    <div className="landing-container">
                        <div className="landing-ai-panel">
                            <div className="row align-items-center g-5">
                                <div className="col-lg-6">
                                    <span className="ai-label">
                                        ✦ SMART CAREER GUIDANCE
                                    </span>

                                    <h2>
                                        Know what to learn next.
                                    </h2>

                                    <p>
                                        SkillForge uses your profile,
                                        existing skills, and career goal
                                        to provide personalized guidance
                                        for your learning journey.
                                    </p>

                                    <div className="ai-feature-list">
                                        <div>
                                            <span>✓</span>
                                            Career summary
                                        </div>

                                        <div>
                                            <span>✓</span>
                                            Skill gap identification
                                        </div>

                                        <div>
                                            <span>✓</span>
                                            Recommended skills
                                        </div>

                                        <div>
                                            <span>✓</span>
                                            Learning roadmap
                                        </div>

                                        <div>
                                            <span>✓</span>
                                            Learning resources
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="ai-demo-card">
                                        <div className="ai-demo-header">
                                            <span className="ai-demo-symbol">
                                                ✦
                                            </span>

                                            <div>
                                                <strong>
                                                    Your Learning Roadmap
                                                </strong>

                                                <small>
                                                    Personalized to your
                                                    career goal
                                                </small>
                                            </div>
                                        </div>

                                        <div className="ai-roadmap-item">
                                            <span>1</span>

                                            <div>
                                                <strong>
                                                    Strengthen Core Skills
                                                </strong>

                                                <p>
                                                    Build a stronger
                                                    technical foundation.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ai-roadmap-item">
                                            <span>2</span>

                                            <div>
                                                <strong>
                                                    Close Skill Gaps
                                                </strong>

                                                <p>
                                                    Focus learning on
                                                    missing capabilities.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ai-roadmap-item">
                                            <span>3</span>

                                            <div>
                                                <strong>
                                                    Build Projects
                                                </strong>

                                                <p>
                                                    Apply your knowledge
                                                    through practical work.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ai-roadmap-item">
                                            <span>4</span>

                                            <div>
                                                <strong>
                                                    Track Your Growth
                                                </strong>

                                                <p>
                                                    Update goals and
                                                    portfolio as you
                                                    progress.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="landing-cta-section">
                    <div className="landing-container">
                        <div className="landing-cta">
                            <span className="section-eyebrow">
                                {token
                                    ? "CONTINUE YOUR JOURNEY"
                                    : "START YOUR JOURNEY"}
                            </span>

                            <h2>
                                Your skills deserve more than a list.
                            </h2>

                            <p>
                                Build a portfolio that grows with you and
                                keep your learning journey moving forward.
                            </p>

                            <Link
                                to={
                                    token
                                        ? "/dashboard"
                                        : "/register"
                                }
                                className="btn landing-cta-btn"
                            >
                                {token
                                    ? "Continue to Your Dashboard"
                                    : "Create Your SkillForge Account"}

                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-container">
                    <div className="landing-footer-content">
                        <Link
                            to="/"
                            className="landing-logo footer-logo"
                        >
                            <span className="landing-logo-icon">
                                S
                            </span>

                            <span>SkillForge</span>
                        </Link>

                        <p>
                            Professional Skill Portfolio & Learning
                            Tracker
                        </p>

                        <div className="landing-footer-links">
                            <a href="#features">
                                Features
                            </a>

                            <a href="#how-it-works">
                                How It Works
                            </a>

                            {token ? (
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login">
                                        Login
                                    </Link>

                                    <Link to="/register">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="landing-footer-bottom">
                        <span>
                            © 2026 SkillForge
                        </span>

                        <span>
                            Build. Learn. Grow.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;