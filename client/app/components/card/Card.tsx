import React, { useEffect } from "react";
import TaskStatus from "./TaskStatus";
import DeleteTask from "./DeleteTask";
import userStore from "@/app/store/userStore";
import UpdateTaskAPI from "@/app/modules/UpdateTask";
import TimeStamp from "./TimeStamp";

interface Props {
  task: {
    title: string;
    description: string;
    id: string;
    status: string;
    created_at: number;
    _key: string;
    _id: string;
  };
}

function Card({ task }: Props) {
  const { tasks, setTask } = userStore();
  const [edit, setEdit] = React.useState<boolean>(true);
  const [hasEditRun, setHasEditRun] = React.useState<number>(0);
  const [value, setValue] = React.useState<string>({
    title: task.title,
    description: task.description,
  } as any);

  // when edit is false, check value aginst task.title and description if they are different update the task

  useEffect(() => {
    if (edit === true) {
      if (
        value.title !== task.title ||
        value.description !== task.description
      ) {
       // console.log("value", value);
       // console.log("task", task.title, task.description);
        if (hasEditRun !== 0) {
          //console.log("running update task");
          updateTask();
        }
      }
    }
  }, [edit, value, task]);

  async function updateTask() {
    const update = {
      _key: task._key,
      title: value.title,
      description: value.description,
    };
    const updateStatus = await UpdateTaskAPI(update);
    if (updateStatus.status === true) {
      setTask(
        tasks.map((task) => {
          if (task._key === update._key) {
            return {
              ...task,
              title: value.title,
              description: value.description,
            };
          } else {
            return task;
          }
        })
      );
    }
  }

  function updateValue(newValue, field) {
    setValue((prev) => {
      //console.log("prev", prev);
      return { ...prev, [field]: newValue };
    });
  }
  function updateEdit() {
    if (hasEditRun === 0) {
      setHasEditRun(1);
      setEdit(!edit);
      return;
    }
    setEdit(!edit);
  }

  return (
    <div className="relative max-w-lg w-full p-6 bg-white border border-gray-200 rounded-lg shadow-card dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {edit ? (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {task.title}
          </h5>
        ) : (
          <input
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white dark:bg-gray-900 border-blue-500 border rounded-lg p-1"
            type="text"
            value={value.title}
            autoFocus
            onChange={(e) => updateValue(e.target.value, "title")}
          />
        )}
      </a>
      {edit ? (
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
          {task.description}
        </p>
      ) : (
        <textarea
          value={value.description}
          rows={3}
          className="w-full mb-3 font-normal text-gray-700 dark:text-gray-300 border-blue-500 dark:bg-gray-900 border rounded-lg p-1"
          onChange={(e) => updateValue(e.target.value, "description")}
        />
      )}
      <div className="flex gap-2 items-center">
        <div className="relative">
          <TaskStatus currentTask={task} />
        </div>
        <button onClick={() => updateEdit()} className="">
          {edit ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              className="w-6 h-6 stroke-gray-400 dark:stroke-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke=""
              className="w-8 h-8 stroke-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </button>
        <TimeStamp currentTask={task} />
        <DeleteTask _key={task._key} />
      </div>
    </div>
  );
}

export default Card;
