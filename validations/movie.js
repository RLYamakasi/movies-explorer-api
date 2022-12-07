const { celebrate, Joi } = require('celebrate');

exports.movieValidateCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле "country" должно быть заполнено',
      }),
      director: Joi.string().required()
      .messages({
        'string.empty': 'Поле "director" должно быть заполнено',
      }),
      duration: Joi.string().required()
      .messages({
        'string.empty': 'Поле "duration" должно быть заполнено',
      }),
      year: Joi.string().required()
      .messages({
        'string.empty': 'Поле "year" должно быть заполнено',
      }),
      description: Joi.string().required()
      .messages({
        'string.empty': 'Поле "description" должно быть заполнено',
      }),
      trailerLink: Joi.string().required().pattern(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i)
      .messages({
        'string.empty': 'Поле "trailerLink" должно быть заполнено',
      }),
      image: Joi.string().required().pattern(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i)
      .messages({
        'string.empty': 'Поле "image" должно быть заполнено',
      }),
      thumbnail: Joi.string().required().pattern(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i)
      .messages({
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
      }),
      nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameRU" должно быть заполнено',
      }),
      nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameEN" должно быть заполнено',
      }),
      movieId: Joi.string().required()
      .messages({
        'string.empty': 'Поле "movieId" должно быть заполнено',
      }),
  }),
});
