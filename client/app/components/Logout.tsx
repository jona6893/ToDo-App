"use client";
import React from "react";
import LogoutUser from "../modules/LogoutUser";

function Logout() {
  async function handleLogout() {
    console.log("logout");
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}end-session`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.status === 200) {
      setTimeout(() => {
        window.location.replace("/sign-in");
      }, 500);
    }
  }

  return (
    <p
      onClick={handleLogout}
      className="bg-red-500 w-fit rounded-md text-white px-2 py-1 cursor-pointer"
    >
      Logout
    </p>
  );
}

export default Logout;
