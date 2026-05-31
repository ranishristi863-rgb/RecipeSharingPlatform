import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function RecipeForm({ user, editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    tags: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editMode || !id) return;

    api
      .get(`/recipes/${id}`)
      .then(({ data }) => {
        setValues({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients.join(', '),
          steps: data.steps.join('\n'),
          tags: data.tags.join(', ')
        });

        if (data.image) {
          setPreview(data.image);
        }
      })
      .catch(() => setError('Unable to load recipe for editing'));
  }, [editMode, id]);

  const handleChange = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append('image', image);
      }

      if (editMode && id) {
        await api.put(`/recipes/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await api.post('/recipes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="recipe-form-page">
      <div className="recipe-form-container card">
        <div className="recipe-form-header">
          <div className="form-badge">
            {editMode ? '✏️ Edit Recipe' : '🍳 Create Recipe'}
          </div>

          <h1 className="recipe-form-title">
            {editMode ? 'Update Your Recipe' : 'Share Your Delicious Recipe'}
          </h1>

          <p className="recipe-form-subtitle">
            Add recipe details, ingredients, cooking steps, and an image to
            share with the community.
          </p>
        </div>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Recipe Title
              </label>

              <input
                type="text"
                value={values.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter recipe title"
                className="form-input"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Description
              </label>

              <textarea
                rows="4"
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Write a short description about your recipe"
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Ingredients
              </label>

              <textarea
                rows="6"
                value={values.ingredients}
                onChange={(e) => handleChange('ingredients', e.target.value)}
                placeholder="Enter ingredients separated by commas"
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Cooking Steps
              </label>

              <textarea
                rows="6"
                value={values.steps}
                onChange={(e) => handleChange('steps', e.target.value)}
                placeholder="Write each cooking step on a new line"
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Tags / Categories
              </label>

              <input
                type="text"
                value={values.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="Example: Vegan, Dessert, Breakfast"
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Recipe Image
              </label>

              <div className="image-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />

                <div className="upload-placeholder">
                  <span className="upload-icon">📸</span>
                  <p>Upload a recipe image</p>
                </div>
              </div>

              {preview && (
                <div className="image-preview-wrapper">
                  <img
                    src={preview}
                    alt="Recipe Preview"
                    className="image-preview"
                  />
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? 'Saving Recipe...'
                : editMode
                ? 'Update Recipe'
                : 'Publish Recipe'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}