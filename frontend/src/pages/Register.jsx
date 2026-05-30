import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken, saveCurrentUser } from '../api';

export default function Register({ onAuth }) {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/register', values);
      onAuth(data.user, data.token);
      setAuthToken(data.token);
      saveCurrentUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-intro">
          <span className="auth-badge">Join RecipeShare</span>
          <h1>Create your free account</h1>
          <p>
            Start sharing recipes, saving favorites, and building a premium food
            inspiration library.
          </p>
        </div>

        <div className="auth-card card">
          <h2>Register</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Name
              <input
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </label>

            {error && <p className="form-error-text">{error}</p>}

            <button type="submit" className="submit-btn">
              Create account
            </button>
          </form>

          <p className="auth-footer-text">
            Already registered?{' '}
            <button className="secondary ghost" type="button" onClick={() => navigate('/login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
