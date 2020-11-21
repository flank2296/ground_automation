import React from "react";
import CarousalComponent from "../ReusableComponents/Carousal";
import { carousalObject, homePageSections } from "../utils/constants";

class HomePage extends React.Component {
  getCards = () => {
    return homePageSections.map((section) => {
      return (<div style={{ marginTop: "10px", backgroundColor: "white", display: 'flex' }}>
          <img src={section.src} style={{flex: '0.2', width: '50px'}} alt={section.alt || ""}/>
          <div style={{flex: '1'}}>
            <p style={{paddingTop: "50px", textAlign: "center", fontSize: '40px'}}> {section.title} </p>
            <p style={{paddingTop: "10px", textAlign: "center", fontSize: '20px'}}> {section.description} </p>
          </div>
      </div>);
    });
  };
  render() {
    return (
      <div style={{ marginTop: "5px" }}>
        <CarousalComponent carousalObject={carousalObject} />
        {this.getCards()}
      </div>
    );
  }
}

export default HomePage;
