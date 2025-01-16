"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsRepeat, BsBell, BsBellFill } from "react-icons/bs";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { createTask } from "@/lib/slices/TaskSlices";
import Todo from "../Todo/Todo";

const renderTask = (route, taskList) => {
  const date = new Date();
  const formattedDate =
    date.getFullYear() +
    "-" +
    `${date.getMonth() < 10 && "0"}${Number(date.getMonth() + 1)}` +
    "-" +
    date.getDate();

  switch (route) {
    case "All Tasks":
      return <Todo list={taskList} />;
    case "Today":
      const todayTaskList = taskList.filter(
        (item) => item.dueDate === formattedDate
      );
      console.log(todayTaskList, "today", formattedDate);
      return <Todo list={todayTaskList} />;
    case "Important":
      const importantTaskList = taskList.filter(
        (item) => item.isStarred === true
      );
      return <Todo list={importantTaskList} />;
    case "Planned":
    case "Assigned to me":
      return <Todo list={[]} />;
  }
};

const TodoContainer = ({ route }) => {
  const [isDateClicked, setIsDateClicked] = useState(false);
  const dateModal = useRef(null);

  const taskList = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    taskValue: "",
    isStarred: false,
    dueDate: "2025/01/16",
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dateModal.current && !dateModal.current.contains(event.target)) {
        setIsDateClicked(false);
      }
    };

    if (isDateClicked) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDateClicked]);

  const handleChange = (e) => {
    const { value } = e.target;
    setTask((prev) => ({ ...prev, taskValue: value }));
  };

  const handleTaskSubmit = () => {
    if (!task.taskValue.trim()) {
      alert("Task cannot be empty");
      return;
    }
    dispatch(
      createTask({
        task: task.taskValue,
        isStarred: task.isStarred,
        dueDate: task.dueDate,
      })
    );
    setTask({ taskValue: "", isStarred: false, dueDate: "" });
  };

  const handleSubmitOnEnter = (e) => {
    if (e.key === "Enter") {
      if (!task.taskValue.trim()) {
        alert("Task cannot be empty");
        return;
      }
      dispatch(
        createTask({
          task: task.taskValue,
          isStarred: task.isStarred,
          dueDate: task.dueDate,
        })
      );
      setTask({ taskValue: "", isStarred: false, dueDate: "" });
    }
  };

  return (
    <div>
      <div className="w-full h-[12rem] bg-gradient-to-t from-[#3579371A] px-6 flex flex-col relative to-[#D0FFD21A] mt-12 border-y-[1.5px] border-[#486e4b20]">
        <input
          type="text"
          placeholder="Add A Task"
          onChange={handleChange}
          value={task.taskValue}
          onKeyDown={handleSubmitOnEnter}
          className="w-full h-[8rem] outline-none border-none bg-transparent  text-[0.9rem] font-medium"
        />
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            {task.isStarred ? (
              <BsBellFill
                className={`text-[1.4rem] cursor-pointer text-[#357937] h-8 w-8 p-[0.4rem] rounded-full`}
                onClick={() =>
                  setTask((prev) => ({ ...prev, isStarred: false }))
                }
              />
            ) : (
              <BsBell
                className={`text-[1.4rem] cursor-pointer h-8 w-8 p-[0.4rem] rounded-full`}
                onClick={() =>
                  setTask((prev) => ({ ...prev, isStarred: true }))
                }
              />
            )}

            <BsRepeat className="text-[1.2rem] cursor-pointer" />
            <HiOutlineCalendarDateRange
              className="text-[1.2rem] cursor-pointer"
              onClick={() => setIsDateClicked(true)}
            />
          </div>
          <button
            className="bg-[#35793729] text-[#357937] text-[0.9rem] font-medium py-2 px-5 rounded"
            onClick={handleTaskSubmit}
          >
            ADD TASK
          </button>
        </div>
      </div>
      {isDateClicked && (
        <div className="w-full h-screen fixed flex justify-center items-center top-0 left-0 backdrop-blur-md bg-black/20 z-[999999]">
          <div
            className=" w-[20%] bg-white rounded-3xl p-4 flex flex-col items-center gap-2 py-8 px-6"
            ref={dateModal}
          >
            <h1 className="text-lg font-semibold mb-4">Select Due Date</h1>
            <div>
              <input
                type="date"
                value={task.dueDate}
                className="border rounded-md p-2 w-full"
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
            <button
              className="mt-4 bg-[#35793729] text-[#357937] py-2 px-4 rounded transition-all hover:bg-[#357937] hover:text-white"
              onClick={() => {
                if (task.dueDate != "") {
                  setIsDateClicked(false);
                } else {
                  alert("Date can not be empty while you select!");
                }
              }}
            >
              Set Due Date
            </button>
          </div>
        </div>
      )}
      <div className="mt-3 h-[60vh] overflow-y-auto">{renderTask(route, taskList)}</div>
    </div>
  );
};

export default TodoContainer;
