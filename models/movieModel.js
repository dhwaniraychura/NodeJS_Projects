const mongoose = require('mongoose');

const MovieModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MovieModel', MovieModelSchema);

