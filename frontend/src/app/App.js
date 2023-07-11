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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [isShortFilms, setShortFilms] = useState(
    localStorage.getItem("isShort") === "true"
  );
  // const [isShortSavedFilms, ShortSavedFilms] = useState(
  //   localStorage.getItem("isShortFavorite") === "true"
  // );

  useEffect(() => {
    if (window.screen.availWidth <= 1024) {
      isSideBarOpen(true);
    }
    setShortFilms(localStorage.getItem("isShort") === "true");
    if (localStorage.getItem("isShort") === "true") {
      shortFilms();
    } else {
      localStorage.setItem("isShort", true);
      SearchFilter();
    }
  }, []);

  const shortFilms = () => {
    if (isShortFilms === true) {
      setShortFilms(false);
      localStorage.setItem("isShort", isShortFilms);
      SearchFilter();
    } else {
      setShortFilms(true);
      localStorage.setItem("isShort", isShortFilms);
      SearchFilter();
      // moreButton("more__button");
    }
  };

  const SearchSavedFilter = () => {
    if (JSON.parse(localStorage.getItem("SearchFilm")) === null) {
      if (isShortFilms) {
        console.log(1);
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) => item.duration <= 40
          )
        );
      } else {
        console.log(2);
        setSavedMovies(JSON.parse(localStorage.getItem("FavoriteMovie")));
      }
    } else {
      if (isShortFilms) {
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) =>
              item === [JSON.parse(localStorage.getItem("SearchFilm"))] &&
              item.duration <= 40
          )
        );
      } else {
        console.log(JSON.parse(localStorage.getItem("SearchFilm")).id);
        setSavedMovies(
          JSON.parse(localStorage.getItem("FavoriteMovie")).filter(
            (item) =>
              item.id === JSON.parse(localStorage.getItem("SearchFilm")).id
          )
        );
      }
    }
  };

  const SearchFilter = () => {
    if (JSON.parse(localStorage.getItem("SearchFilm")) === null) {
      if (isShortFilms) {
        setMovies(JSON.parse(localStorage.getItem("AllFilms")));
      } else {
        setMovies(JSON.parse(localStorage.getItem("ShortFilms")));
      }
    } else {
      if (isShortFilms) {
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
          <Route path="/" element={<Main loggedIn={loggedIn} />}></Route>
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
                setShortFilms={setShortFilms}
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
          <Route path="/error" element={<Error />}></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={
                  <Films
                    shortFilms={shortFilms}
                    setShortFilms={setShortFilms}
                    isShortFilms={isShortFilms}
                    SearchFilter={SearchFilter}
                    setSavedMovies={setSavedMovies}
                    setMovies={setMovies}
                    // movies2={movies}
                    movies={movies}
                    savedMovies={savedMovies}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={
                  <SavedFilms
                    isShortFilms={isShortFilms}
                    setShortFilms={setShortFilms}
                    SearchSavedFilter={SearchSavedFilter}
                    setSavedMovies={setSavedMovies}
                    savedMovies={savedMovies}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <Account
                    setLoggedIn={setLoggedIn}
                    setСurrentUser={setСurrentUser}
                  />
                }
                loggedIn={loggedIn}
              />
            }
          ></Route>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
