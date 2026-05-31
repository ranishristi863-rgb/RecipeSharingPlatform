import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import CommentList from '../components/CommentList';

export default function RecipeDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [likeState, setLikeState] = useState({ likes: 0, liked: false });

  const fetchRecipe = async () => {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      setRecipe(data);
      setLikeState({ likes: data.likes, liked: user ? Boolean(user.likedRecipes && user.likedRecipes.includes && user.likedRecipes.includes(id)) : false });
    } catch (err) {
      setError('Unable to load recipe');
    }
  };

  const fetchComments = async () => {
    const { data } = await api.get(`/recipes/${id}/comments`);
    setComments(data);
  };

  useEffect(() => {
    fetchRecipe();
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    if (!user) return navigate('/login');
    try {
      const { data } = await api.post(`/recipes/${id}/like`);
      setLikeState(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update like');
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    if (!user) return navigate('/login');
    try {
      await api.post(`/recipes/${id}/comments`, { text: commentText });
      setCommentText('');
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to post comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch (err) {
      setError('Unable to delete recipe');
    }
  };

  if (!recipe) return <div className="card"><p>Loading recipe...</p></div>;

  return (
    <section className="recipe-detail-page">
      <div className="detail-hero card">
        {recipe.image && (
          <img
            className="recipe-detail-cover"
            src={recipe.image}
            alt={recipe.title}
          />
        )}

        <div className="detail-header">
          <p className="detail-meta">
            By {recipe.owner?.name} · {new Date(recipe.createdAt).toLocaleDateString()}
          </p>

          <h1>{recipe.title}</h1>

          <p className="detail-description">{recipe.description}</p>

          <div className="tag-list detail-tag-list">
            {recipe.tags?.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button onClick={handleLike}>
              {likeState.liked ? 'Unlike' : 'Like'} ({likeState.likes})
            </button>
            {user && String(recipe.owner?._id) === user.id && (
              <>
                <button className="secondary" onClick={() => navigate(`/recipes/${id}/edit`)}>
                  Edit
                </button>
                <button className="danger" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="card detail-panel">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="card detail-panel">
          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={`${step}-${index}`}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card detail-panel">
        <h3>Add a comment</h3>
        <form onSubmit={handleComment} className="detail-comment-form">
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit">Post comment</button>
        </form>
        {error && <p className="form-error-text">{error}</p>}
      </div>

      <CommentList comments={comments} />
    </section>
  );
}
