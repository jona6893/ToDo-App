"use client";
import userStore from "@/app/store/userStore";
import UpdateTaskAPI from "../../modules/UpdateTask";
import Task from "@/app/entities/Tasks";
import { useState } from "react";

function TaskStatus({ currentTask }: { currentTask: Task }) {
  const [status, setStatus] = useState<string>(currentTask.status);
  const { tasks, setTask } = userStore();
  const handleStatusChange = async (e) => {
    console.log("status", e.target.value);
    const update = { _key: currentTask._key, status: e.target.value };
    const updateStatus = await UpdateTaskAPI(update);
    if (updateStatus.status === true) {
      setTask(
        tasks.map((task) => {
          if (task._key === update._key) {
            return { ...task, status: e.target.value };
          } else {
            return task;
          }
        })
      );
    }
  };

  return (
    <select
      onChange={(e) => {
        handleStatusChange(e);
        setStatus(e.target.value);
      }}
      name="Status"
      id=""
      value={status}
      className="border-slate-500 border rounded-full p-1 text-gray-200 dark:text-gray-900 bg-slate-900 dark:bg-gray-100"
    >
      <option value="todo">🟢 Todo</option>
      <option value="in progress">🟡 In Progress</option>
      <option value="done">🔴 Done</option>
    </select>
  );
}

export default TaskStatus;
