export default async function UpdateTaskAPI(update) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}update-task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  });

  if (response.ok) {
    const newUpdate = await response.json();
    console.log("Task Updated:", newUpdate);
    return { status: true, task: newUpdate };
  } else {
    console.error("Failed to update task");
  }
}
