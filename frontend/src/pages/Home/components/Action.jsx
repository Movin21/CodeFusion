import styles from "../styles";
const Action = () => {
  return (
    <section className="flex flex-col gap-5 justify-center items-center mt-10">
      <div className="sm:w-[65%] w-[92%]">
        <h2 className={`${styles.heading3} sm:text-center text-start`}>
          Talent Is There, Let’s Shine a Spotlight
        </h2>
        <h2
          className={`${styles.heading3} sm:text-center text-start text-white`}
        >
          It’s a spotlight problem.
        </h2>
      </div>
      <div className="sm:w-[55%] w-[90%]">
        <p className={`${styles.paragraph} sm:text-center text-start`}>
          Tech hiring needs a reset. From prepping for jobs and practicing
          coding to running a world-class technical interview, give developers
          the tools they need to showcase their skills, passion, and potential.
        </p>
      </div>
      <div className="sm:w-[45%] w-[90%] flex flex-row justify-between items-center gap-10 font-bold my-5 sm:px-0 px-3">
        <a href="#" className="text-white hover:text-light">
          Prep
        </a>
        <a href="#" className="text-white hover:text-light">
          Screen
        </a>
        <a href="#" className="text-white hover:text-light">
          Interview
        </a>
      </div>
    </section>
  );
};
export default Action;
