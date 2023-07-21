import logo from "../images/logo.svg";
import search from "../images/search.svg";
import find from "../images/find.svg";
import closeicon from "../images/closeIcon.svg";
import { Link } from "react-router-dom";
import ico_main from "../images/ico-main.svg";
import ico_exit from "../images/exit-ico.svg";
import { React, useState, useEffect } from "react";

const SavedFilms = (props) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [searchContent, setSearchContent] = useState({
    movie: "",
  });
  const [isLoading, setLoading] = useState(false);
  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchContent({
      [name]: value,
    });
  };
  useEffect(() => {
    if (window.screen.availWidth <= 1024) {
      isSideBarOpen(true);
    }
    console.log(localStorage.getItem("isShortSaved") === "true");
  }, []);

  const shortFilms = () => {
    if (props.savedMovies.length === 0) {
      props.setShortSavedFilms(!props.savedMovies);
      localStorage.setItem("isShortSaved", props.isShortSavedFilms);
    } else if (props.isShortSavedFilms === false) {
      props.setShortSavedFilms(true);
      localStorage.setItem("isShortSaved", props.isShortSavedFilms);
      props.SearchSavedFilter();
    } else {
      props.setShortSavedFilms(false);

      localStorage.setItem("isShortSaved", props.isShortSavedFilms);
      props.SearchSavedFilter();
    }
  };

  const searchFilms = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      JSON.parse(localStorage.getItem("AllFilms")).map((obj) => {
        obj.nameRU.split(" ").some((movie) => {
          if (searchContent.movie.length === 0) {
            localStorage.removeItem("SearchFilm");
            props.SearchSavedFilter();
          } else if (
            movie.toLowerCase() === searchContent.movie.toLowerCase()
          ) {
            localStorage.setItem("SearchFilm", JSON.stringify(obj));
            props.SearchSavedFilter();
          }
        });
      });
      setLoading(false);
    }, 600);
  };

  const DeleteMovies = (obj) => {
    let deletedMovie = props.savedMovies.filter((movie) => movie.id !== obj.id);
    props.setSavedMovies(deletedMovie);
    localStorage.setItem("FavoriteMovie", JSON.stringify(deletedMovie));
  };

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
              name="movie"
              onChange={handleChange}
              type="search"
              value={searchContent.movie}
              className="search__films"
              placeholder="Фильм"
              required
            />
            <button
              src={find}
              onClick={searchFilms}
              className="search__button"
              alt="кнопка искать"
            >
              <img
                src={find}
                className="search__button_img"
                alt="кнопка искать"
              ></img>
            </button>
            <label className="search__checkbox">
              <input
                onChange={() => shortFilms()}
                className="search__checkbox_input"
                type="checkbox"
                id="checkbox"
              />
            </label>
            <p className="search__checkbox-text">Короткометражки</p>
            <span id="url-error" className="search__error"></span>
          </form>
        </section>
        <section className="films">
          {props.savedMovies.map((obj, i) => (
            <div key={obj.id} className="films__block">
              <p className="films__text-block">{obj.nameRU}</p>
              <p className="films__time-block">
                {Math.floor(obj.duration / 60) > 0
                  ? Math.floor(obj.duration / 60) +
                    " час " +
                    (obj.duration % 60) +
                    " минут"
                  : (obj.duration % 60) + " минут"}
              </p>
              <button
                className="films__ico-block"
                onClick={() => DeleteMovies(obj)}
              >
                <img
                  className="films__ico-block_img"
                  src={closeicon}
                  alt="иконка-удалить"
                />
              </button>
              <img
                className="films__img-block"
                src={"https://api.nomoreparties.co/" + obj.image.url}
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
