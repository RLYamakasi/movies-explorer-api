import { React, useState } from "react";
import favorite from "../images/favorite.svg";
const FavoriteButton = ({
  savedMovies,
  obj,
  MoviesToFavorite,
  MoviesRemoveFavorite,
}) => {
  const [isliked, setLike] = useState(false);
  if (isliked || savedMovies.some((i) => i.id === obj.id)) {
    return (
      <button
        className={`films__ico-block_active`}
        onClick={() => {
          MoviesRemoveFavorite(obj, setLike);
        }}
      >
        <img
          className="films__ico-block_img"
          src={favorite}
          alt="иконка-избранное"
        />
      </button>
    );
  } else {
    return (
      <button
        className={`films__ico-block`}
        onClick={() => {
          MoviesToFavorite(obj, setLike);
        }}
      >
        <img
          className="films__ico-block_img"
          src={favorite}
          alt="иконка-избранное"
        />
      </button>
    );
  }
};

export default FavoriteButton;
