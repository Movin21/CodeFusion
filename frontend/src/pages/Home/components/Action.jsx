import styles from "../styles";
const Action = () => {
  return (
    <section className="flex flex-col gap-5 justify-center items-center mt-10">
      <div className="sm:w-[65%] w-[92%]">
        <h2 className={`${styles.heading3} sm:text-center text-start`}>
          Talent Is There, Let’s Shine a Spotlight:
        </h2>
      </div>
      <div className="sm:w-[55%] w-[90%]">
        <p className={`${styles.paragraph} sm:text-center text-start`}>
          Tech hiring needs a reset. From prepping for jobs and practicing
          coding to running a world-class technical interview, give developers
          the tools they need to showcase their skills, passion, and potential.
        </p>
      </div>
    </section>
  );
};
export default Action;
