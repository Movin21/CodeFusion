import styles from "../styles";
import SignUpBTN from "./SignUpBTN";
import Clients from "./Clients";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-20 relative">
      {/* Heading and paragraph */}
      <div className="flex flex-col sm:w-[60%] w-[95%] sm:gap-10 gap-5">
        <h2 className={`${styles.heading2}`}>
          Train to Code Better <br className="sm:block hidden" />
        </h2>
        <p className={`${styles.paragraph} sm:text-center sm:w-[95%] w-full`}>
          We help Users to understand codes better. We help candidates sharpen
          their tech skills and pursue job opportunities.
        </p>
      </div>
      {/* Buttons */}
      <div className={`${styles.flexCenter} gap-7 my-5 mt-10`}>
        <SignUpBTN text="Sign up" />
        <button
          type="button"
          className="w-[8rem] sm:w-[10rem] border-[1px] bg-white font-semibold font-poppins text-[14px] h-[40px] rounded-md hover:bg-primary hover:text-white"
        >
          Request Demo
        </button>
      </div>
      <p className={`${styles.paragraph} mt-10 mb-7 sm:px-0 px-5`}>
        Over 40% of developers worldwide and 3,000 candidates use CodeFusion
      </p>
      {/* hero- images */}\
    </section>
  );
};
export default Hero;
