const Category    = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');

exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('pages/category/addSubCategory', {
            title: 'Add SubCategory',
            categories
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.insertSubCategory = async (req, res) => {
    try {
        await SubCategory.create(req.body);
        return res.redirect('/category/subcategory/add');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
