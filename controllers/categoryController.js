const Category    = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');

exports.addCategoryPage = (req, res) => {
    return res.render('pages/category/addCategory', { title: 'Add Category' });
};

exports.insertCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.categoryImage = Category.imagePath + '/' + req.file.filename;
        }
        await Category.create(req.body);
        return res.redirect('/category/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.viewCategoryPage = async (req, res) => {
    try {
        const categories    = await Category.find({ isDeleted: false });
        const subCategories = await SubCategory.find({ isDeleted: false }).populate('categoryId');
        return res.render('pages/category/viewCategory', {
            title: 'View Categories',
            categories,
            subCategories
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.editCategoryPage = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.render('pages/category/editCategory', {
            title: 'Edit Category',
            category
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const oldData = await Category.findById(req.params.id);
        if (req.file) {
            req.body.categoryImage = Category.imagePath + '/' + req.file.filename;
        } else {
            req.body.categoryImage = oldData.categoryImage;
        }
        await Category.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('/category/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// SOFT DELETE — moves category + its subcategories to trash
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
            deletedAt: new Date()
        });
        await SubCategory.updateMany(
            { categoryId: req.params.id },
            { isDeleted: true, deletedAt: new Date() }
        );
        return res.redirect('/category/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// TRASH PAGE — show all soft-deleted categories & subcategories
exports.trashPage = async (req, res) => {
    try {
        const trashedCategories    = await Category.find({ isDeleted: true });
        const trashedSubCategories = await SubCategory.find({ isDeleted: true }).populate('categoryId');
        return res.render('pages/category/trashCategory', {
            title: 'Trash — Categories',
            trashedCategories,
            trashedSubCategories
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// RESTORE category (and its subcategories)
exports.restoreCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            isDeleted: false,
            deletedAt: null
        });
        await SubCategory.updateMany(
            { categoryId: req.params.id },
            { isDeleted: false, deletedAt: null }
        );
        return res.redirect('/category/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// PERMANENT DELETE category
exports.permanentDeleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        await SubCategory.deleteMany({ categoryId: req.params.id });
        return res.redirect('/category/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// RESTORE subcategory only
exports.restoreSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndUpdate(req.params.id, {
            isDeleted: false,
            deletedAt: null
        });
        return res.redirect('/category/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// PERMANENT DELETE subcategory only
exports.permanentDeleteSubCategory = async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        return res.redirect('/category/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        await Category.findByIdAndUpdate(req.params.id, { status: !category.status });
        return res.redirect('/category/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
