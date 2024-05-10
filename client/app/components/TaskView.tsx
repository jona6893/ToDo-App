"use client";
import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import getTasks from "../modules/GetTasks";

 interface Props {
   setUser: React.Dispatch<React.SetStateAction<null | string>>;
   user: { email: string; _key: string; name: string };
 }

function TaskView({setUser, user}:Props) {
  const [tasks,setTask] = React.useState<null | string>(null);


  useEffect(() => {
    const fetchData = async () => {
      if (user && user._key !== null) { // Add a null check for user
        console.log("user", user._key);
        const getAllTasks = await getTasks(user._key);
        setTask(getAllTasks);
      }
    };

    fetchData();
  }, [user]);
  console.log(tasks);
 
  return (
    <section className="flex flex-col items-center gap-4 p-4">
      {tasks && tasks.map((task) => (
         <Card task={task} key={task._key} />
      ))}
    </section>
  );
}

export default TaskView;
