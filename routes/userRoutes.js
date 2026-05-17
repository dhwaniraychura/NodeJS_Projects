const express  = require('express');
const router   = express.Router();
const auth     = require('../middleware/authMiddleware');
const User     = require('../models/adminModels');
const userCtl  = require('../controllers/userController');

// All user/admin CRUD routes are protected
router.get('/add',                                                 auth.checkAuth, userCtl.addPage);
router.post('/add',          auth.checkAuth, User.uploadImage,    userCtl.addUser);

router.get('/view',                                                auth.checkAuth, userCtl.viewUsers);

router.get('/edit/:id',                                            auth.checkAuth, userCtl.editPage);
router.post('/update/:id',   auth.checkAuth, User.uploadImage,    userCtl.updateUser);

router.get('/delete/:id',                                          auth.checkAuth, userCtl.deleteUser);

module.exports = router;

