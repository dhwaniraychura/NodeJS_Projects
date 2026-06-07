const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const imagePath = '/assets/images/category';

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    },

    categoryImage: {
        type: String
    },

    status: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true });

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', imagePath));
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});

categorySchema.statics.uploadImage = multer({ storage }).single('categoryImage');
categorySchema.statics.imagePath = imagePath;

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
