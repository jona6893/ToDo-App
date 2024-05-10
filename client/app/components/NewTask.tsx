"use client";
import React, { useEffect } from 'react'
import addNewTask from '../modules/AddNewTask'
interface Prop {
  setModel: React.Dispatch<React.SetStateAction<boolean>>
  user: {email: string, _key: string, name: string}
}

function NewTask({setModel, user}: Prop) {

  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setModel(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setModel(false)
    const form = event.currentTarget;
    const task = {title: form.title.value, description: form.description.value, id:user._key,status: 'todo'}
    console.log(task)
    const submitTask = addNewTask(task)
    console.log(submitTask)

  }



  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/10">
      <div className="w-4/5 bg-white min-h-60 h-fit shadow-card rounded-lg p-4 flex flex-col justify-center gap-2">
       <div className='flex justify-between '>
        <h4 className='text-xl'>Add Task</h4>
        <button className="w-fit" onClick={()=>setModel(false)}>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
       </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task
            </label>
            <input
              type="text"
              name="title"
              id="titel"
              placeholder="Task Title"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>

            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTask