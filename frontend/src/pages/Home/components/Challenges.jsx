import styles, { layout } from "../styles";
import SignUpBTN from "./SignUpBTN";
const Challenges = () => {
  return (
    <section className={`${layout.section} gap-10`}>
      <div
        className={`{flex flex-col flex-1 gap-[75px] ${styles.paddingX} ${styles.paddingY}}`}
      >
        <h3 className={`${styles.heading5_start} text-light`}>
          Practice coding challenges & <br className="sm:block hidden" />
          <span className="text-light">prep for interviews</span>
        </h3>

        <p className={`${styles.paragraph_start} ${styles.marginY}`}>
          Start practicing your skills now and land the job of your dreams.
        </p>

        <SignUpBTN width="11rem" text="Join the community" />
      </div>
      <div
        className={`{flex flex-col flex-1 ${styles.paddingX} bg-gray-400 rounded-md ${styles.paddingY}}`}
      >
        <h3 className={`${styles.heading5_start}`}>
          Get started hiring with <br className="sm:block hidden" />
          <span className="text-light">CodeFusion</span>
        </h3>

        <p className={`${styles.paragraph_start} ${styles.marginY}`}>
          More than 3,000 tech teams, representing all industries and from
          countries around the world, trust CodeFusion
        </p>

        <SignUpBTN width="11rem" text="Request a demo " className="mb-5" />
      </div>
    </section>
  );
};
export default Challenges;
