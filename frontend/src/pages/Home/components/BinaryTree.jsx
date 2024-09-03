import styles, { layout } from "../styles";
import { bodyContents } from "../constants";

const BinaryTree = () => {
  return bodyContents.map((content, index) => {
    return (
      <section
        key={content.id}
        className={`${layout.section} items-start mt-10 sm:ml-8 ml-4 rounded-md pt-10 sm:pl-10 gap-8 border-[1px] sm:w-[95%] w-[90%]`}
      >
        <div
          className={`flex flex-col flex-1 gap-8 mt-10 items-start ${styles.paddingX}`}
        >
          <h3 className={`${styles.heading4_start} `}>{content.heading}</h3>
          <p className={`${styles.paragraph_start} `}>{content.para}</p>
          <button
            type="button"
            className="w-12rem h-65px font-bold hover:translate-x-1"
          >
            {content.btn}{" "}
            <span className="text-xl hover:translate-x-2">&#8594;</span>
          </button>
        </div>
        <div className="flex-1">
          <img src={content.img} alt="" />
        </div>
      </section>
    );
  });
};
export default BinaryTree;
