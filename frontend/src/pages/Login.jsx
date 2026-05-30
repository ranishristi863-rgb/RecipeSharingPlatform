import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken, saveCurrentUser } from '../api';

export default function Login({ onAuth }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', credentials);
      onAuth(data.user, data.token);
      setAuthToken(data.token);
      saveCurrentUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-intro">
          <span className="auth-badge">Welcome back</span>
          <h1>Sign in and keep cooking</h1>
          <p>
            Access your favorite recipes, save collections, and join a premium
            recipe community.
          </p>
        </div>

        <div className="auth-card card">
          <h2>Login</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </label>

            {error && <p className="form-error-text">{error}</p>}

            <button type="submit" className="submit-btn">
              Log in
            </button>
          </form>

          <p className="auth-footer-text">
            Need an account?{' '}
            <button className="secondary ghost" type="button" onClick={() => navigate('/register')}>
              Register
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
