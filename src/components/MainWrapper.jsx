"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { NextUIProvider } from "@nextui-org/react";

const MainWrapper = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("mode");
    }
  }, []);
  return (
    <NextUIProvider>
      <Provider store={store}>
        <div className="w-full bg-white dark:bg-[#242424]">
          <Sidebar />
        </div>
      </Provider>
    </NextUIProvider>
  );
};

export default MainWrapper;
