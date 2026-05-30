const express = require('express');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/recipes/:id/like', authenticate, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    const liked = req.user.likedRecipes.some((id) => id.equals(recipe._id));
    if (liked) {
      recipe.likes = Math.max(recipe.likes - 1, 0);
      req.user.likedRecipes = req.user.likedRecipes.filter((id) => !id.equals(recipe._id));
    } else {
      recipe.likes += 1;
      req.user.likedRecipes.push(recipe._id);
    }

    await recipe.save();
    await req.user.save();
    res.json({ likes: recipe.likes, liked: !liked });
  } catch (err) {
    res.status(500).json({ message: 'Unable to update like state' });
  }
});

router.get('/recipes/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.id }).populate('author', 'name').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load comments' });
  }
});

router.post('/recipes/:id/comments', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text cannot be empty' });

    const comment = await Comment.create({ recipe: req.params.id, author: req.user._id, text });
    await comment.populate('author', 'name');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Unable to create comment' });
  }
});

module.exports = router;
