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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  return (
    <div className="App" lang="ru">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<Registration />}></Route>
          <Route
            path="/signin"
            element={
              <Login
                setСurrentUser={setСurrentUser}
                setMovies={setMovies}
                setLoggedIn={setLoggedIn}
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
                    setMovies={setMovies}
                    movies2={movies}
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
              <ProtectedRoute element={<SavedFilms />} loggedIn={loggedIn} />
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
