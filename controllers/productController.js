const Product     = require('../models/productModel');
const Category    = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');

exports.addProductPage = async (req, res) => {
    try {
        const categories = await Category.find({ status: true, isDeleted: false });
        return res.render('pages/product/addProduct', { title: 'Add Product', categories });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({
            categoryId: req.params.categoryId,
            isDeleted: false
        });
        return res.json(subCategories);
    } catch (err) {
        return res.status(500).json([]);
    }
};

exports.insertProduct = async (req, res) => {
    try {
        if (req.file) {
            req.body.productImage = Product.imagePath + '/' + req.file.filename;
        }
        if (!req.body.subCategoryId) delete req.body.subCategoryId;
        await Product.create(req.body);
        return res.redirect('/product/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.viewProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false })
            .populate('categoryId')
            .populate('subCategoryId');
        return res.render('pages/product/viewProduct', { title: 'Products', products });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.editProductPage = async (req, res) => {
    try {
        const product       = await Product.findById(req.params.id);
        const categories    = await Category.find({ status: true, isDeleted: false });
        const subCategories = product.subCategoryId
            ? await SubCategory.find({ categoryId: product.categoryId, isDeleted: false })
            : [];
        return res.render('pages/product/editProduct', {
            title: 'Edit Product',
            product,
            categories,
            subCategories
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const oldData = await Product.findById(req.params.id);
        if (req.file) {
            req.body.productImage = Product.imagePath + '/' + req.file.filename;
        } else {
            req.body.productImage = oldData.productImage;
        }
        if (!req.body.subCategoryId) req.body.subCategoryId = null;
        await Product.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('/product/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// SOFT DELETE — moves product to trash
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
            deletedAt: new Date()
        });
        return res.redirect('/product/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// TRASH PAGE — show all soft-deleted products
exports.trashPage = async (req, res) => {
    try {
        const trashedProducts = await Product.find({ isDeleted: true })
            .populate('categoryId')
            .populate('subCategoryId');
        return res.render('pages/product/trashProduct', {
            title: 'Trash — Products',
            trashedProducts
        });
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// RESTORE product
exports.restoreProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            isDeleted: false,
            deletedAt: null
        });
        return res.redirect('/product/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

// PERMANENT DELETE product
exports.permanentDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.redirect('/product/trash');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await Product.findByIdAndUpdate(req.params.id, { status: !product.status });
        return res.redirect('/product/view');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};
