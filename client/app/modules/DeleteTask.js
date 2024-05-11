export default async function DeleteTaskAPI(_key) {
  const response = await fetch("http://localhost:4000/api/delete-task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _key: _key }),
  });

  if (response.ok) {
    const newTask = await response.json();
    console.log("Task Deleted:", newTask);
    return true;
  } else {
    console.error("Failed to delete task");
  }
}
