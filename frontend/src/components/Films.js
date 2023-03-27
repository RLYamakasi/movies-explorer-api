import logo from "../images/logo.svg";
import search from "../images/search.svg";
import find from "../images/find.svg";
import ico_main from "../images/ico-main.svg";
import ico_exit from "../images/exit-ico.svg";
import { Link } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import FavoriteButton from "../components/FavoriteButton";

const Films = (props) => {
  const userContext = useContext(CurrentUserContext);
  const [searchContent, setSearchContent] = useState({
    movie: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const [moviesCount, setmoviesCount] = useState([]);
  const [moreCount, setmoreCount] = useState(0);
  const [moreButtonClass, setmoreButtonClass] = useState("more__button");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchContent({
      [name]: value,
    });
  };

  const setmoreCountFunc = () => {
    setmoreCount(moreCount + 1);
  };
  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };

  const searchFilms = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("isShort") === "true");
    setLoading(true);
    setTimeout(() => {
      JSON.parse(localStorage.getItem("AllFilms")).map((obj) => {
        obj.nameRU.split(" ").some((movie) => {
          if (searchContent.movie.length === 0) {
            localStorage.removeItem("SearchFilm");
            props.SearchFilter();
          } else if (
            movie.toLowerCase() === searchContent.movie.toLowerCase()
          ) {
            localStorage.setItem("SearchFilm", JSON.stringify(obj));
            props.SearchFilter();
          }
        });
      });
      setLoading(false);
    }, 600);
  };

  // const shortFilms = () => {
  //   console.log("gdgdgdg");
  //   if (props.isShortFilms === true) {
  //     props.setShortFilms(false);
  //     localStorage.setItem("isShort", props.isShortFilms);
  //     props.SearchFilter();
  //   } else {
  //     props.setShortFilms(true);
  //     localStorage.setItem("isShort", props.isShortFilms);
  //     props.SearchFilter();
  //     setmoreButtonClass("more__button");
  //   }
  // };

  const MoviesRemoveFavorite = (obj, setLike) => {
    setLoading(true);
    props.setSavedMovies(
      props.savedMovies.filter((movie) => movie.nameRU !== obj.nameRU)
    );
    console.log(props.savedMovies);
    localStorage.setItem("FavoriteMovie", JSON.stringify(props.savedMovies));
    setLike(false);
    setLoading(false);
  };

  const MoviesToFavorite = (obj, setLike) => {
    if (
      localStorage.getItem("FavoriteMovie") !== null &&
      !props.savedMovies.some((movies) => movies.id === obj.id)
    ) {
      let str = JSON.parse(localStorage.getItem("FavoriteMovie"));
      str.push(obj);
      console.log(str);
      localStorage.setItem("FavoriteMovie", JSON.stringify(str));
      props.setSavedMovies(JSON.parse(localStorage.getItem("FavoriteMovie")));
      setLike(true);
    } else if (localStorage.getItem("FavoriteMovie") === null) {
      localStorage.setItem("FavoriteMovie", JSON.stringify([obj]));
      props.setSavedMovies(JSON.parse(localStorage.getItem("FavoriteMovie")));
      setLike(true);
    }

    setLoading(false);
  };

  const GetMovie = (movies) => {
    if (window.screen.availWidth >= 1280) {
      setmoviesCount(movies.slice(0, 12 + moreCount * 3));
    } else if (
      window.screen.availWidth < 1280 &&
      window.screen.availWidth >= 768
    ) {
      setmoviesCount(movies.slice(0, 8 + moreCount * 2));
    } else {
      setmoviesCount(movies.slice(0, 5 + moreCount * 2));
    }
  };

  useEffect(() => {
    GetMovie(props.movies);
    setmoreButtonClass("more__button");
    if (props.movies.length <= 12 + moreCount * 3) {
      setmoreButtonClass("more__button_vanished");
    }
  }, [moreCount, props.movies, props.savedMovies, props.isShortFilms]);

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
            Сохранённые
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
        <section className={isLoading ? "preloader" : "preloader_hiden"}>
          <div className="preloader__loader">
            <div className={isLoading ? "preloader__box" : "preloader_hiden"}>
              <div
                className={isLoading ? "preloader__spinner" : "preloader_hiden"}
              >
                <div></div>
              </div>
            </div>
          </div>
        </section>
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
                checked={props.isShortFilms}
                onChange={() => props.shortFilms()}
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
          {moviesCount.map((obj, i) => (
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
              <FavoriteButton
                MoviesRemoveFavorite={MoviesRemoveFavorite}
                savedMovies={props.savedMovies}
                obj={obj}
                MoviesToFavorite={MoviesToFavorite}
              />
              <a
                href={obj.trailerLink}
                target="_blank"
                className="films__img-block_link"
              >
                <img
                  className="films__img-block"
                  src={"https://api.nomoreparties.co/" + obj.image.url}
                  alt="изображение фильма"
                />
              </a>
            </div>
          ))}
        </section>
        <section className="more">
          <button
            className={moreButtonClass}
            onClick={() => setmoreCountFunc()}
          >
            Ещё
          </button>
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

export default Films;
