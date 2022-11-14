import {
  generateToday,
  generateWeekly,
  generateProject,
  generateTaskHtml,
  generateSubtaskHtml,
  monthNames,
} from "./content.js";

import { startOfWeek, endOfWeek, toDate } from "date-fns";

import {
  filterToday,
  filterWeekly,
  filterTasksByProject,
  filterCheckedSubtasks,
  filterCategory,
  filterOverdue,
  filterNoCategory,
} from "./filters.js";

import { allTasks, allProjects } from "./storage";

const newTaskBtnHtml = `<div class="task-container">
<div class="new-task">+</div>
</div>
</div>`;

const newTaskFormHtml = `<div class="form">
<div class="top">
  <input type="text" id="taskform-name"
    placeholder="Task name">
  <input type="text" id="taskform-description"
    placeholder="Description">
</div>
<div class="bottom">
  <input type="date" id="taskform-duedate"
    placeholder="Due date">
  <div id="taskform-priority"><i class="fa-solid fa-flag"></i><div class="priority-option" data-priority="1"></div><div class="priority-option" data-priority="2"></div><div class="priority-option" data-priority="3"></div><div class="priority-option" data-priority="4"></div></div>
</div>
</div>
<div class="form-btns">
<div id="taskform-cancel-btn">Cancel</div>
<div id="taskform-add-btn">Add Task</div>

</div>`;

const priorityColors = ["#F95050", "#F9AB50", "#9BB5F9", "#4C4D5C"];

const todayOption = document.querySelector("#today-option");
const weeklyOption = document.querySelector("#weekly-option");
const projectsContainer = document.querySelector("#projects-container");

let actualTab = "today-option";
let actualProject = [];

const taskFactory = (
  title,
  description,
  dueDate,
  priority,
  subtasks,
  isChecked,
  project,
  category
) => {
  return {
    title,
    description,
    dueDate,
    priority,
    subtasks,
    isChecked,
    project,
    category,
  };
};

const subtaskFactory = (title, isChecked) => {
  return {
    title,
    isChecked,
  };
};

const projectFactory = (name, color, categories) => {
  const total = () => {
    return allTasks.filter((task) => task.project == `${name}`).length;
  };

  return { name, color, categories, total };
};

//Displays in the menu, the project name, color, and total tasks.

function showProjectsOnMenu() {
  projectsContainer.innerHTML = "";
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
}

function projectOptionEvent() {
  const projectOptions = document.querySelectorAll(".project");

  projectOptions.forEach((option) => {
    option.addEventListener("click", () => {
      actualProject = allProjects.filter(
        (item) => item.name == `${option.getAttribute("data-project")}`
      )[0];

      actualTab = `${option.getAttribute("data-project")}`;
      actualProject = actualProject;

      display(actualTab, actualProject);
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

function showActualDay() {
  const actualDay = document.querySelector("#actual-day");
  actualDay.textContent = `${
    monthNames[startOfWeek(new Date()).getMonth()]
  } ${new Date().getDate()}`;
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
}

function showTotalTasks() {
  const todayTotal = document.querySelector("#today-option .optionTotal");
  const weeklyTotal = document.querySelector("#weekly-option .optionTotal");

  todayTotal.textContent = `${filterToday().length}`;
  weeklyTotal.textContent = `${filterWeekly().length}`;
}

function displayCategorieTasks(actualProject) {
  let projectTasks = filterTasksByProject(actualProject.name);

  const categories = document.querySelectorAll(".big-container.category");
  const noCategoryContainer = document.querySelector("#no-category");

  let noCategoryTasks = filterNoCategory(projectTasks);

  noCategoryTasks.forEach((item) => {
    let subtaskHtml = generateSubtaskHtml(item);
    generateTaskHtml(noCategoryContainer, item, subtaskHtml);
  });

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
  actualTab = "today-option";
  display(actualTab, actualProject);
});

weeklyOption.addEventListener("click", () => {
  actualTab = "weekly-option";
  display(actualTab, actualProject);
});

function checkOnClick() {
  const taskLabels = document.querySelectorAll(".task-label");
  const subtaskLabels = document.querySelectorAll(".subtask-label");

  taskLabels.forEach((label) => {
    label.addEventListener("click", () => {
      const actualCheckbox = label.parentElement.querySelector(".checkbox");
      let actualTask =
        actualCheckbox.parentElement.parentElement.parentElement.parentElement;

      let taskId = parseInt(actualTask.getAttribute("data-task-id"));

      if (allTasks[taskId].isChecked == true) {
        actualCheckbox.checked = false;
        allTasks[taskId].isChecked = false;

        actualTask.querySelector(".task-title").classList.remove("marked-task");
      } else {
        actualCheckbox.checked = true;
        allTasks[taskId].isChecked = true;

        actualTask.querySelector(".task-title").classList.add("marked-task");
      }
    });
  });

  subtaskLabels.forEach((label) => {
    label.addEventListener("click", () => {
      const actualCheckbox = label.parentElement.querySelector(".checkbox");
      let taskId = parseInt(actualCheckbox.getAttribute("data-task-id"));
      let subtaskId = parseInt(
        actualCheckbox.parentElement.parentElement.parentElement.getAttribute(
          "data-subtask-id"
        )
      );

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
      if (btn.classList.contains("new-task-form") == false) {
        btn.classList.add("new-task-form");

        // Select priority and store the option
        let taskPriority = 4;

        document.querySelector(".new-task-form").innerHTML = newTaskFormHtml;
        document.querySelectorAll(".priority-option").forEach((option) => {
          option.addEventListener("click", () => {
            taskPriority = option.getAttribute("data-priority");

            document.querySelector(".fa-flag").style.color =
              priorityColors[taskPriority - 1];
            option.parentElement.classList.remove("open");
          });
        });

        document
          .querySelector(".new-task-form")
          .addEventListener("click", (e) => {
            if (
              e.target.classList.contains("priority-option") == false &&
              document
                .querySelector("#taskform-priority")
                .classList.contains("open") &&
              e.target.classList.contains("fa-flag") == false
            ) {
              document
                .querySelector("#taskform-priority")
                .classList.remove("open");
            }
          });

        document
          .querySelector("#taskform-priority")
          .addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-flag")) {
              e.target.parentElement.classList.add("open");
            }
          });

        document
          .querySelector("#taskform-add-btn")
          .addEventListener("click", (e) => {
            let taskName = document.querySelector("#taskform-name").value;
            let taskDescription = document.querySelector(
              "#taskform-description"
            ).value;
            let duedateSplit = document
              .querySelector("#taskform-duedate")
              .value.split("-");

            let taskDuedate = duedateSplit.join(",");

            if (actualTab == "today-option") {
              allTasks.push(
                taskFactory(
                  taskName,
                  taskDescription,
                  new Date(taskDuedate),
                  taskPriority,
                  [],
                  false,
                  undefined,
                  undefined
                )
              );
            } else if (actualTab == "weekly-option") {
              allTasks.push(
                taskFactory(
                  taskName,
                  taskDescription,
                  new Date(taskDuedate),
                  new taskPriority(),
                  [],
                  false,
                  undefined,
                  undefined
                )
              );
            } else {
              allTasks.push(
                taskFactory(
                  taskName,
                  taskDescription,
                  new Date(taskDuedate),
                  taskPriority,
                  [],
                  false,
                  actualTab,
                  e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
                    "data-category"
                  )
                )
              );
            }

            assignId();
            display(actualTab, actualProject);
          });
      } else {
        return;
      }
    })
  );
}

function assignNewSubtaskFunction() {
  const newSubtaskBtn = document.querySelectorAll(".new-subtask");
  newSubtaskBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      let a = prompt("title");
      let b = false;
      let taskIndex = btn.parentElement
        .querySelector(".task")
        .getAttribute("data-task-id");

      allTasks[taskIndex].subtasks.push(subtaskFactory(a, b));
      assignId();
      display(actualTab, actualProject);

      // Opens the container, so you see the subtask being added
      document
        .querySelector(`[data-task-id="${taskIndex}"]`)
        .parentElement.classList.add("task-open");

      console.log(allTasks);
    })
  );
}

//Function calls when you open the app

assignId();

showProjectsOnMenu();
projectOptionEvent();
showTotalTasks();

display(actualTab, actualProject);

// I'm showing the correct amount of tasks when displayed, but not on change
//So probably just make a function that takes care of that, and remove

function assignDeleteTask() {
  const deleteTaskBtns = document.querySelectorAll(
    ".task-options div:nth-child(1)"
  );
  deleteTaskBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      allTasks.splice(
        btn.parentElement.parentElement.getAttribute("data-task-id"),
        1
      );

      assignId();
      display(actualTab, actualProject);
      showTotalTasks();
    });
  });
}

function display(actualTab, actualProject) {
  if (actualTab == "today-option") {
    generateToday();
    displayTodayTasks();
    showActualDay();
  } else if (actualTab == "weekly-option") {
    generateWeekly();
    displayWeeklyTasks();
    showActualWeek();
  } else {
    generateProject(
      allTasks.filter((task) => task.project == actualTab),
      actualProject
    );

    displayCategorieTasks(actualProject);
    assignNewSubtitleFunction();
  }

  assignDropSubtasks();
  assignNewTaskFunction();
  assignNewSubtaskFunction();
  checkOnClick();
  assignDeleteTask();
}

const addProjectBtn = document.querySelector("#add-projects");

addProjectBtn.addEventListener("click", () => {
  let a = prompt("Project name");
  let b = prompt("hex color");

  allProjects.push(projectFactory(a, b, []));

  showProjectsOnMenu();
  projectOptionEvent();
});

function assignNewSubtitleFunction() {
  let newSubtitleContainer = document.querySelector(".new-subtitle");
  let newSubtitleBtn = document.querySelector("#new-subtitle-btn");
  let newSubtitleCharacters = document.querySelector(
    ".new-subtitle .actual-count"
  );
  let newSubtitleCheck = newSubtitleContainer.querySelector("i");

  newSubtitleBtn.addEventListener("click", () => {
    newSubtitleContainer.classList.add("new-subtitle-open");
  });

  newSubtitleBtn.addEventListener("input", () => {
    newSubtitleCharacters.textContent = newSubtitleBtn.value.length;
  });

  //
  newSubtitleCheck.addEventListener("click", () => {
    actualProject.categories.push(
      document.querySelector("#new-subtitle-btn").value
    );

    display(actualTab, actualProject);
  });
}

// So do it with classes intead of focus, when you click de window, if the thing still has the class on, remove it.

window.addEventListener("click", (e) => {
  if (document.querySelector(".new-subtitle-open") != null) {
    if (e.target.classList.contains("fa-check")) {
      return;
    } else if (e.target.id == "new-subtitle-btn") {
      return;
    } else {
      document.querySelector("#new-subtitle-btn").value = "";

      document.querySelector(".actual-count").textContent = "0";

      document
        .querySelector(".new-subtitle-open")
        .classList.remove("new-subtitle-open");
    }
  }
});
