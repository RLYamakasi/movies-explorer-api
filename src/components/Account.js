import logo from "../images/logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/MainApi";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ico_main from "../images/ico-main.svg";
import ico_exit from "../images/exit-ico.svg";
const Account = (props) => {
  const userContext = useContext(CurrentUserContext);
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };
  const editProfile = (name, email) => {
    api.patchProfile(name, email).then(() => {
      props.setСurrentUser({
        ...userContext,
        name,
        email,
      });
    });
  };
  const navigate = useNavigate();
  const logout = () => {
    api
      .clearCookie()
      .then((data) => {
        if (data) {
          navigate("/");
          props.setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };

  const [userValue, setUserValue] = useState({
    email: userContext.email,
    name: userContext.name,
  });

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
        <section className="account">
          {/* <form className="account__label">
            <input
              type="url"
              className="account__input"
              id="url"
              placeholder="Фильм"
              required
            />
          </form> */}
          <h1 className="account__title">Привет, {userContext.name}!</h1>
          <div className="account__block">
            <div className="account__block-name">
              <p className="account__block-name_text">Имя</p>
              <form className="account__label">
                <input
                  name="name"
                  type="name"
                  className="account__input"
                  id="name"
                  placeholder=""
                  required
                  onChange={handleChange}
                  value={userValue.name}
                />
              </form>
            </div>
            <div className="account__block-email">
              <p className="account__block-email_text">E-mail</p>
              <form className="account__label">
                <input
                  name="email"
                  type="email"
                  className="account__input"
                  id="email"
                  placeholder=""
                  required
                  onChange={handleChange}
                  value={userValue.email}
                />
              </form>
            </div>
          </div>
          <p
            className="account__content"
            onClick={() => editProfile(userValue.name, userValue.email)}
          >
            Редактировать
          </p>
          <p className="account__content" onClick={logout}>
            Выйти из аккаунта
          </p>
        </section>
      </main>
      <footer></footer>
    </section>
  );
};

export default Account;
