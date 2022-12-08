const { celebrate, Joi } = require('celebrate');

exports.userValidateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
  }),
});

exports.userValidateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});
