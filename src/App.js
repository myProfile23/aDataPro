import React from "react";
import ContextProvider from "./context/ContextProvider";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/:username/:repo" element={<SearchPage />} />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
