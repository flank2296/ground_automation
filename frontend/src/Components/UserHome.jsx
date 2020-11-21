import UserBookings from "./UserBookings";
import React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import { saveLocalStorage } from "../utils/utils";
import { updateRawData } from "../redux/actions";
import { userOption } from "../utils/constants";
import BookGround from "./BookGround";
import { Button } from "react-bootstrap";;

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
                  style={{textAlign: "center", marginTop: '20%'}}
                >
                  <span dangerouslySetInnerHTML={{__html: src}} />
                  <p style={{textAlign: "center", marginTop:"2%"}}><b> {label} </b></p>
                </Col>
              );
            })}
          </Row>
        )}
        {selectedOption == 0 && (
          <Container>
            <Row>
              <Col
                sm={12}
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
        {selectedOption == 1 && (
          <Container>
          <Row>
            <Col
              sm={12}
              style={{ width: "-webkit-fill-available" }}
              className="mobile-box"
            >
              <div className="boxed centered" style={{height: "700px"}}>
                {selectedOption == 1 && <UserBookings />}
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
