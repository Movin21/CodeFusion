import styles from "../styles";
import SignUpBTN from "./SignUpBTN";
import Clients from "./Clients";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-20 relative">
      {/* Heading and paragraph */}
      <div className="flex flex-col sm:w-[60%] w-[95%] sm:gap-10 gap-5">
        <h2 className={`${styles.heading2}`}>
          Skills speak louder <br className="sm:block hidden" /> than words
        </h2>
        <p className={`${styles.paragraph} sm:text-center sm:w-[95%] w-full`}>
          We help companies develop the strongest tech teams around. We help
          candidates sharpen their tech skills and pursue job opportunities.
        </p>
      </div>

      {/* Buttons */}
      <div className={`${styles.flexCenter} gap-7 my-5 mt-10`}>
        <SignUpBTN text="Sign up" />
        <button
          type="button"
          className="w-[8rem] sm:w-[10rem] border-[1px] border-black font-semibold font-poppins text-[14px] h-[40px] rounded-md hover:bg-blue-600 hover:text-white"
        >
          Request Demo
        </button>
      </div>

      <p className={`${styles.paragraph} mt-10 mb-7 sm:px-0 px-5`}>
        Over 40% of developers worldwide and 3,000 companies use HackerRank
      </p>

      {/* hero- images */}
      <Clients />
      {/* Gradients */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[20%] green__gradient z-1" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[20%]  blue__gradient  z-2" />
    </section>
  );
};
export default Hero;
