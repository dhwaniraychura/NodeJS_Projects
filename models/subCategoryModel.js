const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    subCategoryName: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'Active'
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

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
