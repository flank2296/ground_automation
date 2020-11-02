import React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

import { updateRawData } from "../redux/actions";
import { adminOptions } from "../utils/constants";
import AddEditGround from "./AddEditGround";
import { Button } from "react-bootstrap";
import { saveLocalStorage } from "../utils/utils";
import QRReader from "./ReadQr";

class AdminHomeComponent extends React.Component {
  componentDidMount() {
    // updateRawData({selectedOption: null});
  }

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
                <div className="boxed centered">
                  {selectedOption == 0 && <AddEditGround />}
                </div>
              </Col>
            </Row>
          </Container>
        )}
        {selectedOption == 2 && (
          <Container>
            <Row>
              <Col
                sm="12"
                xs="12"
                style={{ width: "-webkit-fill-available" }}
                className="mobile-box"
              >
                <div className="boxed centered">
                  <QRReader />
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

export const AdminHome = connect(mapStateToProps)(AdminHomeComponent);
