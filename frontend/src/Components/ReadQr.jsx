import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { startSlot } from "../services";
import FormHeader from "./FormHeader";
import moment from "moment";
import { showAlert } from "../utils/utils";

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

export default class QRReader extends Component {
  state = {
    delay: 300,
    startedSlot: false,
    bookingObj: null,
  };

  handleScan = (data) => {
    if (data) {
      // const decryptedString = cryptr.decrypt(data);
      // let _data = JSON.parse(decryptedString);
      let _data = JSON.parse(data);

      if(
        moment(_data.start_time, "DD-MM-YYYY hh:mm a").diff(moment(), "minutes") >= 60 ||
        moment(_data.start_time, "DD-MM-YYYY hh:mm a").diff(moment(), "minutes") <= 0
      ){
        showAlert("You slot is in the future or is expired!", "error");
        return;
      }
      let { id = null } = _data;
      startSlot({ id }, (res) => {
        this.setState({
          bookingObj: res,
          startedSlot: true,
        });
      });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    let { startedSlot, bookingObj } = this.state;
    return (
      <div>
        {!startedSlot && (
          <>
            <FormHeader
              headerText="Scan QR Code"
              className="qr-header-text"
            ></FormHeader>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{
                width: "50%",
                textAlign: "center",
                marginLeft: "28%",
                marginTop: "2%",
              }}
            />
          </>
        )}
        {startedSlot && (
          <>
            <FormHeader
              headerText="Started Slot Successfully!"
              className="qr-header-text"
            ></FormHeader>
            <div className="scan-success">
              <p> {`Started slot for ${bookingObj.user}`} </p>
              <p>
                {`Duration :- ${moment(bookingObj.start_time).format(
                  "DD-MM-YYYY hh:mm a"
                )} to ${moment(bookingObj.end_time).format(
                  "DD-MM-YYYY hh:mm a"
                )}`}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
}
