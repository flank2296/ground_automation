import React from 'react';
import { Input } from 'reactstrap';

export default class CustomInput extends React.Component {
    render() {
        const {
            _fieldId='',
            classNameToApply='',
            _placeholder='',
            _style={},
            onChangeHandler=() => {},
            value='',
            disabled=false
        } = this.props;

        return (
            <Input
                id={_fieldId}
                type="text"
                className={classNameToApply}
                placeholder={_placeholder}
                style={_style}
                onChange={evt => onChangeHandler(evt)}
                value={value}
                disabled={disabled}
            />
        )
    }
}