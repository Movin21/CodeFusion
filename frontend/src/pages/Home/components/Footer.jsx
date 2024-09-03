import { FooterLinks, socialMedia } from "../constants";
import styles, { layout } from "../styles";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center">
      <section
        className={`${layout.section} justify-evenly flex-wrap border-b-[1px] border-slate-300`}
      >
        {FooterLinks.map((footer) => {
          return (
            <div
              key={footer.id}
              className="flex flex-col flex-1 gap-3 ss:my-0 my-4 min-w-[150px] sm:mx-10 mx-5"
            >
              <p
                className={`font-poppins font-normal text-slate-600 text-[15px]  text-start leading-[30.8px] uppercase tracking-widest`}
              >
                {footer.title}
              </p>
              <ul className="list-none mt-2 text-start leading-[28.8px] ">
                {footer.links.map((link, index) => {
                  return (
                    <li
                      key={index}
                      className="text-gray-600 font-normal text-[14px] hover:text-green-600"
                    >
                      {link}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
      <div className="w-full flex sm:justify-end sm:mr-10 sm:pr-10 justify-center">
        <section className="flex flex-col gap-2 items-end my-10">
          <div className="flex flex-row md:mt-0 mt-6 justify-end items-end">
            {socialMedia.map((media, index) => {
              return (
                <img
                  key={media.id}
                  src={media.icon}
                  alt="SocialMedia"
                  className={`w-[21px] h-[21px] object-contain cursor-pointer text-black text-end ${
                    index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                  }`}
                />
              );
            })}
          </div>
          <p className="font-poppins font-normal text-end text-[14px] leading-[27px] text-slate-900">
            Copyright &copy; 2023 HackerRank.
          </p>
          <p className="font-poppins font-normal text-end text-[12px] leading-[27px] text-slate-900">
            Privacy policy
          </p>
        </section>
      </div>
    </footer>
  );
};
export default Footer;
