"use client"
import React from "react";
import Header from "./components/Header";
import TaskView from "./components/TaskView";
import {checkSession} from "./modules/GetUserData";
import { useState } from "react";
export default function Home() {
const [user, setUser] = React.useState<null | string>(null);

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50">
      <section className="flex flex-col max-w-lg mx-auto">

      <Header setUser={setUser} user={user} />
      <TaskView setUser={setUser} user={user} />
      </section>
    </main>
  );
}
