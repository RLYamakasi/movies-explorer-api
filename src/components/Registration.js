import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
const Registration = () => {
  return (
    <section className="registration">
      <header className="registration__header">
        <Link to="/" className="registration__logo">
          <img src={logo} alt="логотип" />
        </Link>
      </header>
      <main className="registration__main">
        <h1 className="registration__title">Добро пожаловать!</h1>
        <label className="registration__label">
          <p className="registration__text">Имя</p>
          <input
            type="email"
            className="registration__input"
            id="url"
            placeholder=""
            required
          />
          <span id="registration__error" className="registration__error">
            скрытый текст
          </span>
        </label>
        <label className="registration__label">
          <p className="registration__text">E-mail</p>
          <input
            type="email"
            className="registration__input"
            id="url"
            placeholder=""
            required
          />
          <span id="registration__error" className="registration__error">
            скрытый текст
          </span>
        </label>
        <label className="registration__label">
          <p className="registration__text">Пароль</p>
          <input
            type="password"
            className="registration__input"
            id="url"
            placeholder=""
            required
          />
          <span id="registration__error" className="registration__error">
            скрытый текст
          </span>
        </label>
        <button className="registration__save-button">
          Зарегистрироваться
        </button>
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
