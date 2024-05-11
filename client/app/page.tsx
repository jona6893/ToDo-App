"use client";
import React from "react";
import Header from "./components/Header";
import TaskView from "./components/TaskView";
import { checkSession } from "./modules/GetUserData";
import { useState } from "react";
export default function Home() {
  const [user, setUser] = React.useState<null | string>(null);

  return (
    <main className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-slate-700">
      <section className="flex flex-col">
        <Header setUser={setUser} user={user} />
        <TaskView setUser={setUser} user={user} />
      </section>
    </main>
  );
}
