let allProjects = [];
let allTasks = [];

if (localStorage.getItem("all-tasks") == null) {
  allTasks = [];
} else {
  allTasks = JSON.parse(localStorage.getItem("all-tasks"));
}

if (localStorage.getItem("all-projects") == null) {
  allProjects = [];
} else {
  allProjects = JSON.parse(localStorage.getItem("all-projects"));
}

export { allProjects, allTasks };
