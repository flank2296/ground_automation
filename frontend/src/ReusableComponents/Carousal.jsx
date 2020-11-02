import React from "react";
import { Carousel } from "react-bootstrap";

class CarousalComponent extends React.Component {
  render() {
    let { carousalObject = [] } = this.props;
    return (
      <Carousel interval={2000}>
        {carousalObject.map((_car) => {
          return (
            <Carousel.Item>
              <img className="d-block w-100" src={_car.src} alt={_car.alt || ''} />
              <Carousel.Caption>
                <h3>{_car.header}</h3>
                <p>{_car.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default CarousalComponent;
