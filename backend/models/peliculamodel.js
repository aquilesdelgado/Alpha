const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({

    id: Number,
    title: String,
    poster_path: String,
    backdrop_path: String,
    genre_ids: Array,
    runtime: Number,
    year: String,
    vote_average: Number,
    overview: String,
    genres: Array,
    cast: Array,
    director: String,
    key: String

}, { versionKey: false });

const Pelicula = mongoose.model('pelicula', PeliculaSchema );
module.exports = Pelicula;
