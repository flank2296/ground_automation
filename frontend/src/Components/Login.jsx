import React from "react";
import { Container, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Row } from "react-bootstrap";
import { saveLocalStorage, showAlert } from "../utils/utils.js";
import { loginUser } from "../services.js";

import "../css/login.css";
import { updateRawData } from "../redux/actions/index.js";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  onSubmitHandler = () => {
    let { username, password } = this.state;
    loginUser({ username, password }, (res) => {
      let currentUrl = res.session.is_staff ? "Admin" : "User";
      updateRawData({ session: res.session, isLoggedIn: true, currentUrl });
      saveLocalStorage({currentUrl, isLoggedIn: true, session:res.session});
    });
    showAlert("Incorrect Username or password", "error");
  };

  render() {
    let { username, password } = this.state;
    return (
      <Row>
        <Col sm={4}></Col>
        <Col sm={4} className="login-div">
          <Container className="">
            <p className="center header-title">Login</p>
            <div>
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="username"
                    placeholder="myemail@email.com"
                    value={username}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
              <div className="center">
                <Button color="primary" onClick={() => this.onSubmitHandler()}>
                  Log In
                </Button>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Login;
