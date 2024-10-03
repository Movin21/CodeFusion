import styles, { layout } from "../styles";
import SwiperCard from "./SwiperCard";
import Clients from "./Clients";
const Company = () => {
  return (
    <section
      className={`sm:my-[5rem] my-3rem justify-center mt-10 sm:ml-8 ml-5 pt-10 sm:pl-8 pl-0 sm:w-[95%] w-[90%] `}
    >
      <div className={`${layout.section} `}>
        <div className="flex flex-col items-start justify-between sm:w-[70%] w-[90%]">
          <h4
            className={`${styles.heading5_start} ${styles.paddingX} font-medium text-light text-[25px]`}
          >
            Voices of Success.
            <br />
            <span className="text-light">Hear from our learners.</span>
          </h4>
          <p
            className={`${styles.paragraph_start} ${styles.paddingX} ${styles.paddingY}`}
          >
            Discover how our users are transforming their careers through
            HackerRank, enhancing their coding skills, and securing jobs at top
            tech companies.
            <div className="my-5" />
            Their success stories highlight the impact of our platform in
            helping candidates excel and achieve their professional goals.
          </p>
        </div>

        <SwiperCard />
      </div>
    </section>
  );
};
export default Company;
