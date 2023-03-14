const allowedCors = [
  "https://moviesfrontend.nomoredomains.work",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://api.nomoreparties.co/beatfilm-movies",
  "http://moviesbackend.nomoredomains.work",
  "https://moviesbackend.nomoredomains.work",
  "http://moviesfrontend.nomoredomains.work",
];

module.exports.corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, OPTIONS, DELETE, PATCH"
    );
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, OPTIONS, DELETE, PATCH"
    );
    return res.end();
  }

  return next();
};
