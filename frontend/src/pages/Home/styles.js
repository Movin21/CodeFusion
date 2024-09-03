// grouping common styles into a single variable. tailwind CSS

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2:
    "font-poppins sm:font-bold font-semibold sm:text-[65px] text-[30px] sm:text-center text-start text-primary xs:leading-[76.8px] leading-[40.8px] w-full sm:px-0 px-3",
  heading3:
    "font-poppins sm:font-medium sm:font-normal font-semibold sm:text-[50px] sm:text-center text-start text-[30px] xs:leading-[76.8px] leading-[40.8px] w-full sm:px-0 px-3",
  heading3_start:
    "font-poppins sm:font-medium font-normal sm:text-[50px]  text-start text-[30px] xs:leading-[76.8px] leading-[40.8px] w-full sm:px-0",
  heading4:
    "font-poppins sm:font-medium font-normal sm:text-[40px] text-center text-[25px] sm:text-center text-start xs:leading-[56.8px] leading-12 w-full",
  heading4_start:
    "font-poppins sm:font-medium font-normal sm:text-[40px] text-center text-[25px] text-start xs:leading-[56.8px] leading-12 w-full",
  heading5_start:
    "font-poppins sm:font-medium font-normal sm:text-[30px] text-center text-[20px] text-start xs:leading-[56.8px] leading-2 w-full",
  paragraph:
    "font-poppins font-normal text-slate-700 text-[18px] sm:text-center text-start leading-[30.8px] sm:px-0 px-3",
  paragraph_start:
    "font-poppins font-normal text-slate-700 text-[18px]  text-start leading-[30.8px]",

  flexCenter: "flex justify-center sm:items-center items-start",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-12 px-6",
  paddingY: "sm:py-10 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-6 my-4",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
