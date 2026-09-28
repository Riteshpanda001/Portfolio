import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useAuth } from '../context/AuthContext';

// ── Public pages (lazy loaded) ────────────────────────────────
const Home           = lazy(() => import('../pages/Home/Home'));
const About          = lazy(() => import('../pages/About/About'));
const Skills         = lazy(() => import('../pages/Skills/Skills'));
const Projects       = lazy(() => import('../pages/Projects/Projects'));
const ProjectDetails = lazy(() => import('../pages/Projects/ProjectDetails'));
const Experience     = lazy(() => import('../pages/Experience/Experience'));
const Education      = lazy(() => import('../pages/Education/Education'));
const Certifications = lazy(() => import('../pages/Certifications/Certifications'));
const Contact        = lazy(() => import('../pages/Contact/Contact'));
const Resume         = lazy(() => import('../pages/Resume/Resume'));

// ── Admin pages (lazy loaded) ─────────────────────────────────
const AdminLogin     = lazy(() => import('../pages/Admin/Login'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminProjects  = lazy(() => import('../pages/Admin/Projects'));
const AdminMessages  = lazy(() => import('../pages/Admin/Messages'));
const AdminProfile   = lazy(() => import('../pages/Admin/Profile'));

// ── Protected route wrapper ───────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

// ── App Routes ────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading variant="page" />}>
      <Routes>
        {/* Public */}
        <Route path="/"                      element={<Home />} />
        <Route path="/about"                 element={<About />} />
        <Route path="/skills"                element={<Skills />} />
        <Route path="/projects"              element={<Projects />} />
        <Route path="/projects/:id"          element={<ProjectDetails />} />
        <Route path="/experience"            element={<Experience />} />
        <Route path="/education"             element={<Education />} />
        <Route path="/certifications"        element={<Certifications />} />
        <Route path="/contact"               element={<Contact />} />
        <Route path="/resume"                element={<Resume />} />

        {/* Admin */}
        <Route path="/admin/login"           element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        }/>
        <Route path="/admin/projects" element={
          <ProtectedRoute><AdminProjects /></ProtectedRoute>
        }/>
        <Route path="/admin/messages" element={
          <ProtectedRoute><AdminMessages /></ProtectedRoute>
        }/>
        <Route path="/admin/profile" element={
          <ProtectedRoute><AdminProfile /></ProtectedRoute>
        }/>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
