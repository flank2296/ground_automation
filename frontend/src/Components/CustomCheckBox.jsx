import React from 'react';
import { Input } from 'reactstrap';

export default class CustomCheckBox extends React.Component {
    render() {
        const {
            _fieldId='',
            classNameToApply='',
            _style={},
            onChangeHandler=() => {},
            value='',
            disabled=false
        } = this.props;

        return (
            <Input
                id={_fieldId}
                type="checkbox"
                className={classNameToApply}
                style={_style}
                onClick={evt => onChangeHandler(evt)}
                checked={value}
                disabled={disabled}
            />
        )
    }
}