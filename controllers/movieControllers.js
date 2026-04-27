const path = require('path');
const multer = require('multer');
const Movie = require('../models/movieModel');

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/assets/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
exports.upload = upload.single('poster');

// GET /
exports.indexPage = async (req, res) => {
    try {
        const trendingMovies = await Movie.find().sort({ createdAt: -1 }).limit(4);
        res.render('index', { trendingMovies });
    } catch (err) {
        console.log(err);
        res.render('index', { trendingMovies: [] });
    }
};

// GET /add-movie
exports.addMovie = (req, res) => {
    res.render('addMovie');
};

// POST /insertMovie
exports.insertMovieData = async (req, res) => {
    try {
        await Movie.create({
            title:       req.body.title,
            releaseYear: req.body.releaseYear,
            genre:       req.body.genre.split(',').map(s => s.trim()),
            duration:    req.body.duration,
            language:    req.body.language.split(',').map(s => s.trim()),
            actors:      req.body.actors.split(',').map(s => s.trim()),
            directors:   req.body.directors.split(',').map(s => s.trim()),
            rating:      req.body.rating,
            description: req.body.description,
            poster:      req.file.filename,
        });
        res.redirect('/view-movie');
    } catch (err) {
        console.log(err);
        res.redirect('/add-movie');
    }
};

// GET /view-movie
exports.viewMovie = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.render('viewMovie', { movies });
    } catch (err) {
        console.log(err);
        res.render('viewMovie', { movies: [] });
    }
};

// GET /edit-movie/:id
exports.editMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.redirect('/view-movie');
        res.render('editMovie', { movie });
    } catch (err) {
        console.log(err);
        res.redirect('/view-movie');
    }
};

// POST /update-movie/:id
exports.updateMovieData = async (req, res) => {
    try {
        const updateData = {
            title:       req.body.title,
            releaseYear: req.body.releaseYear,
            genre:       req.body.genre.split(',').map(s => s.trim()),
            duration:    req.body.duration,
            language:    req.body.language.split(',').map(s => s.trim()),
            actors:      req.body.actors.split(',').map(s => s.trim()),
            directors:   req.body.directors.split(',').map(s => s.trim()),
            rating:      req.body.rating,
            description: req.body.description,
        };

        // Only update poster if a new file was uploaded
        if (req.file) {
            updateData.poster = req.file.filename;
        }

        await Movie.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/view-movie');
    } catch (err) {
        console.log(err);
        res.redirect('/view-movie');
    }
};

// GET /delete/:id
exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/view-movie');
    } catch (err) {
        console.log(err);
        res.redirect('/view-movie');
    }
};

// GET /movie/:id  — Detail page
exports.movieDetail = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.redirect('/');
        res.render('movieDetail', { movie });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};
