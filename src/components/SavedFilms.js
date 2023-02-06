import logo from "../images/logo.svg";
import search from "../images/search.svg";
import find from "../images/find.svg";
import closeicon from "../images/closeIcon.svg";
import randomPic from "../images/randompic.png";
import { Link } from "react-router-dom";

const SavedFilms = () => {
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
          <div className="films__block">
            <p className="films__text-block">33 слова о дизайне</p>
            <p className="films__time-block">1ч 47м</p>
            <button className="films__ico-block">
              <img className="films__ico-block_img" src={closeicon} />
            </button>
            <img className="films__img-block" src={randomPic} />
          </div>
          <div className="films__block">
            <p className="films__text-block">33 слова о дизайне</p>
            <p className="films__time-block">1ч 47м</p>
            <button className="films__ico-block">
              <img className="films__ico-block_img" src={closeicon} />
            </button>
            <img className="films__img-block" src={randomPic} />
          </div>
          <div className="films__block">
            <p className="films__text-block">33 слова о дизайне</p>
            <p className="films__time-block">1ч 47м</p>
            <button className="films__ico-block">
              <img className="films__ico-block_img" src={closeicon} />
            </button>
            <img className="films__img-block" src={randomPic} />
          </div>
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
