import React from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import Model from "./components/model/Model";

const model = new Model();

function App() {
  return (
    <div className="app">
      <Grid model={model}></Grid>
    </div>
  );
}

export default App;
