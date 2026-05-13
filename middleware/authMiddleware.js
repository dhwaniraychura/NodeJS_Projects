module.exports.checkAuth = (req, res, next) => {
    if (req.cookies.admin) {
        return next();
    } else {
        return res.redirect('/login');
    }
};
