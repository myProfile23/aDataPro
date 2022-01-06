import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import DisplayTable from "../../components/Table/DisplayTable";
import "./searchPageStyle.css";
import MainContext from "../../context/MainContext";

const SearchPage = () => {
  const context = useContext(MainContext);
  let urlParams = useParams();

  useEffect(() => {
    context.username(urlParams.username);
    context.repository(urlParams.repo);
    let container = document.getElementById("search-container");
    container.classList.add("active");
    // eslint-disable-next-line
  }, []);

  if (urlParams) {
    window.onload = () => {
      document.getElementById("search").click();
    };
  }

  return (
    <>
      <div>
        <SearchBar />
        <DisplayTable />
      </div>
    </>
  );
};
export default SearchPage;
