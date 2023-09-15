import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SearchedMoviePage from "./pages/SearchedMoviePage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Error from "./pages/Error";
import { useLocation } from "react-router-dom";

function App() {
  const [searchText, setSearchText] = useState("");
  const locate = useLocation();
  return (
    <div className="App">
      {locate.pathname.includes("search") && (
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          background={{ background: "#080e1d" }}
        />
      )}
      {locate.pathname !== "/404" && !locate.pathname.startsWith("/movie/") && (
        <Header searchText={searchText} setSearchText={setSearchText} />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route
          path="/search/:param"
          element={<SearchedMoviePage searchText={searchText} />}
        />
        <Route path="/404" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
