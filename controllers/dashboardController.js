const dashboardController = {
  index: (req, res) => {
    res.render('pages/dashboard', { title: 'Dashboard' });
  }
};



module.exports = dashboardController;
