import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import { getAllBookings } from "../services";
import { Badge } from "reactstrap";
import moment from "moment";

class AdminBookings extends React.Component {
  state = {
    bookings: [],
    slicedBookings: [],
    paginationIndex: 0,
  };

  componentDidMount() {
    getAllBookings((res) => {
      this.setState({
        bookings: res,
        slicedBookings: res.slice(0, 10),
        paginationIndex: 10,
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
      let newPaginationIndex = paginationIndex + 10;
      _bookings = bookings.slice(paginationIndex, newPaginationIndex);
      this.setState({
        paginationIndex: newPaginationIndex,
        slicedBookings: _bookings,
      });
    } else {
      let newPaginationIndex = paginationIndex - 10;
      newPaginationIndex = newPaginationIndex < 0 ? 0 : newPaginationIndex;
      _bookings = bookings.slice(newPaginationIndex - 10, newPaginationIndex);
      this.setState({
        paginationIndex: newPaginationIndex,
        slicedBookings: _bookings,
      });
    }
  };

  getTable = () => {
    let { slicedBookings } = this.state;
    return slicedBookings.map((booking) => {
      return (
        <tr>
          <td style={{maxWidth: "100px"}}> {booking.ground} </td>
          <td style={{maxWidth: "100px"}}> {booking.user.split('@')[0] } </td>
          <td> {moment(booking.start_time).format("DD-MM-YYYY")} </td>
          <td> {moment(booking.start_time).format("hh:mm a")} </td>
          <td> {moment(booking.end_time).format("hh:mm a")} </td>
          <td> {this.getStatus(booking.status)} </td>
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
            <th> User </th>
            <th> Date </th>
            <th> From </th>
            <th> To </th>
            <th> Status </th>
          </tr>
          {this.getTable()}
        </Table>
        <Button
          className="btn btn-primary inline"
          style={{ marginRight: "20px" }}
          onClick={() => this.getPaginationItems("Prev")}
          disabled={this.state.paginationIndex <= 10}
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

export default connect(mapStateToProps)(AdminBookings);
