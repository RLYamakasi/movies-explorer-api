import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
const Login = (props) => {
  return (
    <section className="registration">
      <header className="registration__header">
        <Link to="/" className="registration__logo">
          <img src={logo} alt="логотип" />
        </Link>
      </header>
      <main className="registration__main">
        <h1 className="registration__title">Рады видеть!</h1>
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
        <button className="registration__save-button">Войти</button>
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
