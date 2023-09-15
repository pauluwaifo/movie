import React, { useState } from "react";
import imageLoad from "../assests/imageLoad.jpg";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function Card({ movie, loading }) {
  const movieUrl = `/movie/${movie.id}`;
  const imgSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const [notification, setNotification] = useState(false);
  const addToFavorite = () => {
    setNotification((prevNotification) => {
      const newNotification = !prevNotification;
      if (newNotification) {
        alert("Added to favorites");
      } else {
        alert("Removed from favorites");
      }
      return newNotification;
    });
  };
  return (
    <div className="card" data-testid="movie-card" id="card">
      <Link to={movieUrl}>
        {movie && movie.poster_path ? (
          <img
            data-testid="movie-poster"
            id="movie poster"
            src={imgSrc}
            alt={movie.original_title}
            width={"100%"}
          />
        ) : movie.poster_path == null ? (
          <img
            data-testid="movie-poster"
            id="movie poster"
            src={imageLoad}
            alt={movie.original_title}
            width={"100%"}
          />
        ) : (
          <Loader />
        )}
        <div className="card-text">
          <span
            data-testid="movie-release-date"
            id="movie release date"
            className="fs-p9 light-grey fw-bold"
          >
            {movie.release_date}
          </span>
          <p
            data-testid="movie-title"
            id="movie title"
            className="fw-bold t-text p-0 m-0"
          >
            {movie.original_title}
          </p>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <div className="vote fs-p9"> IMDb </div>
                <p className="mfs-2 d-inline-block fs-p9 mr-5">
                  {movie.vote_average}/100
                </p>
              </div>
              <div className="col-6 al-r">
                <div className="popularity fs-p9 "> PPL </div>
                <p className="mfs-2 d-inline-block fs-p9">
                  {movie.popularity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <button className="circle" onClick={addToFavorite}>
        {notification ? (
          <i className="fa-solid fa-heart"></i>
        ) : (
          <i className="fa-regular fa-heart "></i>
        )}
      </button>
    </div>
  );
}

export default Card;
