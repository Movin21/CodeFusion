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
    <div className="flex justify-center items-center sm:w-[40%] w-[90%] sm:h-[70%]  bg-slate-100 relative sm:mx-10 mx-5 sm:p-8 p-5 rounded-xl">
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
              className="rounded-md flex flex-col items-center gap-5  slide w-[100%]"
            >
              <img src={data.img} alt="Image" className="w-[70px] h-[70px]" />
              <p className={`${styles.paragraph} mb-10`}>{data.text}</p>
            </div>
          );
        })}
      </SwipeableViews>

      <span className="indicators mt-10">
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
