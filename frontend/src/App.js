import "./App.css";
import React from "react";
import { StyleRoot } from "radium";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {doGet} from './utils/requests'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";
import { showAlert } from "./utils/utils";


class App extends React.Component {
  componentDidMount() {
    doGet("api/test/", console.log, console.log);
  }

  render() {
    return (
      <StyleRoot>
        <ToastContainer position="top-right" transition={Slide} />
        <Provider store={store}></Provider>
        <h1> Ankush Gochke</h1>;
      </StyleRoot>
    );
  }
}

export default App;
