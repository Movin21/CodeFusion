import styles, { layout } from "../styles";
import SignUpBTN from "./SignUpBTN";
const Challenges = () => {
  return (
    <section className={`${layout.section} gap-10`}>
      <div
        className={`{flex flex-col flex-1 gap-[75px] ${styles.paddingX} ${styles.paddingY}}`}
      >
        <h3 className={`${styles.heading5_start}`}>
          Practice coding challenges & <br className="sm:block hidden" />
          <span className="text-green-600">prep for interviews</span>
        </h3>

        <p className={`${styles.paragraph_start} ${styles.marginY}`}>
          Start practicing your skills now and land the job of your dreams.
        </p>

        <SignUpBTN width="11rem" text="Join the community" />
      </div>
      <div
        className={`{flex flex-col flex-1 ${styles.paddingX} bg-gray-100 rounded-md ${styles.paddingY}}`}
      >
        <h3 className={`${styles.heading5_start}`}>
          Get started hiring with <br className="sm:block hidden" />
          <span className="text-green-600">HackerRank</span>
        </h3>

        <p className={`${styles.paragraph_start} ${styles.marginY}`}>
          More than 3,000 tech teams, representing all industries and from
          countries around the world, trust HackerRank
        </p>

        <SignUpBTN width="11rem" text="Request a demo " className="mb-5" />
      </div>
    </section>
  );
};
export default Challenges;
