const express    = require('express');
const router     = express.Router();
const auth       = require('../middleware/authMiddleware');
const Product    = require('../models/productModel');
const productCtl = require('../controllers/productController');

router.get('/add',              auth.checkAuth, productCtl.addProductPage);
router.post('/add',             auth.checkAuth, Product.uploadImage, productCtl.insertProduct);
router.get('/view',             auth.checkAuth, productCtl.viewProducts);
router.get('/edit/:id',         auth.checkAuth, productCtl.editProductPage);
router.post('/edit/:id',        auth.checkAuth, Product.uploadImage, productCtl.updateProduct);
router.get('/status/:id',       auth.checkAuth, productCtl.changeStatus);

// Soft delete (move to trash)
router.get('/delete/:id',       auth.checkAuth, productCtl.deleteProduct);

// Trash routes
router.get('/trash',                   auth.checkAuth, productCtl.trashPage);
router.get('/restore/:id',             auth.checkAuth, productCtl.restoreProduct);
router.get('/permanent-delete/:id',    auth.checkAuth, productCtl.permanentDeleteProduct);

// AJAX: fetch subcategories by category
router.get('/subcategories/:categoryId', productCtl.getSubCategories);

module.exports = router;
