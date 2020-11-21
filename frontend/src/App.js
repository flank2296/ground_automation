import "./App.css";
import React from "react";
import { StyleRoot } from "radium";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";
import Entry from "./Entry.jsx";

import './App.css';
import './commonJsx.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render() {
    return (
      <StyleRoot>
        <ToastContainer position="top-right" transition={Slide} />
        <Provider store={store}>
          <Entry />
        </Provider>
      </StyleRoot>
    );
  }
}

export default App;
