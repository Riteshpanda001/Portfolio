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
          <span>🔐</span>
          <h1>Admin Panel</h1>
          <p>Sign in to manage your portfolio</p>
        </div>

        <form id="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className={`contact-form__field ${errors.email ? 'contact-form__field--error' : ''}`}>
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="admin@example.com" autoComplete="email" />
            {errors.email && <span className="contact-form__error">{errors.email}</span>}
          </div>

          <div className={`contact-form__field ${errors.password ? 'contact-form__field--error' : ''}`}>
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" />
            {errors.password && <span className="contact-form__error">{errors.password}</span>}
          </div>

          {error && <p className="contact-form__api-error">{error}</p>}

          <Button type="submit" loading={loading} fullWidth size="lg">
            {loading ? 'Signing in…' : 'Sign In →'}
          </Button>
        </form>
      </div>
    </div>
  );
}
