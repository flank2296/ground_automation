import React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import { updateRawData } from "../redux/actions";
import { adminOptions } from "../utils/constants";
import AddEditGround from "./AddEditGround";
import { Button } from "react-bootstrap";
import { saveLocalStorage } from "../utils/utils";
import QRReader from "./ReadQr";
import AdminBooking from "./AdminBooking";

class AdminHomeComponent extends React.Component {

  render() {
    let { selectedOption } = this.props;
    return (
      <div>
        {selectedOption == null && (
          <Row>
            {adminOptions.map((key) => {
              let { src, id, label } = key;
              return (
                <Col
                  sm={4}
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
                <div className="boxed centered">
                  {selectedOption == 0 && <AddEditGround />}
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
              <div className="boxed centered" style={{height: "700px", width: "1000px", marginLeft: '5%'}}>
                {selectedOption == 1 && <AdminBooking />}
              </div>
            </Col>
          </Row>
        </Container>
        )}
        {selectedOption == 2 && (
          <Container>
            <Row>
              <Col
                sm={12}
                style={{ width: "-webkit-fill-available" }}
              >
                  <QRReader />
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

export const AdminHome = connect(mapStateToProps)(AdminHomeComponent);
