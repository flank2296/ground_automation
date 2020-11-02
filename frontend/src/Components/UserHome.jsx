import React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import { updateRawData } from "../redux/actions";
import { userOption } from "../utils/constants";
import BookGround from "./BookGround";
import { Button } from "react-bootstrap";
import { saveLocalStorage } from "../utils/utils";

class UserHomeComponent extends React.Component {

  render() {
    let { selectedOption } = this.props;
    return (
      <div>
        {selectedOption == null && (
          <Row>
            {userOption.map((key) => {
              let { src, id, label } = key;
              return (
                <Col
                  sm={6}
                  onClick={() => {
                    updateRawData({ selectedOption: id });
                    saveLocalStorage({ selectedOption: id });
                  }}
                >
                  <img src={src} />
                  <p> {label} </p>
                </Col>
              );
            })}
          </Row>
        )}
        {selectedOption != null && (
          <Container>
            <Row>
              <Col
                sm="12"
                xs="12"
                style={{ width: "-webkit-fill-available" }}
                className="mobile-box"
              >
                <div className="boxed centered" style={selectedOption == 0? {height: "500px"}: {}}>
                  {selectedOption == 0 && <BookGround />}
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedOption = null } = state.rawData || {};
  return { selectedOption };
}

export const UserHome = connect(mapStateToProps)(UserHomeComponent);
