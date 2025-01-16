"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbNotes } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";
import TodoContainer from "./TodoContainer/TodoContainer";
import DoughnutChart from "./DoughnutChart";
import { useSelector } from "react-redux";

const sidebarNavigations = [
  {
    id: 1,
    icon: <TbNotes className={`group-hover:text-[#357937] `} />,
    name: "All Tasks",
  },
  {
    id: 2,
    icon: <TbNotes className={`group-hover:text-[#357937] `} />,
    name: "Today",
  },
  {
    id: 3,
    icon: <TbNotes className={`group-hover:text-[#357937] `} />,
    name: "Important",
  },
  {
    id: 4,
    icon: <TbNotes className={`group-hover:text-[#357937] `} />,
    name: "Planned",
  },
  {
    id: 5,
    icon: <TbNotes className={`group-hover:text-[#357937] `} />,
    name: "Assigned to me",
  },
];

const Sidebar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState("All Tasks")
  const listLength = useSelector((state) => state.tasks);

  const handleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("mode", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("mode");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDarkMode);
      }
    }
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  return (
    <div className="w-full">
      <header className="h-[5rem] w-full px-8 flex justify-between items-center fixed top-0 left-0 bg-white shadow-md shadow-black/5 z-50">
        <div className="flex items-center gap-6">
          <IoIosMenu
            className="text-[1.4rem] hover:text-[#357937] cursor-pointer"
            onClick={() => setIsMenuClicked(!isMenuClicked)}
          />
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="w-[5rem] select-none"
          />
        </div>
        <div className="flex items-center gap-6">
          <FiSearch className="text-[1.4rem] hover:text-[#357937] cursor-pointer" />
          <TbCategory className="text-[1.4rem] hover:text-[#357937] cursor-pointer" />
          <MdOutlineDarkMode
            className="text-[1.4rem] hover:text-[#357937] cursor-pointer"
            onClick={handleDarkMode}
          />
        </div>
      </header>
      <div className="absolute top-[5rem] w-full flex">
        <div
          className={`h-screen  flex items-end overflow-y-auto transition-all duration-500  ${
            isMenuClicked ? "-translate-x-[25vw] w-0" : "translate-x-0 w-[25%] px-6 "
          }`}
        >
          <div className="w-full h-[90%] bg-[#eef6ef] rounded-md">
            <div className="w-full flex flex-col items-center -mt-[15%]">
              <Image
                src={"/assets/profile.jpg"}
                alt="profile"
                width={300}
                height={300}
                className="h-[6rem] w-[6rem] rounded-full object-cover"
              />
              <p className="font-medium text-[0.9rem] mt-4">Hey, ABCD</p>
            </div>
            <div className="px-3 pt-3">
              <div className="w-full bg-white py-2 rounded px-2">
                {sidebarNavigations.map((item, index) => (
                  <div
                    className={`w-full p-2 flex gap-3 items-center group hover:bg-[#eef6ef] transition-all duration-300 cursor-pointer rounded ${defaultRoute === item.name && "bg-[#eef6ef]"}`}
                    key={index}
                    onClick={() => setDefaultRoute(item.name)}
                  >
                    {item.icon}
                    <p className={`group-hover:text-[#357937] text-[0.9rem] font-medium transition-all duration-300 ${defaultRoute === item.name && "text-[#357937]"}`}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-full bg-white py-4 rounded px-2 my-2 ">
                <div className="py-4 px-2 flex gap-3 items-center group hover:bg-[#eef6ef] transition-all duration-300 cursor-pointer">
                  <IoAddOutline className="group-hover:text-[#357937]" />
                  <p className="text-[0.9rem] font-medium group-hover:text-[#357937]">
                    Add list
                  </p>
                </div>
              </div>
              <div className="w-full bg-white py-4 rounded ">
                <div className="w-full border-b border-zinc-200">
                  <div className="px-4 py-2 pb-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-[0.8rem]">Today Tasks</p>
                      <BsExclamationCircleFill className="text-[#bdbdbd] text-[0.7rem]" />
                    </div>
                    <h3 className="text-[1.2rem] font-medium">{listLength.length}</h3>
                  </div>
                </div>
                <div className="px-3 py-2 flex justify-center w-full">
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`transition-all px-3 ${isMenuClicked ? "w-full": "delay-300 w-[75%]"}`}>
          <TodoContainer route={defaultRoute} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
