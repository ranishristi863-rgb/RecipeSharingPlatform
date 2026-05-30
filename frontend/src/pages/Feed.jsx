import { useEffect, useState } from 'react';
import api from '../api';
import RecipeCard from '../components/RecipeCard';
import './Feed.css';

const categories = ['Breakfast', 'Vegan', 'Dessert', 'Quick Meals'];

export default function Feed({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const params = {};

      if (query) params.q = query;
      if (tag) params.tag = tag;

      const { data } = await api.get('/recipes', { params });

      setRecipes(data);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query, tag]);

  return (
    <section className="feed-page">
      <div className="hero-section card">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">🍳 Community Recipe Platform</div>

            <h1 className="hero-title">
              Discover, Cook & Share Amazing Recipes
            </h1>

            <p className="hero-description">
              Explore delicious recipes shared by food lovers around the world.
              Search recipes, discover categories, and save your favorites.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-pill">
                Browse recipes
              </button>
              <button type="button" className="secondary-pill">
                Share a recipe
              </button>
            </div>

            <div className="hero-pill-list">
              {categories.map((category) => (
                <span key={category} className="hero-pill">
                  #{category}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-media-card">
              <img
  src="/chef-pick.jpg"
  alt="Chef's Pick"
  className="hero-media-photo"
/>
              <div className="hero-media-copy">
                <span>Chef’s Pick</span>
                <h3>Elevate your next meal</h3>
                <p>Fresh recipes with premium plating inspiration.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="search-filter-wrapper">
          <div className="search-box">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="feed-header">
        <div>
          <h2 className="section-title">
            Latest Recipes
          </h2>

          <p className="section-subtitle">
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {loading ? (
        <div className="card loading-card">
          <div className="loader"></div>
          <p>Loading delicious recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">🍽️</div>

          <h3>No Recipes Found</h3>

          <p>
            Try searching with different keywords or select another category.
          </p>
        </div>
      ) : (
        <div className="grid recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              user={user}
            />
          ))}
        </div>
      )}
    </section>
  );
}