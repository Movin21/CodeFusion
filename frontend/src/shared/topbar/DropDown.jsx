import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Profile", link: "profile" },
  { name: "Blogs", link: "/blogs" },
  { name: "Mentor Support", link: "/blogSupport" },
  { name: "Logout", link: "logout" },
];

export default function DropDown({ handlePageName, handleMenuState }) {
  return (
    <div className="">
      <div className="bg-bg4 absolute  top-12 w-[195px] right-0 px-4 py-3">
        <div className="">
          <button className="w-full hover:font-semibold rounded-lg hover:text-white transition-all duration-300 ease-in-out bg-light font-semibold text-md  p-2">
            Challenges : 2000
          </button>
        </div>
        <ul className="flex flex-col mt-4 space-y-2">
          {navLinks.map((obj, id) => {
            return (
              <li key={id} className="">
                <div className="w-full bg-gray-700 h-[1px] mb-2"></div>
                <Link
                  onClick={() => {
                    handleMenuState();
                    handlePageName(obj.name);
                  }}
                  to={obj.link}
                  className="text-gray-200 text-sm  hover:text-textPrimary hover:text-[15px] transition-all duration-300 ease-in-out"
                >
                  {obj.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
