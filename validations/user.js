const { celebrate, Joi, Segments } = require('celebrate');

exports.userValidateRegistration = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле должно содержать почту',
        'validation.failed': 'Поле должно содержать почту',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
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
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле должно содержать почту',
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});
