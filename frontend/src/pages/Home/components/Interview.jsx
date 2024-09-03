import {
  tool1,
  tool2,
  tool3,
  tool4,
  tool5,
  tool6,
  tool7,
  interview,
} from "../assets";
import styles, { layout } from "../styles";
import SignUpBTN from "./SignUpBTN";

const Interview = () => {
  return (
    <section className="flex flex-col items-center justify-center  my-10 gap-8">
      <p
        className={`${styles.paragraph} text-slate-500 hover:text-green-600 mt-10`}
      >
        : : Technical interviews : :
      </p>
      <h2
        className={`sm:${styles.heading3} ${styles.heading3_start} sm:px-0 px-5`}
      >
        Interview like it’s <span className="text-green-600">2023</span>
      </h2>

      <p
        className={`${styles.paragraph} sm:w-[60%] w-[90%] text-slate-700 sm:text-center text-start`}
      >
        Ditch out of reach and out of touch interview questions about golf balls
        and 747s — and turn off your clunky screen share for good. Code, create,
        and collaborate with an IDE built to showcase real-world skills in a
        real-world environment.
      </p>
      <SignUpBTN width="10rem" text="Learn more" />

      <div className="flex flex-row justify-between items-center gap-[75px] flex-wrap my-4 mb-4 sm:px-0 px-5 group w-[90%] h-10">
        <img
          src={tool1}
          alt="tool1"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
        <img
          src={tool2}
          alt="tool2"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
        <img
          src={tool3}
          alt="tool3"
          className="transition-all duration-1000 transform  hidden group-scroll:translate-y-0 group-hover:block"
        />
        <img
          src={tool4}
          alt="tool4"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
        <img
          src={tool5}
          alt="tool5"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
        <img
          src={tool6}
          alt="tool6"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
        <img
          src={tool7}
          alt="tool7"
          className="transition-all duration-1000 transform  hidden group-hover:translate-y-0 group-hover:block"
        />
      </div>

      <div className="flex justify-center">
        <img
          src={interview}
          alt="Interview"
          className="w-[85%] h-[60%] object-contain"
        />
      </div>
    </section>
  );
};
export default Interview;
