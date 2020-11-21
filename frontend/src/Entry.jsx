import React from "react";
import { connect } from "react-redux";
import NavigationBar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {AdminHome} from "./Components/AdminHome";
import {UserHome} from "./Components/UserHome";
import { updateRawData } from "./redux/actions";
import { getLocalStorage } from "./utils/utils";

class Entry extends React.Component {

  componentDidMount() {
    let states = getLocalStorage();
    updateRawData(states)
  }

  getHomePage = () => {
    let {session = {}, isLoggedIn} = this.props;

    if(!isLoggedIn)
      return <HomePage/>
    return session.is_staff? <AdminHome/> : <UserHome/>
  }

  render() {
    let { currentUrl, session } = this.props;
    session = !session? {}: session;

    return (
      <>
        <NavigationBar />
        {currentUrl === "Home" && this.getHomePage()}
        {currentUrl === "Login" && <Login />}
        {currentUrl === "Signup" && <Signup />}
        {currentUrl === "Admin" && <AdminHome />}
        {currentUrl === "User" && <UserHome />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { currentUrl = "Home", session = {}, isLoggedIn } = state.rawData;
  return { currentUrl, session, isLoggedIn };
};

export default connect(mapStateToProps)(Entry);
