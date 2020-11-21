import React from 'react';

import {SelectField} from './SelectField';

export default class CustomSelect extends React.Component {
    render() {
        const {
            labelSize = 12,
            fieldSize = 12,
            selectedValue = '',
            onChange = () => {},
            options = [],
            style={}
        } = this.props;

        return (
            <div style={style}>
                <SelectField
                    labelSize={labelSize}
                    fieldSize={fieldSize}
                    selectedValue={selectedValue}
                    onChange={e => onChange(e)}
                    options={options}
                />
            </div>
        );
    }
}
