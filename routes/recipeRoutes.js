const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/', recipeController.getAllRecipes);

// Authenticated routes
router.get('/my', requireAuth, recipeController.getMyRecipes);
router.get('/new', requireAuth, recipeController.getNewRecipeForm);
router.post('/', requireAuth, recipeController.createRecipe);

router.get('/:id', recipeController.getRecipeById);
router.get('/:id/edit', requireAuth, recipeController.getEditRecipeForm);
router.put('/:id', requireAuth, recipeController.updateRecipe);
router.delete('/:id', requireAuth, recipeController.deleteRecipe);

// Comments
router.post('/:id/comments', requireAuth, recipeController.addComment);
router.delete('/:id/comments/:commentId', requireAuth, recipeController.deleteComment);

module.exports = router;
