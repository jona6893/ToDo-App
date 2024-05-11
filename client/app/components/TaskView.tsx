"use client";
import React, { useRef } from "react";
import Card from "./card/Card";
import { useEffect, useState } from "react";
import getTasks from "../modules/GetTasks";
import userStore from "../store/userStore";
import Task from "../entities/Tasks";
import autoAnimate from "@formkit/auto-animate";
import TaskTabs from "./TaskTabs";
import { tabTasks, sortTasks } from "../modules/SortAndFilter";
import SortTask from "./SortTask";

function TaskView() {
  const [filtered, setFiltered] = React.useState<Task>();
  const [curTab, setCurTab] = useState<string>("All");
  const { user, tasks, setTask } = userStore();
  const parent = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._key !== null && user._key !== undefined) {
        // Add a null check for user
        //console.log("user", user);
        const getAllTasks = await getTasks(user._key);
        setTask(getAllTasks);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (tasks) {
      if (curTab === "All") {
        let sortedTask = [];
        sortedTask = tasks.sort((a, b) => b.created_at - a.created_at);
        setFiltered(sortedTask);
      } else {
        setFiltered(tabTasks(curTab, tasks));
      }
    }
  }, [tasks]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (curTab === "All") {
      setFiltered(tabTasks(curTab, tasks));
    } else {
      setFiltered(tabTasks(curTab, tasks));
    }
  }, [curTab]);

  function handleSorting(option) {
    console.log("sorting");
    const sorted = sortTasks("created_at", option, tasks);
    setFiltered(sorted);
  }
  // console.log("filtered", filtered);

  return (
    <section ref={parent} className="flex flex-col items-center gap-4 p-4">
      <div className="flex max-md:flex-col gap-6 justify-between md:items-center items-start max-w-lg w-full border-b border-gray-200 dark:border-gray-500">
        <SortTask handleSorting={handleSorting} />
        <TaskTabs setCurTab={setCurTab} curTab={curTab} />
      </div>
      {filtered && filtered.map((task) => <Card task={task} key={task._key} />)}
    </section>
  );
}

export default TaskView;
