import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }      from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar      from './components/Navbar/Navbar';
import Footer      from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AppRoutes   from './routes/AppRoutes';
import './index.css';

// ============================================================
// App — root component
// ============================================================

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <Navbar />

          <main id="main-content" style={{ paddingTop: 'var(--navbar-h)' }}>
            <AppRoutes />
          </main>

          <Footer />
          <ScrollToTop />
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
