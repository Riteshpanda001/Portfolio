import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import GmailModal from './components/common/GmailModal/GmailModal';
import AppRoutes from './routes/AppRoutes';
import './index.css';

// ============================================================
// AppShell — Top Navbar rendered for all pages (Image 2)
// ============================================================
function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Top Navbar (Image 2) present across all routes */}
      <Navbar />

      <main
        id="main-content"
        style={{
          paddingTop: 'var(--navbar-h)',
          minHeight: 'calc(100vh - var(--navbar-h))',
        }}
      >
        <AppRoutes />
      </main>

      {/* Public Footer & Scroll-To-Top only rendered for visitor pages */}
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}

      {/* Gmail modal accessible across application */}
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
