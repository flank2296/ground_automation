import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { clearRawData, updateRawData } from "../redux/actions";
import {logout} from '../services';
import { clearLocalStorage } from "../utils/utils";

class NavigationBar extends React.Component {
  onNavHandler = (id) => {
    updateRawData({ currentUrl: id });
  };

  logoutUser = () => {
    logout(() => clearRawData())
    clearLocalStorage()
  }

  render() {
    let { currentUrl, isLoggedIn, selectedOption } = this.props;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => this.onNavHandler("Home")}>
          Ground Automation
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            id="Home"
            active={currentUrl === "Home" && selectedOption != null}
            onClick={() => this.onNavHandler("Home")}
          >
            Home
          </Nav.Link>
          <Nav.Link
            id="Features"
            active={currentUrl === "Features"}
            onClick={() => this.onNavHandler("Features")}
          >
            Features
          </Nav.Link>
          <Nav.Link
            id="Pricing"
            active={currentUrl === "Pricing"}
            onClick={() => this.onNavHandler("Pricing")}
          >
            Pricing
          </Nav.Link>
        </Nav>
        {!isLoggedIn && (
          <Nav style={{ float: "right" }}>
            <Nav.Link
              id="Login"
              active={currentUrl === "Login"}
              onClick={() => this.onNavHandler("Login")}
            >
              Login
            </Nav.Link>
            <Nav.Link
              id="Signup"
              active={currentUrl === "Signup"}
              onClick={() => this.onNavHandler("Signup")}
            >
              Signup
            </Nav.Link>
          </Nav>
        )}
        {
          isLoggedIn && <Nav style={{ float: "right" }}>
            <Nav.Link
              id="Logout"
              active={currentUrl === "Logout"}
              onClick={() => this.logoutUser()}
            >
              Logout
            </Nav.Link>
          </Nav>
        }
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    currentUrl = "Home",
    isLoggedIn = false,
    session = {},
    selectedOption = null
  } = state.rawData;
  return { currentUrl, isLoggedIn, session };
};

export default connect(mapStateToProps)(NavigationBar);
