import React, { Component } from "react";
import QrReader from 'react-qr-reader'
import { startSlot } from "../services";

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

export default class QRReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result",
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    if (data) {
      const decryptedString = cryptr.decrypt(data);
      let _data = JSON.parse(decryptedString);
      console.log(_data);
      let { id = null } = _data;
      startSlot({ id }, (res) => console.log(res));
    }
  }

  handleError(err) {
    console.error(err);
  }

  render() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}
