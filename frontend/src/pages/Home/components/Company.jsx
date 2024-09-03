import styles, { layout } from "../styles";
import SwiperCard from "./SwiperCard";
import Clients from "./Clients";
const Company = () => {
  return (
    <section
      className={`sm:my-[5rem] my-3rem justify-center mt-10 sm:ml-8 ml-5 pt-10 sm:pl-8 pl-0 border-[1px] sm:w-[95%] w-[90%] rounded-md`}
    >
      <div className={`${layout.section} `}>
        <div className="flex flex-col items-start justify-between sm:w-[70%] w-[90%]">
          <h4
            className={`${styles.heading5_start} ${styles.paddingX} font-medium text-[25px]`}
          >
            Every company is a tech company. <br />
            <span className="text-green-600">We’re here to help ‘em all.</span>
          </h4>
          <p
            className={`${styles.paragraph_start} ${styles.paddingX} ${styles.paddingY}`}
          >
            More than 3,000 tech teams, representing all industries and from
            countries around the world, trust HackerRank to connect with
            developers and add cutting-edge skills to their teams.
            <div className="my-5" />
            That includes 25% of the Fortune 100 — and that moonshot startup
            that just came out of stealth.
          </p>
        </div>

        <SwiperCard />
      </div>
      <Clients />
    </section>
  );
};
export default Company;
