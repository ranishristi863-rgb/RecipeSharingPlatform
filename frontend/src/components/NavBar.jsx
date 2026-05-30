import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar({ user, onLogout }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-icon">🍴</span>
          <span className="brand-text">RecipeShare</span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={isActive('/') ? 'active-link' : ''}
            onClick={closeMenu}
          >
            Feed
          </Link>

          {user ? (
            <>
              <Link
                to="/recipes/new"
                className={isActive('/recipes/new') ? 'active-link' : ''}
                onClick={closeMenu}
              >
                New Recipe
              </Link>

              <button
                type="button"
                className="logout-btn"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={isActive('/login') ? 'active-link' : ''}
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`nav-register ${
                  isActive('/register') ? 'active-register' : ''
                }`}
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}