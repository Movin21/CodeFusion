import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";

export default function Notificationsbox() {
  return (
    <div className="notifications w-[450px] custom-shadow-white">
      <header className="header p-[10px] bg-primary flex items-center justify-between">
        <p className="text-center text-white text-[13px] font-bold">
          Notifications
        </p>
        <span className="Archive-link hover:underline text-sm text-white">
          Archive All
        </span>
      </header>
      <ul className="flex flex-col bg-card_hover_bg">
        {/* inplace of this use map for showing data of db */}

        <li className="notify-item flex py-[10px] px-5 border-b border-gray-800 ">
          {" "}
          {/* notifcation when someone followed use*/}
          <IoMdNotifications className="text-white size-7" />
          <div className="detail  ml-4 flex-grow">
            <p className="notification-text text-white text-sm break-words">
              10 new coding challenges are on the board
            </p>
            <p className=" text-xs text-gray-500">4 min ago</p>
          </div>
        </li>
        <li className="notify-item flex py-[10px] px-5 border-b border-gray-800">
          {" "}
          {/* notifcation from codeFustion*/}
          <img
            src="assets/speaker.png"
            className="w-[29px] h-[29px]"
            alt=".."
          />
          <div className="detail  ml-4 flex-grow">
            <p className="notification-text text-white text-sm break-words">
              Get interview ready top questions for companies
            </p>
            <p className=" text-xs text-gray-500">10 months ago</p>
          </div>
        </li>
      </ul>

      <footer className="text-center bg-[#0f1724] py-[10px] text-[#b5c0d0]">
        <Link
          to="/inbox"
          className="text-[#b5c0d0] hover:text-white hover:underline transition duration-300 ease-in-out"
        >
          Show All
        </Link>
      </footer>
    </div>
  );
}
