import React from "react";
import { FooterLinks, socialMedia } from "../constants";
import styles, { layout } from "../styles";
import { Link } from "react-router-dom";

export default function Footer({ pageName }) {
  const footerLinks = [
    {
      link: "/",
      name: "Blogs",
    },

    {
      link: "/",
      name: "Contact Us",
    },
    {
      link: "/",
      name: "Mentor Support",
    },
    {
      link: "/",
      name: "About Us",
    },
    {
      link: "/",
      name: "Challenges",
    },
    {
      link: "/",
      name: "Terms Of Service",
    },
    {
      link: "/",
      name: "Privacy Policy",
    },
  ];
  return (
    <footer
      className={`w-full ${
        pageName === "Profile" ? "bg-page_background2" : "bg-page_background"
      }  px-4 pt-14 -mt-[1px]`}
    >
      <div className="w-fit flex items-center mx-auto p-2  flex-wrap">
        {footerLinks.map((link, id) => {
          return (
            <div className="flex items-center " key={id}>
              <Link
                to={link.link}
                className="text-white hover:text-light transition duration-300 ease-in-out text-sm"
              >
                {link.name}
              </Link>

              {id !== footerLinks.length - 1 && (
                <div className="w-[1px] h-3 mx-2 bg-slate-500"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full flex sm:justify-center   justify-center">
        <section className="flex flex-col gap-2 items-center my-10">
          <div className="flex flex-row md:mt-0  justify-end items-end">
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
          <p className="font-poppins font-normal text-end text-[14px] mt-2 leading-[27px] text-white">
            Copyright &copy; 2023 CodeFusion.
          </p>
        </section>
      </div>
    </footer>
  );
}
