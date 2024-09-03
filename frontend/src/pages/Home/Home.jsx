import {
  Navbar,
  Hero,
  Action,
  CodingPractice,
  CodingTests,
  BinaryTree,
  Interview,
  Company,
  Challenges,
  Footer,
} from "./components";
import styles from "./styles";
const Home = () => (
  <section>
    <Navbar />
    {/* hero section */}
    <div className={`bg-white ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} border-b-[1px] border-dimBlack mb-7`}>
        <Hero />
      </div>
    </div>
    <Action />

    <div className={`${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CodingPractice />
        <CodingTests />
        <BinaryTree />
        <Interview />
        <Company />
        <Challenges />
        <Footer />
      </div>
    </div>
  </section>
);

export default Home;
