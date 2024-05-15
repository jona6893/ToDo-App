export default async function addNewTask(task) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}add-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const newTask = await response.json();
    console.log("New Task:", newTask);
    return { status: true, newTask };
  } else {
    console.error("Failed to create new task");
  }
}
