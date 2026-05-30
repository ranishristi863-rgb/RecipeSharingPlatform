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
    </div>
  );
}

export default App;
