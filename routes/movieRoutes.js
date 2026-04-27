const express = require('express');
const router = express.Router();
const movieCtl = require('../controllers/movieControllers');

router.get('/', movieCtl.indexPage);
router.get('/add-movie', movieCtl.addMovie);
router.get('/view-movie', movieCtl.viewMovie);
router.post('/insertMovie', movieCtl.upload, movieCtl.insertMovieData);

// Movie detail
router.get('/movie/:id', movieCtl.movieDetail);

// Edit routes
router.get('/edit-movie/:id', movieCtl.editMovie);
router.post('/update-movie/:id', movieCtl.upload, movieCtl.updateMovieData);

// Delete route
router.get('/delete/:id', movieCtl.deleteMovie);

module.exports = router;
