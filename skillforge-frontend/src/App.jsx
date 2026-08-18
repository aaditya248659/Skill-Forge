import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import LearningGoals from "./pages/LearningGoals";
import LearningResources from "./pages/LearningResources";
import Resume from "./pages/Resume";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserLayout from "./components/UserLayout";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectRoute";

function App() {
  return (
      <Routes>
          <Route
              path="/login"
              element={
                  <PublicRoute>
                      <Login />
                  </PublicRoute>
              }
          />

          <Route
              path="/register"
              element={
                  <PublicRoute>
                      <Register />
                  </PublicRoute>
              }
          />

          <Route
              element={
                  <ProtectedRoute>
                      <UserLayout />
                  </ProtectedRoute>
              }
          >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/learning-goals" element={<LearningGoals />} />
              <Route
                  path="/learning-resources"
                  element={<LearningResources />}
              />
              <Route path="/resume" element={<Resume />} />
          </Route>

          <Route
              path="/admin"
              element={
                  <AdminProtectedRoute>
                      <Admin />
                  </AdminProtectedRoute>
              }
          />

          <Route
              path="/admin-login"
              element={<AdminLogin />}
          />

          <Route path="/" element={<Home />} />
      </Routes>
  );
}

export default App;
