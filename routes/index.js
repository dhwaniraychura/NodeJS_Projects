const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
  res.render('pages/dashboard', { title: 'Dashboard' });
});

// UI Features
router.get('/ui-features/buttons', (req, res) => {
  res.render('pages/ui-features/buttons', { title: 'Buttons' });
});
router.get('/ui-features/dropdowns', (req, res) => {
  res.render('pages/ui-features/dropdowns', { title: 'Dropdowns' });
});
router.get('/ui-features/typography', (req, res) => {
  res.render('pages/ui-features/typography', { title: 'Typography' });
});

// Forms
router.get('/forms/basic-elements', (req, res) => {
  res.render('pages/forms/basic_elements', { title: 'Basic Form Elements' });
});

// Tables
router.get('/tables/basic-table', (req, res) => {
  res.render('pages/tables/basic_table', { title: 'Basic Table' });
});

// Charts
router.get('/charts/chartjs', (req, res) => {
  res.render('pages/charts/chartjs', { title: 'Chart.js' });
});

// Icons
router.get('/icons/font-awesome', (req, res) => {
  res.render('pages/icons/font_awesome', { title: 'Font Awesome Icons' });
});

// Samples / User Pages
router.get('/samples/login', (req, res) => {
  res.render('pages/samples/login', { title: 'Login' });
});
router.get('/samples/register', (req, res) => {
  res.render('pages/samples/register', { title: 'Register' });
});
router.get('/samples/error-404', (req, res) => {
  res.render('pages/samples/error_404', { title: '404 Error' });
});
router.get('/samples/error-500', (req, res) => {
  res.render('pages/samples/error_500', { title: '500 Error' });
});
router.get('/samples/blank-page', (req, res) => {
  res.render('pages/samples/blank_page', { title: 'Blank Page' });
});

module.exports = router;
