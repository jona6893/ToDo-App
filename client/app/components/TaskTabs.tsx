"use client";
import { useState } from "react";

function TaskTabs({ setCurTab, curTab }: { setCurTab: any; curTab: string }) {
  const tabOptions = ["All", "todo", "in progress", "done"];

  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300 ">
      <ul className="flex flex-wrap -mb-px">
        {tabOptions.map((tab) => (
          <li
            key={tab}
            onClick={() => setCurTab(tab)}
            className={`me-2 inline-block p-4 border-b-2 rounded-t-lg cursor-pointer ${
              curTab == tab
                ? "text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-200"
            } `}
          >
            {tab.substring(0, 1).toUpperCase() + tab.substring(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskTabs;
