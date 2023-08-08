import logo from "../images/logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/MainApi";
import { React, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ico_main from "../images/ico-main.svg";
import ico_exit from "../images/exit-ico.svg";
import ico_popUp from "../images/check.png";
const Account = (props) => {
  const userContext = useContext(CurrentUserContext);
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);
  const [userValue, setUserValue] = useState({
    email: userContext.email,
    name: userContext.name,
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
  });
  const [isValid, setIsValid] = useState({
    email: true,
    name: true,
  });
  useEffect(() => {
    console.log(userContext);
    if (
      (userContext.name !== userValue.name ||
        userContext.email !== userValue.email) &&
      isValid.name &&
      isValid.email
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [userValue]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setUserValue({ ...userValue, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid({ ...isValid, [name]: target.closest("form").checkValidity() });
  };

  const OpenSideBar = () => {
    setSideBarOpen(true);
  };
  const CloseSideBar = () => {
    setSideBarOpen(false);
  };
  const editProfile = (name, email) => {
    if (isButtonActive) {
      api.patchProfile(name, email).then(() => {
        setPopUpOpen(true);
        setTimeout(() => {
          setPopUpOpen(false);
        }, 3000);
        console.log(popUpOpen);
        props.setСurrentUser({
          ...userContext,
          name,
          email,
        });
        setButtonActive(false);
      });
    }
  };
  const navigate = useNavigate();
  const logout = () => {
    api
      .clearCookie()
      .then((data) => {
        if (data) {
          navigate("/");
          localStorage.clear();
          localStorage.setItem("FavoriteMovie", JSON.stringify([]));
          // props.setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className={popUpOpen ? "pop-up" : "pop-up_hiden"}>
        <div className="pop-up__block">
          <img className="pop-up__img" src={ico_popUp} />
          <p>Успешно</p>
        </div>
      </div>
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
          <div className="account__block">
            <h1 className="account__title">Привет, {userContext.name}!</h1>
            <p className="account__block-error">{errors.name}</p>
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
            <p className="account__block-error">{errors.email}</p>
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
            className={
              isButtonActive ? "account__content" : "account__content_unactive"
            }
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
