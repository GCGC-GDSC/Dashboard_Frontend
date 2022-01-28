import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";


const LoginCarousal = () => {
  return (
    <Carousel showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src="https://images.shiksha.com/mediadata/images/1600774679phpXkvQ4t.jpeg"
          height="300px"
          width="200px"
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img
          src="https://images.shiksha.com/mediadata/images/1562065646phpyHpwgL.png"
          height="300px"
          width="200px"
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img
          src="https://images.shiksha.com/mediadata/images/1489469641phpLthMrk.jpeg"
          height="300px"
          width="200px"
        />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default LoginCarousal;
