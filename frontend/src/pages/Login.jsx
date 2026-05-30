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
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
        </label>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p>Need an account? <button className="secondary" type="button" onClick={() => navigate('/register')}>Register</button></p>
    </div>
  );
}
