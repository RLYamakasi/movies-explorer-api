export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  };

  register = (name, password, email) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ name, password, email }),
    }).then((res) => this._getResponseData(res));
  };

  login = (password, email) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    }).then((res) => this._getResponseData(res));
  };

  getMovies = () => {
    return fetch(`${this._baseUrl}/movies`, {
      method: `GET`,
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  };

  clearCookie = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  patchProfile = (name, email) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._getResponseData(res));
  };

  DeleteMovie = (movieId) => {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "Delete",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  changeLikeMovieStatus = (id, status) => {
    if (status) {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: "DELETE",
        headers: this._headers,
        credentials: "include",
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: "PUT",
        headers: this._headers,
        credentials: "include",
      }).then((res) => this._getResponseData(res));
    }
  };



  addToFavorite = (
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailerLink,
    owner,
    movieId,
    nameRU,
    nameEN
  ) => {
    return fetch(`${this._baseUrl}/movies`, {
      method: `POST`,
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        thumbnail,
        trailerLink,
        owner,
        movieId,
        nameRU,
        nameEN,
      }),
    }).then((res) => this._getResponseData(res));
  };
}

export const api = new MainApi({
  baseUrl: "https://moviesbackend.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});
