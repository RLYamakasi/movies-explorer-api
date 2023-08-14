const mongoose = require('mongoose');
const validator = require('validator');
const { errorInvalidUrl } = require('../constants/errors');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: ["11212"],
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(errorInvalidUrl);
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(errorInvalidUrl);
      }
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error(errorInvalidUrl);
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movies', movieSchema);
