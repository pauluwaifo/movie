import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const nav = useNavigate();
  const [movie, setMovie] = useState([""]);
  const [movieStatic, setMovieStatic] = useState([""]);
  const [movieBackdrop, setMovieBackdrop] = useState([""]);
  const [video, setVideo] = useState([""]);
  const [videoKey, setVideoKey] = useState("");
  const [slideId, setSlideId] = useState("789");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2RhYjEzOTcxZTA4NmU3Zjc2YTdmZDI4ZmU2YTFhZCIsInN1YiI6IjYzYjAxOWQxNTc1MzBlMDA4NTAxM2FmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZkce-xL6W_73mKqWEjqa-lcWH8oXbJ_2bq56tw85bQ",
    },
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.results.slice(0, 10));
        setMovieBackdrop(data.results.slice(10, 14));
        setMovieStatic(data.results[15]);
        setLoading(false); // Move this inside the success callback
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        nav("/404");
      });
  }, []);

  useEffect(() => {
    const urlVideo = `https://api.themoviedb.org/3/movie/${slideId}?&append_to_response=videos&api_key=6cdab13971e086e7f76a7fd28fe6a1ad`;

    fetch(urlVideo)
      .then((response) => response.json())
      .then((data) => {
        const officialVideos = data?.videos?.results || [];
        setVideo(officialVideos);
        const officialTrailer = officialVideos.find(
          (vidKey) =>
            vidKey.name === "Official Trailer" ||
            vidKey.name === "Official Teaser Trailer"
        );
        if (officialTrailer) {
          setVideoKey(officialTrailer.key);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        nav("/404");
      });
  }, [slideId]);

  // const backdropPath = `https://image.tmdb.org/t/p/original${movieStatic.backdrop_path}`
  const openPictureInPicture = () => {
    const element = document.getElementById("pip-video");
    element.style.display = "block";
    element.style.transition = "all .5s ease-in";
  };
  const closePictureInPicture = () => {
    const element = document.getElementById("pip-video");
    const iframe = document.getElementById("videoPlayer");
    if (
      iframe &&
      iframe.tagName === "IFRAME" &&
      iframe.src.includes("youtube.com")
    ) {
      iframe.src = `https://www.youtube.com/embed/${videoKey}`;
    }
    element.style.display = "none";
    element.style.transition = "all .5s ease-in";
  };
  const topMovies = movie.map((topMovie, i) => {
    return (
      <div className="col-lg-3 col-sm-12 mt-3" key={i}>
        <Card movie={topMovie} />
      </div>
    );
  });

  const slide = movieBackdrop.map((slide, i) => {
    return (
      <div className="carousel-item" data-bs-interval="6000" key={i}>
        {slide && slide.backdrop_path ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
              className="overlayed-image"
              alt={slide.original_title}
              width={"100%"}
            />
            <div className="overlay"></div>
            <div className="inner-text">
              {slide && slide.backdrop_path && (
                <>
                  <h3>{slide.original_title}</h3>
                  <div className="holder">
                    <div className="vote"> IMDb </div>
                    <p className="mfs-2 d-inline-block">
                      {slide.vote_average}/100
                    </p>
                    <p className="mfs-2 d-inline-block al-end">
                      {slide.popularity}
                    </p>
                    <div className="popularity al-end"> PPL </div>
                  </div>
                  <p className="sd-none">{slide.overview}</p>
                  <button
                    type="button"
                    id="pip-link"
                    onClick={() => {
                      setSlideId(slide.id);
                      openPictureInPicture();
                      console.log(slide.id);
                    }}
                    className="link"
                  >
                    <i className="fas fa-play-circle pr-2"></i>
                    WATCH TRAILER
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  });

  return (
    <>
      {!loading ? (
        <>
          <div className="m-container" id="pip-video">
            <i
              className="fas fa-times close"
              id="close"
              onClick={closePictureInPicture}
            ></i>
            <div className="m-modal">
              {slideId ? (
                <iframe
                  id="videoPlayer"
                  className="iframe-size"
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  frameBorder="0"
                  allowFullScreen
                  onLoad={() => setReload(true)}
                ></iframe>
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="container-fluid p-0">
            <div className="col-12 col-sm-12 ">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                </div>
                {/* CAROUSEL INNER */}
                <div className="carousel-inner ">
                  {movieStatic && movieStatic.backdrop_path ? (
                    <>
                      <div
                        className="carousel-item active"
                        data-bs-interval="5000"
                      >
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieStatic.backdrop_path}`}
                              alt={movieStatic.original_title}
                              className="overlayed-image"
                              width={"100%"}
                            />
                            <div className="overlay"></div>
                          </>
                        )}
                        <div className="inner-text">
                          <h3>{movieStatic.original_title}</h3>
                          <div className="holder">
                            <div className="vote"> IMDb </div>
                            <p className="mfs-2 d-inline-block">
                              {movieStatic.vote_average}/100
                            </p>
                            <p className="mfs-2 d-inline-block al-end">
                              {movieStatic.popularity}
                            </p>
                            <div className="popularity al-end"> PPL </div>
                          </div>
                          <p className="sd-none">{movieStatic.overview}</p>
                          <button
                            type="button"
                            id="pip-link"
                            onClick={() => {
                              openPictureInPicture();
                              setSlideId(movieStatic.id);
                              console.log(movieStatic.id);
                            }}
                            className="link"
                          >
                            <i className="fas fa-play-circle pr-2"></i>
                            WATCH TRAILER
                          </button>
                        </div>
                      </div>
                      {slide}
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon visually-hidden"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon visually-hidden"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 pd-0">
                <div className="row ">
                  <div className="col-6 al-l ">
                    <h5 className="m-0 p-0">Top Rated Movie</h5>
                  </div>
                  <div className="col-6 al-r ">
                    <Link className="dummy" to="/">
                      see more
                    </Link>
                  </div>
                </div>
              </div>
              {topMovies}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default HomePage;
