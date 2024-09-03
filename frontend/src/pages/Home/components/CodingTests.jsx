import styles, { layout } from "../styles";
import { report } from "../assets";

const CodingTests = () => {
  return (
    <section className="flex flex-col items-start mt-10 sm:ml-8 ml-4 rounded-md pt-10 pl-10 gap-8 border-[1px] sm:w-[95%] w-[90%]">
      <p className={`${styles.paragraph} text-slate-500 hover:text-green-600`}>
        : : Coding tests : :
      </p>
      <div>
        <h2 className={`${styles.heading3_start} `}>Join the movement.</h2>
        <h2 className={`${styles.heading3_start} text-green-600`}>
          {" "}
          Screen on skills.
        </h2>
      </div>
      <img
        src={report}
        alt="Report"
        className="sm:w-[90%] sm:h-[90%] w-full h-full sm:pb-0 pb-5"
      />
    </section>
  );
};
export default CodingTests;
