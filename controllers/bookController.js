const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

// ─── Helper: delete old image file ────────────────────────────────────────────
const deleteImage = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, '..', 'uploads', path.basename(imagePath));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// ─── GET /  →  Dashboard / View All Books ─────────────────────────────────────
exports.getAllBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title:  { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const books      = await Book.find(query).sort({ createdAt: -1 });
    const totalBooks = await Book.countDocuments();
    const totalValue = await Book.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$quantity'] } } } }
    ]);
    const categories = await Book.distinct('category');

    res.render('index', {
      books,
      totalBooks,
      totalValue: totalValue[0]?.total || 0,
      categories: ['All', ...categories],
      search: search || '',
      selectedCategory: category || 'All',
      success: req.query.success || null,
      error: req.query.error || null
    });
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Failed+to+load+books');
  }
};

// ─── GET /books/add  →  Add Book Form ────────────────────────────────────────
exports.getAddBook = (req, res) => {
  res.render('add', { error: null });
};

// ─── POST /books/add  →  Save New Book ───────────────────────────────────────
exports.postAddBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const book = new Book({ title, author, category, price, quantity, description, image });
    await book.save();

    res.redirect('/?success=Book+added+successfully');
  } catch (err) {
    console.error(err);
    res.render('add', { error: err.message || 'Failed to add book. Please try again.' });
  }
};

// ─── GET /books/:id  →  View Single Book ────────────────────────────────────
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book+not+found');
    res.render('view', { book });
  } catch (err) {
    res.redirect('/?error=Book+not+found');
  }
};

// ─── GET /books/:id/edit  →  Edit Book Form ──────────────────────────────────
exports.getEditBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book+not+found');
    res.render('edit', { book, error: null });
  } catch (err) {
    res.redirect('/?error=Book+not+found');
  }
};

// ─── PUT /books/:id  →  Update Book ──────────────────────────────────────────
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book+not+found');

    const { title, author, category, price, quantity, description } = req.body;

    // Replace image only if a new one was uploaded
    let image = book.image;
    if (req.file) {
      deleteImage(book.image);
      image = `/uploads/${req.file.filename}`;
    }

    await Book.findByIdAndUpdate(req.params.id, {
      title, author, category, price, quantity, description, image
    }, { new: true, runValidators: true });

    res.redirect('/?success=Book+updated+successfully');
  } catch (err) {
    console.error(err);
    const book = await Book.findById(req.params.id);
    res.render('edit', { book, error: err.message || 'Failed to update book.' });
  }
};

// ─── DELETE /books/:id  →  Delete Book ───────────────────────────────────────
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/?error=Book+not+found');

    deleteImage(book.image);
    await Book.findByIdAndDelete(req.params.id);

    res.redirect('/?success=Book+deleted+successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/?error=Failed+to+delete+book');
  }
};
