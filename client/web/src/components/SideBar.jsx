import React, { useState, useEffect, useContext } from "react";
import Chart from "assets/img/Chart.png";
import control from "assets/img/control.png";
import logo from "assets/img/logo.png";
import Chat from "assets/img/Chat.png";
import Folder from "assets/img/Folder.png";
import User from "assets/img/User.png";
import Calendar from "assets/img/Calendar.png";
import Setting from "assets/img/Setting.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";

const Logout = ({ open }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <button onClick={handleLogout} className="flex gap-x-4 items-center">
      <li
        className={
          "flex  rounded-md p-2 cursor-pointer hover:bg-soft text-gray-300 text-sm items-center gap-x-4 mt-9"
        }
      >
        <img src={User} alt="logout" />
        <span className={`${!open && "hidden"} origin-left duration-200`}>
          Se déconnecter
        </span>
      </li>
    </button>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart, to: "/app/dashboard", gap: true },
    { title: "Services", src: Folder, to: "/app/services" },
    { title: "Mes AREAs", src: Calendar, to: "/app/my_areas" },
    { title: "Profile", src: Setting, to: "/app/profile" },
  ];

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-main h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src={control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="control"
      />
      <div
        className="flex gap-x-4 items-center hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          className={`duration-500 ${open && "rotate-[360deg]"}`}
          alt="logo"
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          AREA CATT
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu) => (
          <button
            onClick={() => navigate(Menu.to)}
            key={`key_${Menu.title}`}
            className="flex gap-x-4 items-center"
          >
            <li
              key={`key_${Menu.title}`}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-soft text-gray-300 text-sm items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                Menu.to === window.location.pathname && "bg-soft"
              } `}
            >
              <img src={Menu.src} alt={Menu.title} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </button>
        ))}
        <Logout open={open} />
      </ul>
    </div>
  );
};

export default SideBar;
