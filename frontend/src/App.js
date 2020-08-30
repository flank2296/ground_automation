import React from "react";
import "./App.css";
import { doGet } from "./utils/requests";

class App extends React.Component {
  componentDidMount() {
    doGet("api/test/", console.log, console.log)
  }

  render() {
    return <h1> Ankush Gochke</h1>;
  }
}

export default App;
