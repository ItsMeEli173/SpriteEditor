import React from "react";
import sprite1 from "../assets/sprite1.png";
import sprite2 from "../assets/sprite2.png";
import sprite3 from "../assets/sprite3.png";

function Carousel() {
  return (
    <div className="carousel">
      <div className="carousel-track">
        <img src={sprite1} alt="Sprite 1" />
        <img src={sprite2} alt="Sprite 2" />
        <img src={sprite3} alt="Sprite 3" />
      </div>
    </div>
  );
}

export default Carousel;
