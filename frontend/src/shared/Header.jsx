import { IoSearch } from "react-icons/io5";
import {
  Search2Icon,
  TriangleDownIcon,
  ChatIcon,
  BellIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import DropDown from "./topbar/DropDown";
import { useEffect, useState } from "react";
import SideBar from "./topbar/SideBar";

import Notificationsbox from "./topbar/Notificationsbox";

export default function Header({ pageName, handlePageName }) {
  const [menuHidden, setMenuHidden] = useState(true);
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [notificationHidden, setNotificationHidden] = useState(true);
  const [messageHidden, setMessageHidden] = useState(true);

  const handleMenuState = () => {
    setMenuHidden(!menuHidden);
  };

  const hanldeSidebarState = () => {
    setSidebarHidden(!sidebarHidden);
  };

  useEffect(() => {
    if (!sidebarHidden) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarHidden]);

  const OnUpdatePageName = (keyname) => {
    handlePageName(keyname);
    pageName = keyname;
  };

  return (
    <div className="topbar md:mt-0">
      <div
        className="topbarWrapper bg-primary flex items-center"
        style={{ height: "70px" }}
      >
        <div
          className="mobile-topbar px-5 md:px-10 py-3 md:py-0 flex justify-between md:hidden items-center"
          style={{ height: "100%" }}
        >
          <div
            className="menu flex flex-col h-5 justify-between mr-6 md:hidden"
            onClick={hanldeSidebarState}
          >
            <div
              className={`row w-6 h-0.5 duration-300 bg-white ${
                !sidebarHidden && "rotate-45 translate-y-[9px]"
              }`}
            ></div>
            <div
              className={`row w-6 h-0.5 bg-white ${!sidebarHidden && "hidden"}`}
            ></div>
            <div
              className={`row w-6 h-0.5 duration-300 bg-white ${
                !sidebarHidden && "-rotate-45 -translate-y-[9px]"
              }`}
            ></div>
          </div>
          <span className="logo">
            <img src="assets/logo.png" className="w-[135px]" alt="Logo" />
          </span>
          <div className="topbar-icons flex items-center p-1 space-x-3 text-white">
            <span>
              <Search2Icon />
            </span>
            <span>
              <ChatIcon />
            </span>
          </div>
        </div>

        {/* Sidebar for mobile screen */}
        {!sidebarHidden && <SideBar hanldeSidebarState={hanldeSidebarState} />}

        {/* Larger screen topbar */}
        <div
          className="larger-screen-topbar hidden md:flex justify-between items-center w-full px-6 lg:px-12"
          style={{ height: "100%" }}
        >
          <div className="leftTopbar flex items-center ">
            <div className="logo mt-1.5">
              <Link to="/">
                <img
                  src="assets/whitelogo.png"
                  className="sm:w-[230px] w-[230px] "
                  alt="Logo"
                />
              </Link>
            </div>

            <ul className="nav-links flex text-textSecondary items-center text-sm">
              <li className="px-4">
                <div className="h-4 w-0.5 bg-borderColor"></div>
              </li>
              <li className="relative">
                <Link
                  to="/ChallengesListing"
                  onClick={() => OnUpdatePageName("dashboard")}
                  className={`px-[18px] ${
                    pageName === "dashboard"
                      ? "text-white font-medium"
                      : "hover:text-gray-200"
                  }`}
                >
                  Challenges
                </Link>
                {pageName === "dashboard" && (
                  <div className="absolute w-full border-b -bottom-5 inset-x-0 border-2 border-buttonBg"></div>
                )}
              </li>
              <li className="relative">
                <Link
                  to="/blogs"
                  onClick={() => OnUpdatePageName("Certify")}
                  className={`px-[18px] ${
                    pageName === "Certify"
                      ? "text-white font-medium"
                      : "hover:text-gray-200"
                  }`}
                >
                  Blogs
                </Link>
                {pageName === "Certify" && (
                  <div className="absolute w-full border-b -bottom-5 inset-x-0 border-2 border-buttonBg"></div>
                )}
              </li>
              <li className="relative">
                <Link
                  to="/blogSupport"
                  onClick={() => OnUpdatePageName("compete")}
                  className={`px-[18px] ${
                    pageName === "compete"
                      ? "text-white font-medium"
                      : "hover:text-gray-200"
                  }`}
                >
                  Mentor Support
                </Link>
                {pageName === "compete" && (
                  <div className="absolute w-full border-b -bottom-5 inset-x-0 border-2 border-buttonBg"></div>
                )}
              </li>
              <li className="relative">
                <Link
                  to="#"
                  onClick={() => OnUpdatePageName("apply")}
                  className={`px-[18px] ${
                    pageName === "apply"
                      ? "text-white font-medium"
                      : "hover:text-gray-200"
                  }`}
                >
                  FAQ
                </Link>
                {pageName === "apply" && (
                  <div className="absolute w-full border-b -bottom-5 inset-x-0 border-2 border-buttonBg"></div>
                )}
              </li>
            </ul>
          </div>

          <div className="rightTopbar flex items-center">
            <div className="topBar-SearchBar bg-gray-700 p-[1px] rounded custom-shadow-white shadow-white mr-4 flex items-center">
              <button className="text-white px-1">
                <IoSearch />
              </button>
              <input
                type="text"
                className="bg-gray-700 text-white p-1 text-sm placeholder:text-gray-100 focus:outline-none w-16 lg:w-[120px] xl:w-[200px]"
                placeholder="Search"
              />
            </div>

            <ul className="flex items-center space-x-6">
              <li className="relative cursor-pointer">
                <span
                  className="text-textSecondary p-1 hover:text-white"
                  onClick={() => setNotificationHidden(false)}
                >
                  <BellIcon />
                </span>
                {!notificationHidden && (
                  <>
                    <div className="absolute top-10 right-0">
                      <Notificationsbox />
                    </div>
                    <span
                      className="fixed bg-black w-full h-full right-0 top-0 opacity-0"
                      onClick={() => setNotificationHidden(true)}
                    ></span>
                  </>
                )}
              </li>

              <li className="mx-4 h-4 w-0.5 bg-gray-400"></li>
              <li className="p-1 text-gray-400">
                <DragHandleIcon />
              </li>

              <li className="topbar-menu p-1 relative">
                <button
                  className="profile-btn flex items-center space-x-1"
                  onClick={handleMenuState}
                >
                  <Link to="/profile">
                    <img
                      src="assets/profile.png"
                      className="profileImg w-7 h-7 rounded-[50%] border object-cover"
                      alt=""
                    />
                  </Link>
                  <i
                    className={`text-gray-400 hover:text-white ${
                      !menuHidden && "text-white"
                    }`}
                  >
                    <TriangleDownIcon />
                  </i>
                </button>

                {!menuHidden && (
                  <>
                    <span
                      className="fixed bg-black w-full h-full right-0 top-0 opacity-0"
                      onClick={handleMenuState}
                    ></span>
                    <DropDown
                      handleMenuState={handleMenuState}
                      handlePageName={handlePageName}
                    />
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
