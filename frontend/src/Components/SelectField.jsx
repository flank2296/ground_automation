import * as React from 'react';
import Select from 'react-select';
import {fieldset, Row, Col} from 'reactstrap';
import {getValueFromKey} from '../utils/utils.js';

export class SelectField extends React.Component {
    renderLabel = () => {
        const {label, labelSize = 4, pullRight = true, lineHeight = 2, rtl = false} = this.props;

        return (
            <Col
                dir={rtl ? 'rtl' : 'auto'}
                sm={labelSize}
                className="input-label"
                style={pullRight ? {textAlign: 'right'} : {}}
            >
                <span style={{lineHeight}}>{label}</span>
            </Col>
        );
    };

    render() {
        const {
            label,
            fieldSize = 8,
            rtl,
            options,
            onChange,
            selectedValue,
            value,
            placeholder,
            clearable = false,
            error = false,
            id = 'dropdown',
            formName,
            update,
            components = {},
            style = {},
            borderRadius = 0,
            className = '',
            isDisabled = false,
            isLoading = false,
            ref = () => true,
            otherProps = {},
            colStyle = {},
            onInputChange = () => {}
        } = this.props;

        const errorData = error ? error : getValueFromKey(value?.validation, id);

        return (
            <fieldset style={{border: 'none'}}>
                <Row>
                    {label && this.renderLabel()}
                    <Col style={colStyle} sm={fieldSize}>
                        <Select
                            isDisabled={isDisabled}
                            classNamePrefix={className}
                            className={errorData ? 'danger-select' : ''}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius,
                                colors: {
                                    ...theme.colors,
                                    primary: '#428bca'
                                }
                            })}
                            ref={ref}
                            value={selectedValue || (value ? value[id] : '')}
                            autoFocus={false}
                            onChange={(data) =>onChange(data, id)}
                            options={options}
                            isClearable={clearable}
                            {...components}
                            {...style}
                            {...otherProps}
                            isLoading={isLoading}
                            placeholder={placeholder}
                            onInputChange={(data) => onInputChange(data)}
                            // menuIsOpen={true} // Want to test the menu option Then uncomment this.
                            isRtl={rtl}
                        />
                        {errorData && (
                            <div
                                className="invalid-feedback"
                                style={{
                                    color: 'red',
                                    fontSize: '10px'
                                }}
                            >
                                {errorData}
                            </div>
                        )}
                    </Col>
                </Row>
            </fieldset>
        );
    }
}
