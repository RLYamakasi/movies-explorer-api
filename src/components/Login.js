import logo from "../images/logo.svg";
import { Link, withRouter, useNavigate } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { api } from "../utils/MainApi";
import { apiMovie } from "../utils/MoviesApi";

const Login = (props) => {
  const navigate = useNavigate();

  const [isValid, setValid] = useState({
    email: "",
    password: "",
  });

  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ [name]: e.target.validationMessage });
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .login(userValue.password, userValue.email)
      .then((data) => {
        if (data) {
          Promise.all([api.getProfile(), apiMovie.getMovies(), api.getMovies()])
            .then(([infoResult, moviesResult, savedMoviesResult]) => {
              props.setСurrentUser({
                name: infoResult.name,
                email: infoResult.email,
                id: infoResult._id,
              });
              props.setLoggedIn(true);
              navigate("/movies");
              props.setMovies(moviesResult.reverse());
              props.setSavedMovies(savedMoviesResult.reverse());
            })
            .catch((err) => {
              console.log(`Вы неавторизованы ${err}`);
            });
        }
      })
      .catch((err) => {
        setError({ password: "Что-то пошло не так..." });
      });
  };

  return (
    <section className="registration">
      <header className="registration__header">
        <Link to="/" className="registration__logo">
          <img src={logo} alt="логотип" />
        </Link>
      </header>
      <main className="registration__main">
        <h1 className="registration__title">Рады видеть!</h1>
        <form onSubmit={handleSubmit}>
          <label className="registration__label">
            <p className="registration__text">E-mail</p>
            <input
              name="email"
              type="email"
              className="registration__input"
              id="Email"
              placeholder=""
              required
              onChange={handleChange}
              value={userValue.email}
            />
            <span id="registration__error" className="registration__error">
              {error.email}
            </span>
          </label>
          <label className="registration__label">
            <p className="registration__text">Пароль</p>
            <input
              name="password"
              type="password"
              className="registration__input"
              id="password"
              placeholder=""
              required
              onChange={handleChange}
              value={userValue.password}
            />
            <span id="registration__error" className="registration__error">
              {error.password}
            </span>
          </label>
          <button className="registration__save-button">Войти</button>
        </form>
      </main>
      <footer>
        <Link to="/signup" className="registration__content-links">
          <p className="registration__content">Ещё не зарегистрированы?</p>
          <p className="registration__content">Регистрация</p>
        </Link>
      </footer>
    </section>
  );
};

export default Login;
