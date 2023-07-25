const router = require("express").Router();
const routesMovie = require("./movies");
const routesUser = require("./user");
const { register, login } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const NotFound = require("../errors/notfound");
const { errorRoute } = require("../constants/errors");
const { messageSignOut } = require("../constants/messages");
const { userValidateRegistration } = require("../validations/user");
const { userValidateLogin } = require("../validations/user");

module.exports = router;

router.post("/signup", userValidateRegistration, register);
router.post("/signin", userValidateLogin, login);
router.use("/", auth, routesMovie);
router.use("/", auth, routesUser);
router.post("/signout", auth, (req, res) => {
  res.clearCookie("token"),
    {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    }
      .status(200)
      .send({ message: messageSignOut });
});
router.use(auth, (req, res, next) => {
  next(new NotFound(errorRoute));
});
