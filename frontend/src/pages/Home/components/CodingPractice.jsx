import { candidate } from "../assets";
import styles, { layout } from "../styles";

const CodingPractice = () => {
  return (
    <section className="flex items-center justify-center mt-10 sm:pl-0 pl-2">
      <div
        className={`${layout.section} justify-center items-center sm:w-[95%] w-[90%] h-[50%] rounded-md bg-slate-900`}
      >
        <div className="flex flex-col items-start gap-8 flex-1 rounded-md p-5 px-10">
          <p
            className={`${styles.paragraph} text-slate-500 hover:text-green-600`}
          >
            : : Coding practice : :
          </p>
          <h4 className="text-[25px] font-semibold text-white ">
            Explore and expand your skills.
          </h4>
          <p
            className={` text-slate-300 font-normal  sm:pr-[100px] ${styles.paragraph_start}`}
          >
            Every idea has a first line of code. Prep for jobs and sharpen your
            skills alongside a global community of developers. Access the
            content you need to develop new skills – and land the job you’ve
            dreamed of.
          </p>

          <button
            type="button"
            className="w-[13rem] border-[1px] border-white font-semibold text-white font-poppins text-[14px]  h-[50px] rounded-md hover:bg-green-600"
          >
            Sign up and practice <span className="text-xl">&#8594;</span>
          </button>
        </div>
        <div className="flex-1  bg-slate-900 sm:pl-0 pl-4">
          <img src={candidate} alt="Candidate" className="w-[90%] h-[90%]" />
        </div>
      </div>
    </section>
  );
};
export default CodingPractice;
