import React, { useContext } from "react";
import "./searchBarStyle.css";
import MainContext from "../../context/MainContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const context = useContext(MainContext);

  return (
    <div id="search-container">
      <div>
        <input
          className="prompt"
          placeholder="username"
          type="text"
          value={context.user}
          onChange={(e) => context.username(e.target.value)}
        />
        <input
          className="prompt"
          placeholder="repo"
          type="text"
          value={context.repo}
          onChange={(e) => context.repository(e.target.value)}
        />
      </div>

      <Link to={`/${context.user}/${context.repo}`}>
        <button id="search" type="submit" onClick={context.handleSubmit}>
          Search
        </button>
      </Link>
    </div>
  );
};
export default SearchBar;
