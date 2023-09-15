import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Navbar({ setSearchText, background, display }) {
  const nav = useNavigate();
  const { queryParam } = useParams();
  const [search, setSearch] = useState(queryParam || "");

  const updateSearch = (e) => {
    const newValue = e.target.value;
    if (newValue == "") {
      setSearch((prev) => newValue);
    } else {
      setSearch(newValue);
    }
  };

  const updateSearchText = (e) => {
    e.preventDefault();
    setSearchText(search); // Call setSearchText with the search query
    {
      queryParam && setSearch(queryParam);
    }
    nav(`/search/${search}`);
  };

  return (
    <div className="nav" style={background}>
      <div className="logo">
        <Link to="/">
          <div>LoGO</div>
          <span className="sd-none">MovieBox</span>
        </Link>
      </div>
      <div className="search">
        <form>
          <input type="search" value={search} onChange={updateSearch} />
          <button onClick={updateSearchText} className="m-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="sign">
        <Link className="sd-none" to="/">
          Sign in
        </Link>
        <button className="signBtn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
