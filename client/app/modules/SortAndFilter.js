function sortTasks(option, order = "asc", tasks) {
  let sortedTasks = [...tasks]; // Create a copy of tasks to avoid mutating the original array

  sortedTasks.sort((a, b) => {
    if (option === "status") {
      const statusValues = {
        "todo": 1,
        "in progress": 2,
        "done": 3,
      };

      return order === "asc"
        ? statusValues[a[option]] - statusValues[b[option]]
        : statusValues[b[option]] - statusValues[a[option]];
    } else if (option === "created_at") {
      const dateA = new Date(a[option]);
      const dateB = new Date(b[option]);

      return order === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return order === "asc" ? a[option] - b[option] : b[option] - a[option];
    }
  });

  return(sortedTasks);
}

function tabTasks(curTab, tasks) {
  if (curTab === "All") {
    let sortedTask = [];
    sortedTask = tasks.sort((a, b) => b.created_at - a.created_at);
    return sortedTask;
  } else {
    let newFilter = [];
    newFilter = tasks.filter((task) => task.status === curTab);
    let filtereNsorted = newFilter.sort((a, b) => b.created_at - a.created_at);
    return filtereNsorted;
  }
}

module.exports = {
  sortTasks,
  tabTasks,
};
