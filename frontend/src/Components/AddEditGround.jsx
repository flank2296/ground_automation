import React from "react";
import CustomInput from "./CustomInput";
import {
  validateEmail,
  validateNumber,
  validateInputs,
} from "../utils/validations";
import FormHeader from "./FormHeader";
import { Button, Chech } from "reactstrap";
import { addEditGroundService, fetchGrounds } from "../services";
import SkeletonDiv from "./SkeletonDiv";
import { updateRawData } from "../redux/actions";
import { connect } from "react-redux";
import CustomCheckBox from "./CustomCheckBox";
import CustomSelect from "./CustomSelect";
import {createOptionForReactSelect, saveLocalStorage} from '../utils/utils';

class AddEditGround extends React.Component {
  state = {
    id: null,
    name: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    address: "",
    week_day_rate: "",
    week_end_rate: "",
    invalidFields: [],
    is_disable: false,
    is_closed: false,
    fields: [
      "city",
      "name",
      "address",
      "week_day_rate",
      "week_end_rate",
      "email",
      "contact",
    ],
  };

  componentDidMount() {
    this.defaultState = { ...this.state };
    fetchGrounds();
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

  shouldDisableSave = () => {
    let { fields = [] } = this.state;
    let disable = false;
    fields.forEach((val) => {
      if (this.state[val] == "") {
        disable = true;
      }
    });
    return disable;
  };

  resetStates = () => {
    this.setState(this.defaultState);
  };

  AddEditGround = () => {
    let payload = {};
    Object.keys(this.state).forEach((_state) => {
      let value = this.state[_state];

      if(_state == "is_disable"){
        value = value? 1: 0;
      }

      if (_state != "fields")
        payload = { ...payload, [_state]: value };
    });

    addEditGroundService(payload, (res) => {
      res = { [res.id]: res };
      let { grounds = {} } = this.props;
      grounds = { ...grounds, ...res };
      updateRawData({ currentUrl: "Admin", grounds });
      this.resetStates();
    });
  };

  groundOptions = () => {
    let {grounds = {}} = this.props;
    let _grounds = Object.values(grounds);
    return _grounds.length? createOptionForReactSelect(_grounds, 'name', 'id'): []
  }

  getSelectedGround = () => {
    let key = this.state.id;
    let {grounds = {}} = this.props;
    let value =  key in grounds? grounds[key]: null;
    return value? createOptionForReactSelect([value], 'name', 'id' ): []
  }

  getCommonKeys = (obj) => {
    let stateKeys = Object.keys(this.state);
    let objKeys = Object.keys(obj);
    return objKeys.filter(key => stateKeys.includes(key))
  }

  render() {
    const {
      name,
      city,
      state,
      contact,
      email,
      address,
      week_day_rate,
      week_end_rate,
      invalidFields,
      is_disable,
      is_closed
    } = this.state;

    const componentPropsMapper = {
      Select_ground: {
        label: "Select Ground",
        props: {
          labelSize: 12,
          fieldSize: 12,
          selectedValue: this.getSelectedGround(),
          style: { height: "40px" },
          onChange: (data) => {
            let {grounds = {}} = this.props;
            let keys = this.getCommonKeys(grounds[data.value]);
            let _states = keys.map(k => {
              return {[k]: grounds[data.value][k]}
            });
            let states = {};
            Object.assign(states, ..._states);
            this.setState(states);

          },
          options: this.groundOptions(),
        },
        toRender: CustomSelect,
      },
      Name: {
        label: "Ground Name",
        props: {
          _fieldId: "name",
          value: name,
          classNameToApply: invalidFields.includes("name") ? "error-input" : "",
          _style: { height: "40px" },
          _placeholder: "Enter Ground Name",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      City: {
        label: "City",
        props: {
          _fieldId: "city",
          value: city,
          classNameToApply: invalidFields.includes("city") ? "error-input" : "",
          _style: { height: "40px" },
          _placeholder: "Enter City",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      State: {
        label: "State",
        props: {
          _fieldId: "state",
          value: state,
          classNameToApply: invalidFields.includes("State")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter State",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      Contact: {
        label: "Contact",
        props: {
          _fieldId: "contact",
          value: contact,
          classNameToApply: invalidFields.includes("Contact")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter Contact",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      Email: {
        label: "Email",
        props: {
          _fieldId: "email",
          value: email,
          classNameToApply: invalidFields.includes("email")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter Email",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      Address: {
        label: "Address",
        props: {
          _fieldId: "address",
          value: address,
          classNameToApply: invalidFields.includes("address")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter Address",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      Week_Day_Rate: {
        label: "Week Day Rate / Hour",
        props: {
          _fieldId: "week_day_rate",
          value: week_day_rate,
          classNameToApply: invalidFields.includes("week_day_rate")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter week day rate / hour",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      Week_End_Rate: {
        label: "Week End Rate / Hour",
        props: {
          _fieldId: "week_end_rate",
          value: week_end_rate,
          classNameToApply: invalidFields.includes("week_end_rate")
            ? "error-input"
            : "",
          _style: { height: "40px" },
          _placeholder: "Enter week end rate / hour",
          onChangeHandler: (e) => this.changeHandler(e, "other"),
        },
        toRender: CustomInput,
      },
      is_disable: {
        label: "Is Disabled?",
        props: {
          _fieldId: "is_disable",
          value: is_disable,
          classNameToApply: invalidFields.includes("is_disable")
            ? "error-input"
            : "",
          _style: { display: "inline-block", marginLeft: "20px" },
          onChangeHandler: (e) =>
            this.setState({ is_disable: !this.state.is_disable }),
        },
        isInline: true,
        toRender: CustomCheckBox,
      },
      is_closed: {
        label: "Is Closed?",
        props: {
          _fieldId: "is_closed",
          value: is_closed,
          classNameToApply: invalidFields.includes("is_closed")
            ? "error-input"
            : "",
          _style: { display: "inline-block", marginLeft: "20px" },
          onChangeHandler: (e) =>
            this.setState({ is_disable: !this.state.is_closed }),
        },
        isInline: true,
        toRender: CustomCheckBox,
      },
    };
    return (
      <div className="component-common">
        <Button onClick={() => {
          updateRawData({selectedOption: null})
          saveLocalStorage({selectedOption: null})
        }
        } className="inline">
          Back
        </Button>
        <FormHeader headerText="Add/Edit Ground" className="inline"/>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          {Object.keys(componentPropsMapper).map((_component) => {
            if (componentPropsMapper[_component].condition) {
              return eval(componentPropsMapper[_component].condition) ? (
                <SkeletonDiv
                  label={componentPropsMapper[_component].label}
                  propsToApply={componentPropsMapper[_component].props}
                  ComponentToRender={componentPropsMapper[_component].toRender}
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
                ComponentToRender={componentPropsMapper[_component].toRender}
                divClass={componentPropsMapper[_component].divClass}
                isInline={componentPropsMapper[_component].isInline}
              />
            );
          })}
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            className="btn-primary btn-verify btn-lg btn-width-lg"
            style={{ backgroundColor: "#007bff !important" }}
            disabled={this.shouldDisableSave()}
            onClick={() => this.AddEditGround()}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { grounds = {} } = state.rawData;
  return { grounds };
};

export default connect(mapStateToProps)(AddEditGround);
