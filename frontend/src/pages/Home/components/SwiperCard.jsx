import React, { useState } from "react";
import { carouselData } from "../constants";
import SwipeableViews from "react-swipeable-views";
import styles from "../styles";

const SwiperCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwipeChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex justify-center items-center sm:w-[40%] w-[90%] sm:h-[40%] s bg-slate-400 relative sm:mx-10 mx-5 sm:p-12 p-8 rounded-xl">
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={handleSwipeChange}
        enableMouseEvents
        resistance
        style={{ width: "100%" }}
      >
        {carouselData.map((data) => {
          return (
            <div
              key={data.id}
              className="rounded-md flex flex-col items-center slide w-[100%]"
            >
              <p className={`${styles.paragraph} mb-10`}>"{data.text}"</p>

              <h3
                className={`font-poppins text-lg text-black font-bold italic mb-8`}
              >
                {data.name}
              </h3>
            </div>
          );
        })}
      </SwipeableViews>

      <span className="indicators mt-10 ">
        {carouselData.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`indicator ${activeIndex === index ? "active" : ""}`}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default SwiperCard;
