import { logo } from "../assets";
import SignUpBTN from "./SignUpBTN";
import { useState } from "react";
import { NavLinks } from "../constants";
import { navIcon, close } from "../assets";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <section className="flex flex-col w-full z-[99]">
      {/* contact and login */}
      <div className="sm:flex flex-row justify-end items-center gap-5 bg-black text-dimWhite w-full h-[43px] hidden">
        <Link to="#" className="hover:text-light">
          Contact Us
        </Link>
        <div className="border-l-dimWhite border-l-2 h-[20px]" />
        <Link to="#" className="mr-10 hover:text-light">
          Login
        </Link>
      </div>

      {/* Menu Bar */}
      <nav
        className={`sticky top-5 left-0 w-full bg-white z-50 shadow-md py-3`}
      >
        <div className="sm:flex flex-row justify-around items-center h-[40px] mt-3">
          {/* image */}
          <Link to="/">
            <div className="sm:w-[230px] w-[230px] sm:p-0 p-3">
              <img src={logo} alt="Logo" className="h-[240px]" />
            </div>
          </Link>
          {/* Menus */}
          <div className="sm:flex flex-row justify-between items-center mb-2 gap-5 mr-20 hidden ">
            <Link
              to="#"
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              Challenges
            </Link>
            <Link
              to="/blogs" // Assuming you want to navigate to a blogs route
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              Blogs
            </Link>
            <Link
              to="#"
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              Mentor Support
            </Link>
            <Link
              to="#"
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              Testamonials
            </Link>
            <Link
              to="#"
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              About Us
            </Link>
          </div>
          {/* Sign up */}
          <div className="sm:flex flex-row justify-between items-center mb-2 gap-5 hidden">
            <Link
              to="#"
              className="font-poppins font-semibold px-3 text-[14px] hover:text-light"
            >
              Log In
            </Link>
            <div>
              <SignUpBTN width={"80px"} text={"Sign up"} />
            </div>
          </div>
        </div>
        {/* Nav links for small devices */}
        <div className="sm:hidden flex flex-1 justify-end items-center absolute top-6 right-10">
          <img
            src={toggle ? close : navIcon}
            alt="Menu bar"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle((prev) => !prev)}
          />

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-black-gradient absolute top-6 right-0 mx-4 my-2 min-w-[140px] rounded-xl bg-primary`}
          >
            {/* Nav Links */}
            <ul className="list-none justify-end items-center">
              {NavLinks.map((link, index) => {
                return (
                  <li
                    key={link.id}
                    className={`font-poppins cursor-pointer text-[16px] text-white flex flex-col flex-1 ${
                      index === NavLinks.length - 1 ? "mb-0" : "mb-2"
                    }`}
                  >
                    <Link to={`#${link.id}`}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
