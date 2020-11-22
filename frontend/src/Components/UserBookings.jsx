import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import { getUserBookings } from "../services";
import { Badge } from "reactstrap";
import moment from "moment";
import QRCode from "qrcode";

class UserBookings extends React.Component {
  state = {
    bookings: [],
    slicedBookings: [],
    paginationIndex: 0,
    qr: null,
  };

  componentDidMount() {
    getUserBookings((res) => {
      this.setState({
        bookings: res,
        slicedBookings: res.slice(0, 7),
        paginationIndex: 7,
      });
    });
  }

  getStatus = (_status) => {
    let status = {
      0: ["Pending", "Gray"],
      1: ["Active", "Green"],
      2: ["Completed", "#ff4e4e"],
    }[_status];
    return <Badge style={{ backgroundColor: status[1] }}> {status[0]} </Badge>;
  };

  getPaginationItems = (key) => {
    let { paginationIndex } = this.state;
    let { bookings } = this.state;
    let _bookings = [];
    if (key == "Next") {
      let newPaginationIndex = paginationIndex + 7;
      _bookings = bookings.slice(paginationIndex, newPaginationIndex);
      this.setState({
        paginationIndex: newPaginationIndex,
        slicedBookings: _bookings,
      });
    } else {
      let newPaginationIndex = paginationIndex - 7;
      newPaginationIndex = newPaginationIndex < 0 ? 0 : newPaginationIndex;
      _bookings = bookings.slice(newPaginationIndex - 7, newPaginationIndex);
      this.setState({
        paginationIndex: newPaginationIndex,
        slicedBookings: _bookings,
      });
    }
  };

  downloadQr = (booking) => {
    QRCode.toDataURL(JSON.stringify(booking))
      .then((url) => {
        this.setState({ qr: url });
      })
      .catch((err) => console.log(err));
  };

  getTable = () => {
    let { slicedBookings } = this.state;
    return slicedBookings.map((booking) => {
      return (
        <tr>
          <td style={{ maxWidth: "100px" }}> {booking.ground} </td>
          <td> {moment(booking.start_time).format("DD-MM-YYYY")} </td>
          <td> {moment(booking.start_time).format("hh:mm a")} </td>
          <td> {moment(booking.end_time).format("hh:mm a")} </td>
          <td> {this.getStatus(booking.status)} </td>
          <td>
            <a
              onClick={(e) => this.downloadQr(booking)}
              href={this.state.qr}
              download={`qr-${booking.id}.png`}
            >
              <i class="fa fa-download" aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <Table>
          <tr>
            <th> Ground </th>
            <th> Date </th>
            <th> From </th>
            <th> To </th>
            <th> Status </th>
            <th> QR </th>
          </tr>
          {this.getTable()}
        </Table>
        <Button
          className="btn btn-primary inline"
          style={{ marginRight: "20px" }}
          onClick={() => this.getPaginationItems("Prev")}
          disabled={this.state.paginationIndex <= 7}
        >
          Previous
        </Button>
        <Button
          className="btn btn-primary inline"
          onClick={() => this.getPaginationItems("Next")}
          disabled={this.state.paginationIndex >= this.state.bookings.length}
        >
          Next
        </Button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { bookings = [] } = state.rawData;
  return { bookings };
};

export default connect(mapStateToProps)(UserBookings);
