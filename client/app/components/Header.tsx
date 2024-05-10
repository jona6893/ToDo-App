"use client";
import React, { useEffect } from "react";
import { checkSession, getUserData } from "../modules/GetUserData";
import NewTask from "./NewTask";
import { userStore } from "../store/userStore";

/* interface Props {
  setUser: React.Dispatch<React.SetStateAction<null | string>>;
  user: { email: string; _key: string; name: string };
} */

function Header(/* {setUser, user}:Props */) {
const {user, setUser} = userStore()
const [model, setModel] = React.useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const checkUser = await checkSession();
      const user = checkUser.user;
      if (checkUser.user) {
        console.log(checkUser.user);
       const getUser = await getUserData(user);
       setUser(getUser);
      } else {
        window.location.replace("/sign-in");
      }
    };

    fetchData();
  }, []);
  console.log(user)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <ul className="flex flex-col">
            <li>{user?.email ? `Welcome: ${user.email}` : "username"}</li>
            <li className="bg-red-500 w-fit rounded-md text-white px-2 py-1">
              Logout
            </li>
          </ul>
        </div>
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ToDo App
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={() => setModel(true)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New Task
          </button>
        </div>
        {model && <NewTask setModel={setModel} user={user} />}
      </div>
    </nav>
  );
}

export default Header;
