const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../config/multerConfig');

// Dashboard — list all books
router.get('/', bookController.getAllBooks);

// Add book
router.get('/books/add', bookController.getAddBook);
router.post('/books/add', upload.single('image'), bookController.postAddBook);

// View single book
router.get('/books/:id', bookController.getBook);

// Edit book
router.get('/books/:id/edit', bookController.getEditBook);
router.put('/books/:id', upload.single('image'), bookController.updateBook);

// Delete book
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
