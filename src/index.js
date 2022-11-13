import {
  generateToday,
  generateWeekly,
  generateProject,
  generateTaskHtml,
  generateSubtaskHtml,
  monthNames,
} from "./content.js";

import { startOfWeek, endOfWeek } from "date-fns";

import {
  filterToday,
  filterWeekly,
  filterTasksByProject,
  filterCheckedSubtasks,
  filterCategory,
  filterOverdue,
} from "./filters.js";

import { allTasks, allProjects } from "./storage";

const todayOption = document.querySelector("#today-option");
const weeklyOption = document.querySelector("#weekly-option");

const newTaskBtnHtml = `<div class="task-container">
<div class="new-task">+</div>
</div>
</div>`;

//
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

//

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

//
function assignId() {
  let taskId = -1;
  allTasks.forEach((task) => {
    let subtaskId = -1;

    taskId += 1;
    task.id = taskId;

    task.subtasks.forEach((subtask) => {
      subtaskId += 1;

      subtask.id = subtaskId;
    });
  });
}

//

function showActualWeek() {
  const actualWeek = document.querySelector("#actual-week");
  actualWeek.textContent = `${
    monthNames[startOfWeek(new Date()).getMonth()]
  } ${startOfWeek(new Date()).getDate()} to ${
    monthNames[endOfWeek(new Date()).getMonth()]
  } ${endOfWeek(new Date()).getDate()}`;
}

function displayWeeklyTasks() {
  const weeklyTasks = document.querySelector("#weekly-tasks");

  filterWeekly().forEach((task) => {
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

function showTotalTasks() {
  const todayTotal = document.querySelector("#today-option .optionTotal");
  const weeklyTotal = document.querySelector("#weekly-option .optionTotal");

  todayTotal.textContent = `${filterToday().length}`;
  weeklyTotal.textContent = `${filterToday().length}`;
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

  checkOnClick();
}

todayOption.addEventListener("click", () => {
  generateToday();
  displayTodayTasks();
  assignDropSubtasks();
  assignNewTaskFunction();
  checkOnClick();
});

weeklyOption.addEventListener("click", () => {
  generateWeekly();
  displayWeeklyTasks();
  showActualWeek();
  assignDropSubtasks();
  assignNewTaskFunction();
  checkOnClick();
});

function checkOnClick() {
  const taskLabels = document.querySelectorAll(".task-label");
  const subtaskLabels = document.querySelectorAll(".subtask-label");

  taskLabels.forEach((label) => {
    label.addEventListener("click", () => {
      const actualCheckbox = label.parentElement.querySelector(".checkbox");
      let taskId = parseInt(actualCheckbox.getAttribute("data-task-id"));

      if (allTasks[taskId].isChecked == true) {
        actualCheckbox.checked = false;
        allTasks[taskId].isChecked = false;
      } else {
        actualCheckbox.checked = true;
        allTasks[taskId].isChecked = true;
      }
    });
  });

  subtaskLabels.forEach((label) => {
    label.addEventListener("click", () => {
      const actualCheckbox = label.parentElement.querySelector(".checkbox");
      let taskId = parseInt(actualCheckbox.getAttribute("data-task-id"));
      let subtaskId = parseInt(actualCheckbox.getAttribute("data-subtask-id"));

      if (allTasks[taskId].subtasks[subtaskId].isChecked == true) {
        actualCheckbox.checked = false;

        allTasks[taskId].subtasks[subtaskId].isChecked = false;
      } else {
        actualCheckbox.checked = true;

        allTasks[taskId].subtasks[subtaskId].isChecked = true;
      }

      let progressText =
        actualCheckbox.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".progress-subtask"
        );

      let progressBar =
        actualCheckbox.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".progress-bar"
        );

      progressText.textContent = `${filterCheckedSubtasks(allTasks[taskId])}/${
        allTasks[taskId].subtasks.length
      } Subtasks`;

      progressBar.style.width = `${
        (100 / allTasks[taskId].subtasks.length) *
        filterCheckedSubtasks(allTasks[taskId])
      }%`;
    });
  });
}

function assignDropSubtasks() {
  const dropSubtasks = document.querySelectorAll(".dropSubtasks");

  dropSubtasks.forEach((drop) => {
    drop.parentElement.addEventListener("click", (e) => {
      let task = drop.parentElement.parentElement.parentElement.parentElement;

      if (task.classList.contains("task-open")) {
        task.classList.remove("task-open");
        drop.style.cssText = "transform: rotate(0deg)";
      } else {
        task.classList.add("task-open");

        drop.style.cssText = "transform: rotate(180deg)";
      }
    });
  });
}

function assignNewTaskFunction() {
  const newTaskBtn = document.querySelectorAll(".new-task");
  newTaskBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      // Open the menu and let's you create a new obj
    })
  );
}

//Function calls when you open the app

assignId();
menuProjects();
showTotalTasks();

// function test() {
//   console.log("working");
//   document.querySelectorAll(".progress-test").forEach((item) => {
//     item.addEventListener("click", () => {
//       item.style.width = "70%";
//       console.log("done");
//     });
//   });
// }

// I'm showing the correct amount of tasks when displayed, but not on change
//So probably just make a function that takes care of that, and remove
