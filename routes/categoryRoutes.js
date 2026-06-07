const express        = require('express');
const router         = express.Router();
const auth           = require('../middleware/authMiddleware');
const Category       = require('../models/categoryModel');
const categoryCtl    = require('../controllers/categoryController');
const subCategoryCtl = require('../controllers/subCategoryController');

// Category routes
router.get('/add',            auth.checkAuth, categoryCtl.addCategoryPage);
router.post('/add',           auth.checkAuth, Category.uploadImage, categoryCtl.insertCategory);
router.get('/view',           auth.checkAuth, categoryCtl.viewCategoryPage);
router.get('/edit/:id',       auth.checkAuth, categoryCtl.editCategoryPage);
router.post('/edit/:id',      auth.checkAuth, Category.uploadImage, categoryCtl.updateCategory);
router.get('/status/:id',     auth.checkAuth, categoryCtl.changeStatus);

// Soft delete (move to trash)
router.get('/delete/:id',     auth.checkAuth, categoryCtl.deleteCategory);

// Trash routes
router.get('/trash',                         auth.checkAuth, categoryCtl.trashPage);
router.get('/restore/:id',                   auth.checkAuth, categoryCtl.restoreCategory);
router.get('/permanent-delete/:id',          auth.checkAuth, categoryCtl.permanentDeleteCategory);

// SubCategory trash routes
router.get('/subcategory/restore/:id',          auth.checkAuth, categoryCtl.restoreSubCategory);
router.get('/subcategory/permanent-delete/:id', auth.checkAuth, categoryCtl.permanentDeleteSubCategory);

// SubCategory routes
router.get('/subcategory/add',  auth.checkAuth, subCategoryCtl.addSubCategoryPage);
router.post('/subcategory/add', auth.checkAuth, subCategoryCtl.insertSubCategory);

module.exports = router;
