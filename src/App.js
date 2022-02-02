import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import browserHistory from "./browserHistory";
import { Provider as StateContext } from "./state";
import SearchForm from "./containers/search-form/search-form";
import ResultsTable from "./containers/card/card";

function App() {
  return (
    <Router history={browserHistory}>
      <StateContext>
        <div className="App">
          <SearchForm />
          <ResultsTable />
        </div>
      </StateContext>
    </Router>
  );
}

export default App;
