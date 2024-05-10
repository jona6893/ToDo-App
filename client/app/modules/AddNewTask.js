export default async function addNewTask(task) {
  const response = await fetch("http://localhost:4000/api/add-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const newTask = await response.json();
    console.log("New Task:", newTask);
  } else {
    console.error("Failed to create new task");
  }
}
