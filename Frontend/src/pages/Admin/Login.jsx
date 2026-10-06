import { useState }          from 'react';
import { useNavigate }        from 'react-router-dom';
import { useAuth }            from '../../context/AuthContext';
import { validateLoginForm }  from '../../utils/validators';
import Button                 from '../../components/Button/Button';
import './Admin.css';

// ============================================================
// Admin Login Page
// ============================================================

export default function Login() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: errs } = validateLoginForm(form);
    if (!isValid) { setErrors(errs); return; }
    try {
      await login(form);
      navigate('/admin');
    } catch {
      // error is displayed via context
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card card animate-fadeInUp">
        <div className="admin-login__logo">
          <span className="admin-login__icon">🔐</span>
          <h1>Admin Panel</h1>
          <p>Sign in to manage your portfolio</p>
        </div>

        <form id="admin-login-form" className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className={`admin-login__field ${errors.email ? 'admin-login__field--error' : ''}`}>
            <label htmlFor="admin-email" className="admin-login__label">Email Address</label>
            <input
              id="admin-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="riteshkumarpanda001@gmail.com"
              autoComplete="email"
              className="admin-login__input"
            />
            {errors.email && <span className="admin-login__error">{errors.email}</span>}
          </div>

          <div className={`admin-login__field ${errors.password ? 'admin-login__field--error' : ''}`}>
            <label htmlFor="admin-password" className="admin-login__label">Password</label>
            <input
              id="admin-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••••••••••"
              autoComplete="current-password"
              className="admin-login__input"
            />
            {errors.password && <span className="admin-login__error">{errors.password}</span>}
          </div>

          {error && <div className="admin-login__api-error">{error}</div>}

          <div className="admin-login__submit-wrap">
            <Button type="submit" loading={loading} fullWidth size="lg">
              {loading ? 'Signing in…' : 'Sign In →'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
