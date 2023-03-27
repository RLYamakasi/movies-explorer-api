import logo from "../images/logo.svg";
import { Link, withRouter, useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { api } from "../utils/MainApi";
import { apiMovie } from "../utils/MoviesApi";

const Registration = (props) => {
  const navigate = useNavigate();

  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
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
      .register(userValue.name, userValue.password, userValue.email)
      .then((data) => {
        if (data) {
          api
            .login(userValue.password, userValue.email)
            .then((data) => {
              if (data) {
                Promise.all([api.getProfile(), apiMovie.getMovies()]).then(
                  ([infoResult, moviesResult]) => {
                    props.setСurrentUser({
                      name: infoResult.name,
                      email: infoResult.email,
                      id: infoResult._id,
                    });
                    localStorage.setItem(
                      "AllFilms",
                      JSON.stringify(moviesResult.reverse())
                    );
                    localStorage.setItem(
                      "ShortFilms",
                      JSON.stringify(
                        moviesResult.filter((item) => item.duration <= 40)
                      )
                    );
                    props.setLoggedIn(true);
                    navigate("/movies");
                  }
                );
              }
            })
            .catch((err) => {
              setError({ password: "Что-то пошло не так..." });
            });
        }
      })
      .catch((err) => {
        console.log(err);
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
        <h1 className="registration__title">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit}>
          <label className="registration__label">
            <p className="registration__text">Имя</p>
            <input
              name="name"
              type="name"
              className="registration__input"
              id="name"
              placeholder=""
              required
              onChange={handleChange}
              value={userValue.name}
            />
            <span id="registration__error" className="registration__error">
              {error.name}
            </span>
          </label>
          <label className="registration__label">
            <p className="registration__text">E-mail</p>
            <input
              name="email"
              type="email"
              className="registration__input"
              id="email"
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
          <button className="registration__save-button">
            Зарегистрироваться
          </button>
        </form>
      </main>
      <footer>
        <Link to="/signin" className="registration__content-links">
          <p className="registration__content">Уже зарегистрированы?</p>
          <p className="registration__content">Войти</p>
        </Link>
      </footer>
    </section>
  );
};

export default Registration;
