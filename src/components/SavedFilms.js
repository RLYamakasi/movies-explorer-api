import logo from "../images/logo.svg";
import search from "../images/search.svg";
import find from "../images/find.svg";
import closeicon from "../images/closeIcon.svg";
import randomPic from "../images/randompic.png";
import { Link } from "react-router-dom";
import ico_main from "../images/ico-main.svg";
import ico_exit from "../images/exit-ico.svg";
import { React, useEffect, useState } from "react";
import { api } from "../utils/MainApi";

const SavedFilms = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };

  const DeleteMovies = (id) => {
    api
      .DeleteMovie(id)
      .then((data) => {})
      .then(() => {
        setSavedMovies((movies) => movies.filter((item) => item._id !== id));
      });
  };

  useEffect(() => {
    api.getMovies().then((data) => {
      setSavedMovies(data);
    });
  }, []);

  return (
    <section>
      <header>
        <nav className="navbar">
          <Link to="/" className="navbar__avatar">
            <img src={logo} className="profile__avatar-img" alt="логотип" />
          </Link>
          <Link to="/movies" className="navbar__films">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navbar__saved-films">
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="navbar__account">
            Аккаунт
          </Link>
          <img
            className="navbar__side-ico"
            src={ico_main}
            onClick={OpenSideBar}
          />
        </nav>
        <nav
          className={
            isSideBarOpen
              ? "navbar-side navbar-side_active"
              : "navbar-side navbar-side_inactive"
          }
        >
          <div className="navbar-side__block">
            <img
              src={ico_exit}
              className="navbar-side__exit"
              onClick={CloseSideBar}
            />
            <div className="navbar-side__text-block">
              <Link to="/" className="navbar-side__text">
                Главная
              </Link>
              <Link to="/movies" className="navbar-side__text">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="navbar-side__text">
                Сохранённые фильмы
              </Link>
              <Link to="/profile" className="navbar-side__text">
                Аккаунт
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="search">
          <form className="search__label">
            <img src={search} className="search__icon" alt="иконка поиска" />
            <input
              type="url"
              className="search__films"
              id="url"
              placeholder="Фильм"
              required
            />
            <button src={find} className="search__button" alt="кнопка искать">
              <img
                src={find}
                className="search__button_img"
                alt="кнопка искать"
              ></img>
            </button>
            <label className="search__checkbox">
              <input className="search__checkbox_input" type="checkbox" />
            </label>
            <p className="search__checkbox-text">Короткометражки</p>
            <span id="url-error" className="search__error"></span>
          </form>
        </section>
        <section className="films">
          {savedMovies.map((obj, i) => (
            <div key={obj._id} className="films__block">
              <p className="films__text-block">{obj.nameRU}</p>
              <p className="films__time-block">{obj.duration}</p>
              <button
                className="films__ico-block"
                onClick={() => DeleteMovies(obj._id)}
              >
                <img
                  className="films__ico-block_img"
                  src={closeicon}
                  alt="иконка-удалить"
                />
              </button>
              <img
                className="films__img-block"
                src={obj.image}
                alt="изображение фильма"
              />
            </div>
          ))}
        </section>
      </main>
      <footer className="footer">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__line"></div>
        <div className="footer__info">
          <div className="footer__info-year">
            <p>© 2023</p>
          </div>
          <div className="footer__info-other">
            <p>Яндекс.Практикум</p>
            <p>Github</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default SavedFilms;
