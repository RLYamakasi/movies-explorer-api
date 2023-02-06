import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
const Account = () => {
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
        <section className="account">
          <h1 className="account__title">Привет, Алексей!</h1>
          <div className="account__block">
            <div className="account__block-name">
              <p className="account__block-name_text">Имя</p>
              <p className="account__block-name_value">Алексей</p>
            </div>
            <div className="account__block-email">
              <p className="account__block-email_text">E-mail</p>
              <p className="account__block-email_value">pochta@yandex.ru</p>
            </div>
          </div>
          <p className="account__content">Редактировать</p>
          <p className="account__content">Выйти из аккаунта</p>
        </section>
      </main>
    </section>
  );
};

export default Account;
