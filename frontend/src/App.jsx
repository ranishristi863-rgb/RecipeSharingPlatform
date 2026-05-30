import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { getCurrentUser, saveCurrentUser, setAuthToken } from './api';
import NavBar from './components/NavBar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeForm from './pages/RecipeForm';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  const handleLogin = (userData, token) => {
    saveCurrentUser(userData);
    setAuthToken(token);
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    setAuthToken(null);
    saveCurrentUser(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <NavBar user={user} onLogout={handleLogout} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Feed user={user} />} />
          <Route path="/login" element={<Login onAuth={handleLogin} />} />
          <Route path="/register" element={<Register onAuth={handleLogin} />} />
          <Route path="/recipes/new" element={user ? <RecipeForm user={user} /> : <Navigate to="/login" />} />
          <Route path="/recipes/:id/edit" element={user ? <RecipeForm user={user} editMode /> : <Navigate to="/login" />} />
          <Route path="/recipes/:id" element={<RecipeDetail user={user} />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-group">
            <div className="footer-brand">RecipeShare</div>
            <p>Premium recipe discovery for home chefs and food lovers.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#!">Home</a>
            <a href="#!">New Recipe</a>
            <a href="#!">Login</a>
            <a href="#!">Register</a>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>
            <a href="#!">Breakfast</a>
            <a href="#!">Vegan</a>
            <a href="#!">Dessert</a>
            <a href="#!">Quick Meals</a>
          </div>

          <div className="footer-column">
            <h4>Social</h4>
            <a href="#!">Instagram</a>
            <a href="#!">Pinterest</a>
            <a href="#!">Dribbble</a>
            <a href="#!">Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} RecipeShare. Crafted for tasty inspiration.
        </div>
      </footer>
    </div>
  );
}

export default App;
