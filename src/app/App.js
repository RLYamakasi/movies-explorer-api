// import './index.css';
import Main from '../components/Main';
import Films from '../components/Films';
import SavedFilms from '../components/SavedFilms';
import Registration from '../components/Registration';
import Login from '../components/Login';
import Error from '../components/Error';
import Account from '../components/Account';
import { React, useEffect, useState } from "react";
import { Routes, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<Main/>}>
        </Route>
        <Route path="/films" element={<Films/>}>
        </Route>
        <Route path="/saved-films" element={<SavedFilms/>}>
        </Route>
        <Route path="/registration" element={<Registration/>}>
        </Route>
        <Route path="/login" element={<Login/>}>
        </Route>
        <Route path="/error" element={<Error/>}>
        </Route>
        <Route path="/account" element={<Account/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;