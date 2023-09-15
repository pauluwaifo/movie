import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function SearchedMoviePage({ searchText }) {
  const [movie, setMovie] = useState([""]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=6cdab13971e086e7f76a7fd28fe6a1ad&query=${searchText}&page=1&include_adult=false`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        if (searchText) {
          setMovie(data.results);
        }
        if (movie.length > 0) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        nav("/404");
      }
    }
    fetchMovies();
  }, [searchText]);

  const searchResults = movie.map((obj, i) => {
    return (
      <div className="col-sm-6 col-lg-3" key={i}>
        <Card movie={obj} loading={loading} />
      </div>
    );
  });

  return (
    <>
      {!loading ? (
        <div className="container mt-10 text-center">
          <div className="row g-5 justify-space-between">
            <h5 className="">
              Search Results for{" "}
              <strong style={{ color: "#9e0d32" }}>{searchText}</strong>
            </h5>
            {searchResults}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default SearchedMoviePage;
