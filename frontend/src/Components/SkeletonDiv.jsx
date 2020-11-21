import React from 'react';

import CustomInputAC from './CustomInput';
import CustomSelect from './CustomSelect';

import '../css/styles.css';

export default class SkeletonDiv extends React.Component {
    render() {
        const {label, propsToApply, ComponentToRender, divClass="", isInline=false} = this.props;
        const classToApply = `form-component ${divClass}`;
        return (
            <div style={{marginTop: '15px'}}>
                <div>
                    <div className={`form-label`}>
                        <p className={`${isInline? 'inline':""}`}> {label} </p>
                        {isInline && <ComponentToRender {...propsToApply} />}
                    </div>
                    {!isInline && <div className={classToApply}>
                        {<ComponentToRender {...propsToApply} />}
                    </div>}
                </div>
            </div>
        );
    }
}
