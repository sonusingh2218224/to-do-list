"use client";
import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { CiBellOn } from "react-icons/ci";
import { BsRepeat } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";


const TodoContainer = ({ route }) => {
    const dispatch = useDispatch()
    const [task, setTask] = useState({})
  const renderTask = () => {
    switch (route) {
      case "All Tasks":
        return <div>All Tasks Container</div>;

      case "Today":
        return <div>Today Container</div>;

      case "Important":
        return <div>Important Container</div>;

      case "Planned":
        return <div>Planned Container</div>;

      case "Assigned to me":
        return <div>Assigned to me Container</div>;
    }
  };

  const handleChange = () => {
    
  }
  return (
    <div className="">
      <div className="w-full h-[12rem] bg-gradient-to-t from-[#3579371A] px-6 flex flex-col relative to-[#D0FFD21A] mt-12 border-y-[1.5px] border-[#486e4b20]">
        <input
          type="text"
          placeholder="Add A Task"
          onChange={handleChange}
          className="w-full h-[8rem] outline-none border-none bg-transparent  text-[0.9rem] font-medium"
        />
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <CiBellOn className="text-[1.6rem] cursor-pointer" />
            <BsRepeat className="text-[1.2rem] cursor-pointer" />
            <HiOutlineCalendarDateRange className="text-[1.2rem] cursor-pointer" />
          </div>
          <button className="bg-[#35793729] text-[#357937] text-[0.9rem] font-medium py-2 px-5 rounded" onClick={() => dispatch()}>
            ADD TASK
          </button>
        </div>
      </div>
      <div className="mt-3">{renderTask()}</div>
    </div>
  );
};

export default TodoContainer;
