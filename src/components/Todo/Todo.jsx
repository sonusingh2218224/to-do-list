"use client";
import { taskCompleted, taskStarred } from "@/lib/slices/TaskSlices";
import React, { useEffect, useState } from "react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Todo = ({ list }) => {
  const dispatch = useDispatch();
  const [completedIds, setCompletedIds] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [starredIds, setStarredIds] = useState([]);

  useEffect(() => {
    const completedTodo = list.filter((item) => item.isCompleted === true);
    setCompletedIds(completedTodo.map((item) => item.id));
    setCompletedList((prev) => ({ ...prev, completedTodo }));
  }, [list]);

  const handleComplete = (id, isCompleted) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((completedId) => completedId !== id));
    } else {
      setCompletedIds([...completedIds, id]);
    }

    dispatch(taskCompleted({ id, isCompleted: !isCompleted }));
  };

  console.log(list, "All lists");

  const handleStarred = (id, isStarred) => {
    if (starredIds.includes(id)) {
      setStarredIds(starredIds.filter((starId) => starId !== id));
    } else {
      setStarredIds([...starredIds, id]);
    }
    dispatch(taskStarred({ id, isStarred: !isStarred }));
  };


  return (
    <div className="">
      {/* <h2>Importa</h2> */}
      {list.map((item, index) => {
        return (
          item.isCompleted != true && (
            <div
              key={index}
              className="w-full py-4 px-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 flex items-center justify-center rounded-sm border cursor-pointer ${
                    completedIds.includes(item.id)
                      ? "bg-green-600 border-green-600"
                      : "border-black"
                  }`}
                  onClick={() => handleComplete(item.id, item.isCompleted)}
                >
                  {completedIds.includes(item.id) && (
                    <IoCheckmark className="text-white" />
                  )}
                </div>
                <p className="text-[0.9rem] font-medium capitalize">
                  {item.task}
                </p>
              </div>
              {item.isStarred ? (
                <IoIosStar
                  className="text-[1.2rem]"
                  onClick={() => handleStarred(item.id, item.isStarred)}
                />
              ) : (
                <IoIosStarOutline
                  className="text-[1.2rem]"
                  onClick={() => handleStarred(item.id, item.isStarred)}
                />
              )}
            </div>
          )
        );
      })}
      <div className="w-full mt-8">
        {completedList.completedTodo.length !==0 && (
          <h1 className="my-3 text-zinc-800 font-medium text-[1.2rem]">
            Completed
          </h1>
        )}
        {list.map((item, index) => {
          return (
            item.isCompleted == true && (
              <div
                key={index}
                className="w-full py-4 px-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-sm border cursor-pointer ${
                      completedIds.includes(item.id)
                        ? "bg-green-600 border-green-600"
                        : "border-black"
                    }`}
                    onClick={() => handleComplete(item.id, item.isCompleted)}
                  >
                    {completedIds.includes(item.id) && (
                      <IoCheckmark className="text-white" />
                    )}
                  </div>
                  <p className="text-[0.9rem] font-medium line-through capitalize text-zinc-500">
                    {item.task}
                  </p>
                </div>
                {item.isStarred ? (
                  <IoIosStar className="text-[1.2rem]" />
                ) : (
                  <IoIosStarOutline className="text-[1.2rem]" />
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
