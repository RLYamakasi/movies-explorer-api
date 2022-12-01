require('dotenv').config();
const Users = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badreq');
const AuthError = require('../errors/autherror');
const ErrorLogin = require('../errors/errorlogin');

module.exports.aboutMe = (req,res,next)=>{
  Users.findOne({ id: req.user._id})
    .then((user)=> res.send(user))
    .catch(next);
}

module.exports.patchUserInfo = (req, res, next) => {
  const { name } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};

module.exports.register = (req, res, next) => {
  console.log(req.body)
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.send({
      name, email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(err);
        return next(new BadRequestError('Что-то пошло не так'));
      }
      if (err.code === 11000) {
        return next(new AuthError('Email зарегистрирован'));
      }
      return next(err);
    });
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorLogin('Неверный логин или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new ErrorLogin('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.cookie('token', token, {
            sameSite: false,
            httpOnly: true,
          });
          return res.send({ token });
        });
    })
    .catch(next);
  }