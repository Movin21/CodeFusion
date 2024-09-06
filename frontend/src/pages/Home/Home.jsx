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
  <section className={`bg-primary `}>
    <Navbar />
    {/* hero section */}
    <div className={` ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} border-b-[1px] bg-primary mb-7`}>
        <Hero />
      </div>
    </div>
    <Action />

    <div className={`${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CodingPractice />
        <BinaryTree />
        <Company />
        <Challenges />
        <Footer />
      </div>
    </div>
  </section>
);

export default Home;
