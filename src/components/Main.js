import logo from "../images/logo.svg";
import link from "../images/link.svg";
import me from "../images/me.jpg";
import { Link } from "react-router-dom";
import { React, useState } from "react";
const Main = (props) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <section>
      <header>
        <nav className="navbar">
          <Link to="/" className="navbar__avatar">
            <img src={logo} className="profile__avatar-img" alt="логотип" />
          </Link>
          {props.loggedIn ? (
            <Link to="/movies" className="navbar__films">
              Фильмы
            </Link>
          ) : (
            <Link to="signup" className="navbar__registration">
              Регистрация
            </Link>
          )}
          {props.loggedIn ? (
            <Link to="/saved-movies" className="navbar__saved-films">
              Сохранённые
            </Link>
          ) : (
            <Link to="signin" className="navbar__login">
              <p className="navbar__login_text">Войти</p>
            </Link>
          )}
          {props.loggedIn ? (
            <Link to="/profile" className="navbar__account">
              Аккаунт
            </Link>
          ) : (
            <Link to="signin" className="navbar__login">
              <p className="navbar__login_text">Войти</p>
            </Link>
          )}
        </nav>
      </header>
      <main>
        <section className="info">
          <h1 className="info__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <div className="info__links">
            <button className="info__link">О проекте</button>
            <button className="info__link">Технологии</button>
            <button className="info__link">Студент</button>
            {/* <a >О проекте</a>
                    <a className="info__link">Технологии</a>
                    <a className="info__link">Студент</a> */}
          </div>
        </section>
        <section className="time-info">
          <h2 className="time-info__title">О проекте</h2>
          <div className="time-info__block-for-text">
            <div className="time-info__text">
              <h3 className="time-info__text_title">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="time-info__text_subtitle">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </div>
            <div className="time-info__text">
              <h3 className="time-info__text_title">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="time-info__text_subtitle">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </div>
          </div>
          <div className="time-info__time-line">
            <h4 className="time-info__backend-part">1 неделя</h4>
            <p className="time-info__backend-part_text">Back-end</p>
            <h4 className="time-info__frontend-part">4 недели</h4>
            <p className="time-info__frontend-part_text">Front-end</p>
          </div>
        </section>
        <section className="technologies">
          <p className="technologies__title">Технологии</p>
          <div className="technologies__main-text">7 технологий</div>
          <div className="technologies__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </div>
          <div className="technologies__links">
            <div className="technologies__link">
              <a className="technologies__link_text">HTML</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">CSS</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">JS</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">React</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">Git</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">Express.js</a>
            </div>
            <div className="technologies__link">
              <a className="technologies__link_text">mongoDB</a>
            </div>
          </div>
        </section>
        <section className="student">
          <p className="student__title">Студент</p>
          <div className="student__about-me">
            <h5 className="student__name">Алексей</h5>
            <p className="student__age-and-profession">
              будущий фронтенд-разработчик, 17 лет
            </p>
            <p className="student__main-info">
              Я родился и живу в Волгограле, учусь в 11 классе. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того,
              как прошёл курс по веб-разработке, решил, что хочу стать
              веб-разработчиком.
            </p>
            <p className="student__git-link">Github</p>
            <img className="student__image" src={me} alt="изображение меня" />
          </div>
        </section>
        <section className="portfolio">
          <p className="portfolio__title">Портфолио</p>
          <div className="portfolio__links">
            <a
              href="https://github.com/RLYamakasi/how-to-learn"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link_text">Статичный сайт</p>
              <img
                className="portfolio__link_img"
                src={link}
                alt="иконка-ссылка Статичный сайт"
              />
            </a>
            <a
              href="https://github.com/RLYamakasi/russian-travel"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link_text">Адаптивный сайт</p>
              <img
                className="portfolio__link_img"
                src={link}
                alt="иконка-ссылка Адаптивный сайт"
              />
            </a>
            <a
              href="https://github.com/RLYamakasi/react-mesto-api-full"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link_text">Одностраничное приложение</p>
              <img
                className="portfolio__link_img"
                src={link}
                alt="иконка-ссылка Одностраничное приложение"
              />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
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

export default Main;
