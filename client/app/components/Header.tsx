"use client";
import React, { useEffect } from "react";
import { checkSession, getUserData } from "../modules/GetUserData";
import NewTask from "./NewTask";
import userStore from "../store/userStore";
import Logout from "./Logout";

function Header(/* {setUser, user}:Props */) {
  const { user, setUser } = userStore();
  const [model, setModel] = React.useState<boolean>(false);
/*   useEffect(() => {
    const fetchData = async () => {
      const checkUser = await checkSession();
      const user = checkUser.user;
      if (checkUser.user) {
        //console.log(checkUser.user);
        const getUser = await getUserData(user);
        setUser(getUser);
      } else {
        window.location.replace("/sign-in");
      }
    };

    fetchData();
  }, []); */
  //console.log(user)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4 max-md:p-2">
        <div className="dark:text-gray-200 flex md:flex-row-reverse max-md:flex-col md:items-center gap-2">
          <Logout />
        </div>
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
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
      <p className="text-sm w-full flex justify-center">
        {user?.email ? `Welcome: ${user.email}` : "username"}
      </p>
    </nav>
  );
}

export default Header;
