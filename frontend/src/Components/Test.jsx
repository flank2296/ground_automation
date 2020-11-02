import React, { PureComponent } from 'react'
import { connect } from "react-redux";

class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        let {currentUrl} = this.props;
        return (
            <div style={{maringTop: '25%'}}>
            <h1> {currentUrl} </h1>
            </div>
        )
    }
}
  

export default Test;