// import './index.css';
import Main from "../components/Main";
import Films from "../components/Films";
import SavedFilms from "../components/SavedFilms";
import Registration from "../components/Registration";
import Login from "../components/Login";
import Error from "../components/Error";
import Account from "../components/Account";
import ProtectedRoute from "../components/ProtectedRoute";
import { React, useEffect, useState } from "react";
import { Routes, Route, Redirect, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/MainApi";
import { apiMovie } from "../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  // const [isShortSavedFilms, setShortSavedFilms] = useState(
  //   localStorage.getItem("isShortSaved") === "true"
  // );

  const login = () => {
    Promise.all([api.getProfile(), apiMovie.getMovies()])
      .then(([infoResult, moviesResult]) => {
        setСurrentUser({
          name: infoResult.name,
          email: infoResult.email,
          id: infoResult._id,
        });
        localStorage.setItem(
          "AllFilms",
          JSON.stringify(moviesResult.reverse())
        );
        setMovies(JSON.parse(localStorage.getItem("AllFilms")));
        localStorage.setItem(
          "ShortFilms",
          JSON.stringify(moviesResult.filter((item) => item.duration <= 40))
        );
        navigate("/movies");
        SearchFilter();
        setLoggedIn(true);
        console.log(loggedIn, isSideBarOpen);
      })
      .catch((err) => {
        console.log(`Вы неавторизованы ${err}`);
      });
  };

  useEffect(() => {
    if (window.screen.availWidth <= 1024) {
      setSideBarOpen(true);
    }
  }, []);

  const shortFilms = () => {
    if (JSON.parse(localStorage.getItem("isShort")) === true) {
      localStorage.setItem("isShort", false);
      SearchFilter();
    } else {
      localStorage.setItem("isShort", true);
      SearchFilter();
    }
  };

  const SearchSavedFilter = () => {
    if (JSON.parse(localStorage.getItem("SearchFilm")) === null) {
      if (JSON.parse(localStorage.getItem("isShortSaved"))) {
        setSavedMovies(JSON.parse(localStorage.getItem("FavoriteMovie")));
      } else {
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) => item.duration <= 40
          )
        );
      }
    } else {
      if (JSON.parse(localStorage.getItem("isShortSaved"))) {
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) =>
              item.id === JSON.parse(localStorage.getItem("SearchFilm")).id
          )
        );
      } else {
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) =>
              item === [JSON.parse(localStorage.getItem("SearchFilm"))] &&
              item.duration <= 40
          )
        );
      }
    }
  };

  const SearchFilter = () => {
    if (JSON.parse(localStorage.getItem("SearchFilm")) === null) {
      if (JSON.parse(localStorage.getItem("isShort"))) {
        setMovies(JSON.parse(localStorage.getItem("AllFilms")));
      } else {
        setMovies(JSON.parse(localStorage.getItem("ShortFilms")));
      }
    } else {
      if (JSON.parse(localStorage.getItem("isShort"))) {
        setMovies([JSON.parse(localStorage.getItem("SearchFilm"))]);
      } else {
        setMovies(
          [JSON.parse(localStorage.getItem("SearchFilm"))].filter(
            (item) => item.duration <= 40
          )
        );
      }
    }
  };

  return (
    <div className="App" lang="ru">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/movies"
              exact
              element={
                <Films
                  login={login}
                  shortFilms={shortFilms}
                  SearchFilter={SearchFilter}
                  setSavedMovies={setSavedMovies}
                  setMovies={setMovies}
                  movies={movies}
                  savedMovies={savedMovies}
                />
              }
            ></Route>
            <Route
              path="/saved-movies"
              element={
                <SavedFilms
                  SearchSavedFilter={SearchSavedFilter}
                  setSavedMovies={setSavedMovies}
                  savedMovies={savedMovies}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Account
                  setLoggedIn={setLoggedIn}
                  setСurrentUser={setСurrentUser}
                />
              }
            ></Route>
          </Route>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/signup"
            element={
              <Registration
                setСurrentUser={setСurrentUser}
                setMovies={setMovies}
                setLoggedIn={setLoggedIn}
                setSavedMovies={setSavedMovies}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Login
                login={login}
                SearchFilter={SearchFilter}
                setСurrentUser={setСurrentUser}
                movies={movies}
                setMovies={setMovies}
                setLoggedIn={setLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          ></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
