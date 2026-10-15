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
        {/* Public Routes */}
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

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Single Admin Route — in-page section switching */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Legacy admin sub-routes redirect to single admin route */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
