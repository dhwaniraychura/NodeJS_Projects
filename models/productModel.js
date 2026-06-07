const mongoose = require('mongoose');
const path     = require('path');
const multer   = require('multer');

const imagePath = '/assets/images/products';

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    productImage: {
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

productSchema.statics.uploadImage = multer({ storage }).single('productImage');
productSchema.statics.imagePath   = imagePath;

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
