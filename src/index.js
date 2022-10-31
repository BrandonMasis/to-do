import { generateToday, generateWeekly, generateProject } from "./content.js";

const todayOption = document.querySelector("#today-option");
const weeklyOption = document.querySelector("#weekly-option");

const allTasks = [
  {
    title: "buy bread long time ago",
    description: "Get the 2 x 1 offer",
    dueDate: new Date("2013-05-23"),
    priority: 2,
    subtasks: [
      { title: "cut the read", isChecked: false },
      { title: "eat the read", isChecked: true },
    ],
    isChecked: false,
    project: "$overdue",
    category: "introduction",
  },
  {
    title: "buy bread next year",
    description: "Get the 2 x 1 offer",
    dueDate: new Date("2023-05-23"),
    priority: 1,
    subtasks: [
      { title: "cut the dread", isChecked: false },
      { title: "eat the dread", isChecked: true },
    ],
    isChecked: false,
    project: "Writting",
    category: "Introduction",
  },
  {
    title: "buy chicken today",
    description: "Get the 2 x 1 offer",
    dueDate: new Date("2022-10-30"),
    priority: 1,
    subtasks: [
      { title: "cut the breeeeeeeead", isChecked: false },
      { title: "eat the brdeaaaaaaaaaaaaaaad", isChecked: true },
    ],
    isChecked: false,
    project: "Writting",
    category: "Development",
  },
  {
    title: "buy spoons",
    description: "Get the 2 x 1 offer",
    dueDate: "October 25",
    priority: 3,
    subtasks: [
      { title: "cut the bread", isChecked: false },
      { title: "eat the bread", isChecked: true },
    ],
    isChecked: true,
    project: "Writting",
    category: "Conclusion",
  },
  {
    title: "buy books",
    description: "Get the 2 x 1 offer",
    dueDate: "Writting",
    priority: 3,
    subtasks: [
      { title: "cut the bread", isChecked: false },
      { title: "eat the bread", isChecked: true },
    ],
    isChecked: false,
    project: "learning",
  },
];

const allProjects = [
  {
    name: "Writting",
    color: "#0f8cfa",
    total() {
      return allTasks.filter((task) => task.project == `${this.name}`).length;
    },
    categories: ["Introduction", "Development", "Conclusion"],
  },
  {
    name: "Study chess",
    color: "#FFFFFF",
    total() {
      return allTasks.filter((task) => task.project == `${this.name}`).length;
    },
    categories: ["Piece development", "Watch hikaru", "Reach 1000 elo"],
  },
];

//Displays in the menu, the project name, color, and total tasks.
function menuProjects() {
  const projectsContainer = document.querySelector("#projects-container");

  allProjects.forEach(
    (item) =>
      (projectsContainer.innerHTML += `<div class="project" data-project="${
        item.name
      }"><div><span class="project-tag" style="background-color:${
        item.color
      }"></span> <h5>${
        item.name
      }</h5></div> <div class="optionTotal">${item.total()}</div></div>`)
  );

  const projectOption = document.querySelectorAll(".project");

  projectOption.forEach((btn) => {
    btn.addEventListener("click", () => {
      let actualProject = allProjects.filter(
        (item) => item.name == `${btn.getAttribute("data-project")}`
      )[0];

      generateProject(
        allTasks.filter(
          (task) => task.project == `${btn.getAttribute("data-project")}`
        ),
        actualProject
      );

      displayCategorieTasks(actualProject);
      assignDropSubtasks();
    });
  });
}
const today = new Date("2022-10-30");
menuProjects();

function filterTasksByProject(query) {
  return allTasks.filter((task) => task.project == query).sort(compareFn);
}

function filterTaskByDate(today) {
  return allTasks.filter((task) => task.dueDate == today).sort(compareFn);
}

function filterCategory(list, category) {
  return list.filter(
    (task) => task.category == `${category.getAttribute("data-category")}`
  );
}

function filterOverdue() {
  const today = new Date("2022-10-30");
  const yesterday = new Date("2022-10-29");
  return list.filter((task) => task.dueDate < today);
}

function generateSubtaskHtml(task) {
  let html = "";

  if (task.subtasks != undefined) {
    console.log(task.subtasks);
    task.subtasks.forEach((subtask) => {
      html += `
    <div class="subtask">
    <div class="task-check">
      <div class="round checkp3">
        <input type="checkbox" checked id="checkbox3" />
        <label for="checkbox3"></label>
      </div>
    </div>
    <div class="task-content">
      <div class="task-title">
       ${subtask.title}
      </div>
    </div>
    </div>
  `;
    });
  }

  return html;
}

// task containers
function displayWeeklyTasks() {
  const weeklyTasks = document.querySelector("#weekly-tasks");

  filterTasksByProject("$overdue").forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);

    weeklyTasks.innerHTML += `
    <div class="task-container">
    <div class="task">
      <div>
        <div class="task-check">
          <div class="round checkp1">
            <input type="checkbox" checked id="checkbox1" />
            <label for="checkbox1"></label>
          </div>
        </div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-info">
            <div>
              <div class="task-duedate">${task.dueDate}</div>
              <div>
                <div class="progress-container">
                  <progress value="75" max="100">75%</progress>
                </div>
                <div class="progress-subtask">1/5 Subtasks</div>
              </div>
            </div>
            <p class="task-description">
            ${task.description}
            </p>
          </div>
        </div>
      </div>
      <div class="task-options">
        <div><i class="fa-solid fa-xmark deleteTask"></i></div>
        <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
      </div>
    </div>

    ${subtaskHtml}
    <div class="new-subtask">+</div>
    </div>`;
  });

  weeklyTasks.innerHTML += ` <div class="task-container">
    <div class="new-task">+</div>
    </div>
  </div>`;
}

function displayTodayTasks() {
  const todayTasks = document.querySelector("#today-tasks");
  const overdueTasks = document.querySelector("#overdue-tasks");

  filterTaskByDate(today).forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);

    todayTasks.innerHTML += `
    <div class="task-container">
    <div class="task">
      <div>
        <div class="task-check">
          <div class="round checkp1">
            <input type="checkbox" checked id="checkbox1" />
            <label for="checkbox1"></label>
          </div>
        </div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-info">
            <div>
              <div class="task-duedate">${task.dueDate}</div>
              <div>
                <div class="progress-container">
                  <progress value="75" max="100">75%</progress>
                </div>
                <div class="progress-subtask">1/5 Subtasks</div>
              </div>
            </div>
            <p class="task-description">
            ${task.description}
            </p>
          </div>
        </div>
      </div>
      <div class="task-options">
        <div><i class="fa-solid fa-xmark deleteTask"></i></div>
        <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
      </div>
    </div>

    ${subtaskHtml}
    <div class="new-subtask">+</div>
    </div>`;
  });

  todayTasks.innerHTML += ` <div class="task-container">
    <div class="new-task">+</div>
    </div>
  </div>`;
}

function displayCategorieTasks(actualProject) {
  let projectTasks = filterTasksByProject(actualProject.name);

  const categories = document.querySelectorAll(".big-container");

  categories.forEach((category) => {
    let categoryTasks = filterCategory(projectTasks, category);

    categoryTasks.forEach((item) => {
      category.innerHTML += ` <div class="task-container">
      <div class="task">
        <div>
          <div class="task-check">
            <div class="round checkp1">
              <input type="checkbox" checked id="checkbox1" />
              <label for="checkbox1"></label>
            </div>
          </div>
          <div class="task-content">
            <div class="task-title">${item.title}</div>
            <div class="task-info">
              <div>
                <div class="task-duedate">${item.dueDate}</div>
                <div>
                  <div class="progress-container">
                    <progress value="75" max="100">75%</progress>
                  </div>
                  <div class="progress-subtask">1/5 Subtasks</div>
                </div>
              </div>
              <p class="task-description">
              ${item.description}
              </p>
            </div>
          </div>
        </div>
        <div class="task-options">
          <div><i class="fa-solid fa-xmark deleteTask"></i></div>
          <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
        </div>
      </div>
    </div>`;
    });
  });
}

todayOption.addEventListener("click", () => {
  generateToday();
  displayTodayTasks();
  assignDropSubtasks();
  assignNewTaskFunction();
});

weeklyOption.addEventListener("click", () => {
  generateWeekly();
  displayWeeklyTasks();
  assignDropSubtasks();
  assignNewTaskFunction();
});

const taskFactory = (
  title,
  description,
  dueDate,
  priority,
  subtasks,
  isChecked
) => {
  return { title, description, dueDate, priority, subtasks, isChecked };
};

function assignDropSubtasks() {
  const dropSubtasks = document.querySelectorAll(".dropSubtasks");

  dropSubtasks.forEach((drop) => {
    drop.parentElement.addEventListener("click", (e) => {
      if (
        drop.parentElement.parentElement.parentElement.parentElement.classList.contains(
          "task-open"
        )
      ) {
        drop.parentElement.parentElement.parentElement.parentElement.classList.remove(
          "task-open"
        );
        drop.style.cssText = "transform: rotate(0deg)";
      } else {
        drop.parentElement.parentElement.parentElement.parentElement.classList.add(
          "task-open"
        );

        drop.style.cssText = "transform: rotate(180deg)";
      }
    });
  });
}

function assignNewTaskFunction() {
  const newTaskBtn = document.querySelectorAll(".new-task");

  newTaskBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      console.log(`Category = ${btn.parentElement.parentElement.id}`);
    })
  );
}

function compareFn(a, b) {
  if (a.priority < b.priority) {
    return -1;
  }
  if (a.priority > b.priority) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
