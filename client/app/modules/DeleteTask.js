export default async function DeleteTaskAPI(_key) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}delete-task`, {
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
