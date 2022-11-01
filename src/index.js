import { generateToday, generateWeekly, generateProject } from "./content.js";
import { startOfWeek, endOfWeek, getDate, getMonth, getDay } from "date-fns";

const todayOption = document.querySelector("#today-option");
const weeklyOption = document.querySelector("#weekly-option");

const newTaskBtnHtml = `<div class="task-container">
<div class="new-task">+</div>
</div>
</div>`;

const today = new Date();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const allTasks = [
  {
    title: "Do laundry",
    description: "Wash, dry, and fold clothes",
    dueDate: new Date(),
    priority: 2,
    subtasks: [
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: false },
    ],
    isChecked: false,
    project: "Study chess",
    category: "Piece development",
  },
  {
    title: "Do laundry",
    description: "Wash, dry, and fold clothes",
    dueDate: new Date("2021-03-06"),
    priority: 2,
    subtasks: [
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: false },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: false },
    ],
    isChecked: false,
    project: "Study chess",
    category: "Piece development",
  },
];

//Total() must be a function of the obj prototype
const allProjects = [
  {
    name: "Household chores",
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

function filterTasksByProject(query) {
  return allTasks.filter((task) => task.project == query).sort(compareFn);
}

function filterToday() {
  return allTasks.filter((task) => +task.dueDate == +today).sort(compareFn);
}

function filterCategory(list, category) {
  return list.filter(
    (task) => task.category == `${category.getAttribute("data-category")}`
  );
}

function generateTaskHtml(container, task, subtaskHtml) {
  container.innerHTML += `
  <div class="task-container">
  <div class="task">
    <div>
      <div class="task-check">
        <div class="round checkp1">
          <input type="checkbox" checked id="checkbox" />
          <label for="checkbox"></label>
        </div>
      </div>
      <div class="task-content">
        <div class="task-title">${task.title}</div>
        <div class="task-info">
          <div>
            <div class="task-duedate">${
              monthNames[task.dueDate.getMonth()]
            } ${getDate(task.dueDate)}</div>
            <div>
              <div class="progress-container">
                <progress value="75" max="100">75%</progress>
              </div>
              <div class="progress-subtask">${"?"}/${
    task.subtasks.length
  } Subtasks</div>
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
}
menuProjects();

function filterOverdue() {
  return allTasks.filter((task) => task.dueDate < today);
}

function generateSubtaskHtml(task) {
  let html = "";

  if (task.subtasks != undefined) {
    task.subtasks.forEach((subtask) => {
      html += `
    <div class="subtask">
    <div class="task-check">
      <div class="round checkp3">
        <input type="checkbox" checked id="checkbox" />
        <label for="checkbox"></label>
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

function displayWeeklyTasks() {
  const weeklyTasks = document.querySelector("#weekly-tasks");
  const actualWeek = document.querySelector("#actual-week");
  actualWeek.textContent = `${
    monthNames[startOfWeek(new Date()).getMonth()]
  } ${startOfWeek(new Date()).getDate()} to ${
    monthNames[endOfWeek(new Date()).getMonth()]
  } ${endOfWeek(new Date()).getDate()}`;

  filterTasksByProject("$overdue").forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);
    generateTaskHtml(weeklyTasks, task, subtaskHtml);
  });

  weeklyTasks.innerHTML += newTaskBtnHtml;
}

function displayTodayTasks() {
  const todayTasks = document.querySelector("#today-tasks");
  const overdueTasks = document.querySelector("#overdue-tasks");

  filterToday().forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);

    generateTaskHtml(todayTasks, task, subtaskHtml);
  });

  todayTasks.innerHTML += newTaskBtnHtml;

  filterOverdue().forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);
    generateTaskHtml(overdueTasks, task, subtaskHtml);
  });

  overdueTasks.innerHTML += newTaskBtnHtml;
}

function displayCategorieTasks(actualProject) {
  let projectTasks = filterTasksByProject(actualProject.name);

  const categories = document.querySelectorAll(".big-container");

  categories.forEach((category) => {
    let categoryTasks = filterCategory(projectTasks, category);

    categoryTasks.forEach((item) => {
      let subtaskHtml = generateSubtaskHtml(item);
      generateTaskHtml(category, item, subtaskHtml);
    });

    category.innerHTML += newTaskBtnHtml;
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

  newTaskBtn.forEach((btn) => btn.addEventListener("click", () => {}));
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
