import logo from "../images/logo.svg"
import { Link } from "react-router-dom";
const Registration = (props) => {
    return(
    <main>
        <section className="registration">
            <img className="registration__logo" src={logo} alt="логотип"/>
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
        <button
            className="registration__save-button"
          >
            Зарегистрироваться
        </button>
        <Link to="/signin" className="registration__content-links">
          <p className="registration__content">Уже зарегистрированы?</p>
          <p className="registration__content">Войти</p>
        </Link>
        </section>
    </main>
    );
};

export default Registration;