const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  try {
    const { q, tag, sort } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [
        { title: regex },
        { description: regex },
        { ingredients: regex },
        { tags: regex }
      ];
    }
    if (tag) filter.tags = tag;

    const recipes = await Recipe.find(filter)
      .sort(sort === 'newest' ? { createdAt: -1 } : { title: 1 })
      .populate('owner', 'name');

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load recipes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('owner', 'name');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load recipe' });
  }
});

router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, description, ingredients, steps, tags } = req.body;
    const recipe = new Recipe({
      owner: req.user._id,
      title,
      description,
      ingredients: typeof ingredients === 'string' ? ingredients.split(',').map((i) => i.trim()).filter(Boolean) : ingredients,
      steps: typeof steps === 'string' ? steps.split('\n').map((s) => s.trim()).filter(Boolean) : steps,
      tags: typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : tags,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Unable to create recipe', error: err.message });
  }
});

router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (!recipe.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, ingredients, steps, tags } = req.body;
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = typeof ingredients === 'string' ? ingredients.split(',').map((i) => i.trim()).filter(Boolean) : recipe.ingredients;
    recipe.steps = typeof steps === 'string' ? steps.split('\n').map((s) => s.trim()).filter(Boolean) : recipe.steps;
    recipe.tags = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : recipe.tags;
    if (req.file) recipe.image = `/uploads/${req.file.filename}`;

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Unable to update recipe' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (!recipe.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Unable to delete recipe' });
  }
});

module.exports = router;
