import React from "react";
import { Container, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { Row } from "react-bootstrap";
import { showAlert, validateEmail } from "../utils/utils.js";
import { signup } from "../services";

import "../css/login.css";
import { updateRawData } from "../redux/actions/index.js";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmPassword: ""
  };

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value });
  };

  onSubmitHandler = () => {
    let invalidFields = [];
    let { password, confirmPassword } = this.state;
    if (password != confirmPassword){
      showAlert("Password does not match", "error");
      return
    }
    if(!validateEmail(this.state.username)){
      showAlert("Invalid Email", "error");
      return
    }
    Object.keys(this.state).forEach((key) => {
      if (!this.state[key]) {
        invalidFields.push(key);
      }
    });
    if (invalidFields.length) {
      showAlert(
        `Please fill all the mandatory fields - ${invalidFields.join(", ")}`,
        'error'
      );
      return;
    }
    signup({...this.state}, () => updateRawData({ currentUrl: "Login" }))
  };

  render() {
    let { username, password, name, confirmPassword } = this.state;
    return (
      <Row>
        <Col sm={4}></Col>
        <Col sm={4} className="signup-div">
          <Container className="">
            <p className="center header-title">Sign Up</p>
            <div>
              <Col>
                <FormGroup>
                  <Label>Your Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder="Jane"
                    value={name}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    id="lastname"
                    placeholder="Doe"
                    value={name}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
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
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
              <div className="center">
                <Button color="primary" onClick={() => this.onSubmitHandler()}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default SignUp;
