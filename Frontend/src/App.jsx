import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PublicNavbar from './components/Navbar/PublicNavbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import GmailModal from './components/common/GmailModal/GmailModal';
import AppRoutes from './routes/AppRoutes';
import './index.css';

// ============================================================
// AppShell — Layout differs between public and admin routes
// ============================================================
function AppShell() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isAdmin = location.pathname.startsWith('/admin');

  // Automatically sign out of the Admin section whenever navigating back to the home page or public pages
  useEffect(() => {
    if (!isAdmin && isAuthenticated) {
      logout();
    }
  }, [isAdmin, isAuthenticated, logout]);

  if (isAdmin) {
    // Admin routes: render ONLY the routes, no public nav/footer
    return (
      <>
        <AppRoutes />
        <GmailModal />
      </>
    );
  }

  // Public routes: render PublicNavbar + content + footer
  return (
    <>
      <PublicNavbar />
      <main
        id="main-content"
        style={{
          paddingTop: 'var(--navbar-h)',
          minHeight: 'calc(100vh - var(--navbar-h))',
        }}
      >
        <AppRoutes />
      </main>
      <Footer />
      <ScrollToTop />
      <GmailModal />
    </>
  );
}

// ============================================================
// App — root component
// ============================================================
export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <PortfolioProvider>
            <AppShell />
          </PortfolioProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
