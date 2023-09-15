import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function MovieDetailPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null); // Initialize as null
  const [video, setVideo] = useState([]); // Initialize as an empty array
  const [videoKey, setVideoKey] = useState(""); // Initialize as an empty string

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6cdab13971e086e7f76a7fd28fe6a1ad&query=&language=en-US`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((err) => {
        console.error(err);
        nav("/404");
      });
  }, [id]);

  useEffect(() => {
    const urlVideo = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=6cdab13971e086e7f76a7fd28fe6a1ad`;
    fetch(urlVideo)
      .then((response) => response.json())
      .then((data) => {
        const officialVideos = data.videos.results.filter(
          (vidKey) =>
            vidKey.name === "Official Trailer" ||
            vidKey.name === "Official Teaser Trailer" ||
            videoKey.name === "Official US Trailer"
        );
        if (officialVideos.length > 0) {
          setVideo(officialVideos);
          setVideoKey(officialVideos[0].key);
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        nav("/404");
      });
  }, [id]);

  let dateStr = null;
  if (movieDetails) {
    dateStr = movieDetails.release_date;
  }
  // Display the result
  const dateObj = new Date(dateStr);
  const utcDateStr = dateObj.toISOString();

  return (
    <div>
      {movieDetails ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-sm-12">
                <div className="side-nav">
                  <Link className="side-home" to="/">
                    MovieBox
                  </Link>
                  <Link to="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                  <Link className="my-active" to="/">
                    <i className="fas fa-video light-grey"></i> Movies
                  </Link>
                  <Link className='sd-none' to="/">
                    <i className="fas fa-caret-square-right"></i> TV Series
                  </Link>
                  <Link className='sd-none' to="/">
                    <i className="fab fa-hive"></i> Upcoming
                  </Link>
                  <div className="side-content sd-none">
                    <h6>
                      Lorem ipsum dolor elit. consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur{" "}
                    </h6>
                    <p className="light-grey">Lorem ipsum, dolor sit amet </p>
                    <button>click me</button>
                  </div>
                  <Link to="/">
                    <i className="fas fa-sign-out-alt"></i> Log out
                  </Link>
                </div>
              </div>
              <div className="col-lg-10 mt-4">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <iframe
                      className="rounded-2"
                      title="movie trailer"
                      id="videoPlayer"
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${videoKey}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="col-lg-9 co-sm-12 mt-3">
                    <div className="movie_details d-block">
                      <ul className="mfw-bold mfs-3">
                        <li
                          style={{
                            listStyleType: "none",
                            marginLeft: "0px !important",
                          }}
                          data-testid="movie-title"
                          id="title"
                        >
                          {movieDetails.original_title}
                        </li>
                        <li data-testid="movie-release-date" id="release date">
                          {utcDateStr}
                        </li>
                        <li data-testid="movie-runtime" id="runtime">
                          {movieDetails.runtime}m
                        </li>
                        {movieDetails.genres.map((genre, i) => {
                          return (
                            <li
                              key={i}
                              style={{ listStyleType: "none" }}
                              className="genre"
                            >
                              {genre.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="ml-15 mt-5 d-block mfw-400">
                      <p data-testid="movie-overview" id="overview">
                        {movieDetails.overview}
                      </p>
                      <p>
                        Tagline:{" "}
                        <span className="p-color">{movieDetails.tagline}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12 al-r mt-3 ">
                    <i className="fas fa-star gold"></i>
                    <span className="fw-bold mfs-2 p-0 light-grey">
                      {movieDetails.vote_average}
                    </span>
                    <span className="fw-bold mfs-2 p-0">
                      {" "}
                      | {movieDetails.vote_count}
                    </span>
                    <button className="show">
                      <i className="fas fa-ticket-alt mx-2"></i>
                      See Showtimes
                    </button>
                    <button className="more">
                      <i className="fas fa-list-ul mx-2"></i>
                      See Showtimes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MovieDetailPage;
