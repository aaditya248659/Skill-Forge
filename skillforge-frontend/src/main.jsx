import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx';
import "./styles/styles.css";
import "./styles/home.css";
import "./styles/certificates.css";
import "./styles/dashboard.css";
import "./styles/learningGoals.css";
import "./styles/learningResources.css";
import "./styles/login.css";
import "./styles/profile.css";
import "./styles/projects.css";
import "./styles/register.css";
import "./styles/resume.css";
import "./styles/skills.css";
import "./styles/admin.css";
import "./styles/userLayout.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
