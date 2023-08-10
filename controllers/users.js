require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const BadRequestError = require("../errors/badreq");
const AuthError = require("../errors/autherror");
const ErrorLogin = require("../errors/errorlogin");
const {
  errorInvalidData,
  errorValidation,
  errorEmailAlredyReg,
  errorRegistration,
} = require("../constants/errors");
const { secretKey } = require("../constants/authconstants");

module.exports.aboutMe = (req, res, next) => {
  Users.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === errorValidation) {
        next(new BadRequestError(errorInvalidData));
      }
      if (err.code === 11000) {
        next(new AuthError(errorEmailAlredyReg));
      } else {
        next(err);
      }
    });
};

module.exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      Users.create({
        email,
        password: hash,
        name,
      })
    )
    .then(() =>
      res.send({
        name,
        email,
      })
    )
    .catch((err) => {
      if (err.name === errorValidation) {
        res.send(err);
        return next(new BadRequestError(errorInvalidData));
      }
      if (err.code === 11000) {
        return next(new AuthError(errorEmailAlredyReg));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new ErrorLogin(errorRegistration));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new ErrorLogin(errorRegistration));
        }
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || secretKey,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, {
          maxAge: 3600 * 24 * 7,
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        return res.send({ token });
      });
    })
    .catch(next);
};


