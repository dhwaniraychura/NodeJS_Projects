const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const User = require('../models/User');

// GET /recipes - display all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username').sort({ createdAt: -1 });
    res.render('recipeList', { recipes, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /recipes/my - display recipes for logged in user
exports.getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.render('myRecipes', { recipes, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /recipes/new - show form to create a recipe
exports.getNewRecipeForm = (req, res) => {
  res.render('recipeForm', { recipe: null, user: req.user, formAction: '/recipes' });
};

// POST /recipes - create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, cookingTime, category, image } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients: ingredients.split(',').map(i => i.trim()).filter(Boolean),
      instructions,
      cookingTime,
      category,
      image: image || '/images/default-recipe.svg',
      author: req.user.id
    });

    await newRecipe.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { recipes: newRecipe._id } });

    res.redirect('/recipes/my');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /recipes/:id - view single recipe with comments
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });

    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found.', user: req.user });
    }

    res.render('recipeItem', { recipe, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// GET /recipes/:id/edit - show edit form
exports.getEditRecipeForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found.', user: req.user });
    }

    // Only author or admin can edit
    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { message: 'Access Denied.', user: req.user });
    }

    res.render('recipeForm', { recipe, user: req.user, formAction: `/recipes/${recipe._id}?_method=PUT` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// PUT /recipes/:id - update recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found.', user: req.user });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { message: 'Access Denied.', user: req.user });
    }

    const { title, description, ingredients, instructions, cookingTime, category, image } = req.body;

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients.split(',').map(i => i.trim()).filter(Boolean);
    recipe.instructions = instructions;
    recipe.cookingTime = cookingTime;
    recipe.category = category;
    recipe.image = image || recipe.image;

    await recipe.save();

    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// DELETE /recipes/:id - delete recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found.', user: req.user });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { message: 'Access Denied.', user: req.user });
    }

    await Comment.deleteMany({ recipe: recipe._id });
    await User.findByIdAndUpdate(recipe.author, { $pull: { recipes: recipe._id } });
    await Recipe.findByIdAndDelete(req.params.id);

    res.redirect('/recipes/my');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// POST /recipes/:id/comments - add a comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { message: 'Recipe not found.', user: req.user });
    }

    const comment = new Comment({
      text,
      author: req.user.id,
      recipe: recipe._id
    });

    await comment.save();

    recipe.comments.push(comment._id);
    await recipe.save();

    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// DELETE /recipes/:id/comments/:commentId - delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).render('error', { message: 'Comment not found.', user: req.user });
    }

    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { message: 'Access Denied.', user: req.user });
    }

    await Comment.findByIdAndDelete(commentId);
    await Recipe.findByIdAndUpdate(id, { $pull: { comments: commentId } });

    res.redirect(`/recipes/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
