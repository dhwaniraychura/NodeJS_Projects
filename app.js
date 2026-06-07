const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const flash        = require('connect-flash');

const app = express();

// =================== Database ===================
const connectDB = require('./config/db');
connectDB();

// =================== View Engine ===================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// =================== Static Files ===================
app.use(express.static(path.join(__dirname, 'public')));

// =================== Middleware ===================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session & Flash (required for forgot-password OTP flow)
app.use(session({
  secret: process.env.SESSION_SECRET || 'admin-panel-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 } // 15 minutes
}));
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');
  next();
});

// =================== Routes ===================
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/category', categoryRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

// =================== 404 Handler ===================
app.use((req, res) => {
  res.status(404).render('pages/samples/error_404', { title: '404 - Page Not Found' });
});

// =================== Error Handler ===================
app.use((err, req, res, next) => {
  console.error('=== SERVER ERROR ===');
  console.error(err.stack);
  res.status(500).render('pages/samples/error_500', { title: '500 - Server Error' });
});

// =================== Server ===================
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
