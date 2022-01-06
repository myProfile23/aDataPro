import { createContext } from "react";

const MainContext = createContext({
  user: "",
  repo: "",
  handleSubmit: () => {},
  username: () => {},
  repository: () => {},
});

export default MainContext;
