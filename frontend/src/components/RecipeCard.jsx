import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ recipe }) {
  return (
    <article className="card recipe-card">
      <div className="recipe-image-wrapper">
        {recipe.image ? (
          <img
           src={recipe.image}
            alt={recipe.title}
            className="recipe-cover"
          />
        ) : (
          <div className="recipe-placeholder">
            <span>🍽️</span>
          </div>
        )}

        <div className="recipe-overlay">
          <span className="recipe-likes">❤️ {recipe.likes || 0}</span>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-top">
          <h3 className="recipe-title">{recipe.title}</h3>

          <p className="status-line">
            By <span className="recipe-author">{recipe.owner?.name || 'Guest'}</span>
          </p>
        </div>

        {recipe.tags?.length > 0 && (
          <div className="tag-list">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="recipe-description">
          {recipe.description?.length > 120
            ? `${recipe.description.slice(0, 120)}...`
            : recipe.description}
        </p>

        <div className="recipe-footer">
          <Link to={`/recipes/${recipe._id}`} className="recipe-link">
            <button className="view-recipe-btn">
              View Recipe
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}