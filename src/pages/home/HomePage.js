import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import githubImg from "../../images/github.png";
import "./homePageStyle.css";

const HomePage = () => {
  return (
    <>
      <div>
        <SearchBar />
        <div className="logo">
          <img src={githubImg} alt={githubImg}></img>
          <h1>Github Issue Viewer</h1>
        </div>
      </div>
    </>
  );
};
export default HomePage;
