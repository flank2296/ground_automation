import React from "react";
import moment from "moment";
import CustomInput from "./CustomInput";
import QRCode from "qrcode";
import {validateEmail, validateNumber, validateInputs } from "../utils/validations";
import FormHeader from "./FormHeader";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Button, Chech } from "reactstrap";
import {
  addBooking,
  addEditGroundService,
  fetchGroundBookings,
  fetchUserGrounds,
} from "../services";
import SkeletonDiv from "./SkeletonDiv";
import { updateRawData } from "../redux/actions";
import { connect } from "react-redux";
import CustomCheckBox from "./CustomCheckBox";
import CustomSelect from "./CustomSelect";
import {
  convertToUtc,
  createOptionForReactSelect,
  prepareExtendedSlots,
  prepareSlots,
  saveLocalStorage,
  updateReduxLocalStorage,
} from "../utils/utils";
const momentTimezone = require("moment-timezone");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

class BookGround extends React.Component {
  state = {
    id: null,
    slots: [],
    selectedSlot: [],
    selectedDate: new Date(),
    start_time: null,
    end_time: null,
    base64_url: null,
    fields: ["id", "start_time", "end_time"],
  };

  componentDidMount() {
    this.defaultState = { ...this.state };
    fetchUserGrounds();
  }

  changeHandler = (e, validatorKey) => {
    let states = {};
    let value = e.target.value;

    if (validatorKey) {
      states = this.validator(value, e.target.id, validatorKey);
    }

    states = { ...states, [e.target.id]: value };
    this.setState(states);
  };

  get_validator_function = (key) => {
    return {
      email: validateEmail,
      other: validateInputs,
    }[key];
  };

  validator = (value, id, key) => {
    let states = {};

    if (!this.get_validator_function(key)(value)) {
      let _invalidFields = [...new Set([...this.state.invalidFields, id])];
      return { invalidFields: _invalidFields };
    }

    let fields = [];

    let item_index = this.state.invalidFields.indexOf(id);
    if (item_index != -1) {
      fields = this.state.invalidFields;
      fields.splice(item_index, 1);
      states = { invalidFields: fields };
    }
    return states;
  };

  shouldDisableBooking = () => {
    let { fields = [] } = this.state;
    let disable = false;
    fields.forEach((val) => {
      if (!this.state[val]) {
        disable = true;
      }
    });
    return disable;
  };

  resetStates = () => {
    this.setState(this.defaultState);
  };

  BookGround = () => {
    let payload = {};
    this.state.fields.forEach((_state) => {
      let value = this.state[_state];
      payload[_state] = value;
    });

    addBooking(payload, (res) => {
      let { start_time, end_time } = res;
      res["start_time"] = moment(start_time).format("DD-MM-YYYY hh:mm a");
      res["end_time"] = moment(end_time).format("DD-MM-YYYY hh:mm a");
      let str = JSON.stringify(res, null, 2);
      // const encryptedString = cryptr.encrypt(str);
      QRCode.toDataURL(str)
        .then((url) => {
          this.setState({ base64_url: url });
        })
        .catch((err) => console.log(err));
    });
  };

  groundOptions = () => {
    let { grounds = {} } = this.props;
    let _grounds = Object.values(grounds);
    _grounds = _grounds.map((g) => {
      let label = `${g.name} - ${g.address}`;
      return { ...g, label };
    });
    return _grounds.length
      ? createOptionForReactSelect(_grounds, "label", "id")
      : [];
  };

  getSelectedGround = (option = true) => {
    let key = this.state.id;
    let { grounds = {} } = this.props;
    let value = key in grounds ? grounds[key] : null;
    if (option) {
      value = value
        ? { ...value, label: `${value?.name} - ${value?.address}` }
        : "";
      return value ? createOptionForReactSelect([value], "label", "id") : [];
    }
    return value;
  };

  getCommonKeys = (obj) => {
    let stateKeys = Object.keys(this.state);
    let objKeys = Object.keys(obj);
    return objKeys.filter((key) => stateKeys.includes(key));
  };

  getSlots = (selectedDate) => {
    let ground = this.getSelectedGround(false);
    let { doneBookings } = this.props;
    let alreadyBookedTimings = [];
    doneBookings.forEach((booking) => {
      let start = momentTimezone(booking.start_time);
      let end = momentTimezone(booking.end_time);
      alreadyBookedTimings.push({
        start,
        end,
      });
    });
    let slots = prepareSlots(
      ground.slot_duration,
      alreadyBookedTimings,
      selectedDate
    );
    this.setState({ slots });
  };

  render() {
    const componentPropsMapper = {
      Select_ground: {
        label: "Select Ground",
        props: {
          labelSize: 12,
          fieldSize: 12,
          selectedValue: this.getSelectedGround(),
          style: { height: "40px" },
          onChange: (data) => {
            let { grounds = {} } = this.props;
            let keys = this.getCommonKeys(grounds[data.value]);
            fetchGroundBookings(
              {
                id: data.value,
                start_date: moment(this.state.selectedDate)
                  .startOf("day")
                  .toISOString(),
                end_date: moment(this.state.selectedDate)
                  .endOf("day")
                  .toISOString(),
              },
              () => {
                let _states = keys.map((k) => {
                  return { [k]: grounds[data.value][k] };
                });
                let states = {};
                Object.assign(states, ..._states);
                this.setState(states, () =>
                  this.getSlots(this.state.selectedDate)
                );
              }
            );
          },
          options: this.groundOptions(),
        },
        toRender: CustomSelect,
      },
      Select_date: {
        label: "Select Date",
        props: {
          labelSize: 12,
          fieldSize: 12,
          selected: this.state.selectedDate,
          className: "calender-custom",
          dateFormat: "dd MMM yyyy",
          disabled: !this.state.id,
          onChange: (date) => {
            this.setState({ selectedDate: date });
            this.getSlots(date);
          },
        },
        toRender: DatePicker,
      },
      Select_slot: {
        label: "Select Slot",
        props: {
          labelSize: 12,
          fieldSize: 12,
          selectedValue: this.state.selectedSlot,
          style: { height: "40px" },
          disabled: !this.state.id,
          onChange: (data) => {
            let value = data.value;
            value = value.trim().split("-");
            let start_time = value[0].trim();
            let end_time = value[1].trim();
            start_time = `${momentTimezone(this.state.selectedDate).format(
              "DD-MM-YYYY"
            )} ${start_time}`;
            end_time = `${momentTimezone(this.state.selectedDate).format(
              "DD-MM-YYYY"
            )} ${end_time}`;
            start_time = convertToUtc(start_time);
            end_time = convertToUtc(end_time);
            this.setState({ start_time, end_time, selectedSlot: data });
          },
          options: prepareExtendedSlots(this.state.slots || []),
        },
        toRender: CustomSelect,
      },
    };

    let { base64_url } = this.state;
    return (
      <div className="component-common">
        {!base64_url && (
          <Button
            onClick={() => {
              updateRawData({ selectedOption: null });
              saveLocalStorage({ selectedOption: null });
            }}
            className="inline"
          >
            Back
          </Button>
        )}
        {base64_url && (
          <div style={{textAlign: "center"}}>
            <FormHeader headerText="We have shared this on your email too" />
            <img src={base64_url}></img>
            <p className="qr-note"> * Please make sure you have this qr code with yourself when you are vising the court </p>
          </div>
        )}
        {!base64_url && (
          <React.Fragment>
            <FormHeader headerText="Book a ground" className="inline ml-100" />
            <div style={{ marginBottom: "10px", marginTop: "10px" }}>
              {Object.keys(componentPropsMapper).map((_component) => {
                if (componentPropsMapper[_component].condition) {
                  return eval(componentPropsMapper[_component].condition) ? (
                    <SkeletonDiv
                      label={componentPropsMapper[_component].label}
                      propsToApply={componentPropsMapper[_component].props}
                      ComponentToRender={
                        componentPropsMapper[_component].toRender
                      }
                      divClass={componentPropsMapper[_component].divClass}
                      isInline={componentPropsMapper[_component].isInline}
                    />
                  ) : (
                    <> </>
                  );
                }
                return (
                  <SkeletonDiv
                    label={componentPropsMapper[_component].label}
                    propsToApply={componentPropsMapper[_component].props}
                    ComponentToRender={
                      componentPropsMapper[_component].toRender
                    }
                    divClass={componentPropsMapper[_component].divClass}
                    isInline={componentPropsMapper[_component].isInline}
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
        {!base64_url && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="btn-primary btn-verify btn-lg btn-width-lg"
              style={{ backgroundColor: "#007bff !important" }}
              disabled={this.shouldDisableBooking()}
              onClick={() => this.BookGround()}
            >
              Book
            </Button>
          </div>
        )}
        {base64_url && (
          <div style={{textAlign: "center"}}>
          <Button
            className="btn-primary btn-verify btn-lg btn-width-lg"
            style={{ backgroundColor: "#007bff !important" }}
            onClick={() =>
              updateReduxLocalStorage({
                currentUrl: "User",
                selectedOption: null,
              })
            }
            className="inline"
          >
            Go Back
          </Button>
          <Button
            className="btn-primary btn-verify btn-lg btn-width-lg"
            style={{ backgroundColor: "#007bff !important", marginLeft: "10px" }}
            className="inline"
          >
            <a download="court_qr_code.png" href={base64_url} style={{color: "white"}}>Download</a>
          </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { grounds = {}, doneBookings = [] } = state.rawData;
  return { grounds, doneBookings };
};

export default connect(mapStateToProps)(BookGround);
