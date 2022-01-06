import React, { useState } from "react";
import MainContext from "./MainContext";
import { fetchData } from "../components/Table/Table";

const ContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");

  const username = (user) => {
    // localStorage.setItem("user", user);
    setUser(user);
  };
  const repository = (repository) => {
    // localStorage.setItem("repo", repository);
    setRepo(repository);
  };

  const handleSubmit = () => {
    fetchData(user, repo);
    let table = document.getElementById("table");
    let pagination = document.getElementById("pagination");
    let msg = document.getElementById("msg");

    if (table) {
      table.parentNode.removeChild(table);
      pagination.parentNode.removeChild(pagination);
    } else if (msg) {
      msg.parentNode.removeChild(msg);
    }
  };

  return (
    <MainContext.Provider
      value={{
        user,
        repo,
        username,
        repository,
        handleSubmit,
      }}
    >
      <div>{props.children}</div>
    </MainContext.Provider>
  );
};

export default ContextProvider;
