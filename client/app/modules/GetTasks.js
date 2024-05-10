export default async function getTasks(_key) {
    const response = await fetch("http://localhost:4000/api/get-tasks", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({_key:_key}),
    });
    
    if (response.ok) {
        const tasks = await response.json();
        console.log("Tasks:", tasks);
        return tasks;
    } else {
        console.error("Failed to get tasks");
    }
}