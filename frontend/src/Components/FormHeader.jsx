import React from 'react';

// import './styles.css';

export default class FormHeader extends React.Component {
    render() {
        const {headerText, className} = this.props;
        return (
            <div
                className={`header-text ${className? className: ""}`}
                dangerouslySetInnerHTML={{
                    __html: headerText || ''
                }}
            ></div>
        );
    }
}
