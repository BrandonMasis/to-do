const todayOption = document.querySelector("#today-option");
const weeklyOption = document.querySelector("#weekly-option");
const projectsContainer = document.querySelector("#projects-container");
const addProjectBtn = document.querySelector("#add-projects");
import {
  generateToday,
  generateWeekly,
  generateProject,
  generateTaskHtml,
  generateSubtaskHtml,
  monthNames,
  newTaskBtnHtml,
  newTaskFormHtml,
  projectCreatorHtml,
  priorityColors,
} from "./content.js";

import { startOfWeek, endOfWeek } from "date-fns";

import {
  filterToday,
  filterWeekly,
  filterTasksByProject,
  filterCheckedSubtasks,
  filterCategory,
  filterOverdue,
  filterNoCategory,
} from "./filters.js";

import { allProjects, allTasks } from "./storage";

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
  // const total = () => {
  //   return allTasks.filter((task) => task.project == `${name}`).length;
  // };

  return { name, color, categories };
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
      }"></span> <h5>${item.name}</h5></div> <div class="option-total">${
        allTasks.filter((task) => task.project == item.name).length
      }</div></div>`)
  );
}

function projectOptionEvent() {
  const projectOptions = document.querySelectorAll(".project");

  projectOptions.forEach((option) => {
    option.addEventListener("click", () => {
      actualTab = `${option.getAttribute("data-project")}`;

      actualProject = allProjects.filter((item) => item.name == actualTab)[0];

      display(actualTab, actualProject);
    });
  });
}

function showActualDay() {
  const actualDay = document.querySelector("#actual-day");
  actualDay.textContent = `${
    monthNames[startOfWeek(new Date()).getMonth()]
  } ${new Date().getDate()}`;
}

function showActualWeek() {
  const actualWeek = document.querySelector("#actual-week");
  actualWeek.textContent = `${
    monthNames[startOfWeek(new Date()).getMonth()]
  } ${startOfWeek(new Date()).getDate()} to ${
    monthNames[endOfWeek(new Date()).getMonth()]
  } ${endOfWeek(new Date()).getDate()}`;
}

function showTotalTasks() {
  const todayTotal = document.querySelector("#today-option .option-total");
  const weeklyTotal = document.querySelector("#weekly-option .option-total");

  todayTotal.textContent = `${filterToday().length}`;
  weeklyTotal.textContent = `${filterWeekly().length}`;
}

function displayTodayTasks() {
  const todayTasks = document.querySelector("#today-tasks");
  const overdueTasks = document.querySelector("#overdue-tasks");

  filterToday().forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);

    generateTaskHtml(todayTasks, task, subtaskHtml);
  });

  todayTasks.innerHTML += newTaskBtnHtml;

  if (filterOverdue() != "") {
    filterOverdue().forEach((task) => {
      let subtaskHtml = generateSubtaskHtml(task);
      generateTaskHtml(overdueTasks, task, subtaskHtml);
    });
  } else {
    overdueTasks.style.display = "none";
    document.querySelector(".overdue-title").style.display = "none";
  }
}

function displayWeeklyTasks() {
  const weeklyTasks = document.querySelector("#weekly-tasks");

  filterWeekly().forEach((task) => {
    let subtaskHtml = generateSubtaskHtml(task);
    generateTaskHtml(weeklyTasks, task, subtaskHtml);
  });

  weeklyTasks.innerHTML += newTaskBtnHtml;
}

function displayCategorieTasks(actualProject) {
  let projectTasks = filterTasksByProject(actualProject.name);

  const categories = document.querySelectorAll(".big-container.category");
  const noCategoryContainer = document.querySelector("#no-category");

  let noCategoryTasks = filterNoCategory(projectTasks);

  if (noCategoryTasks == []) {
    noCategoryContainer.innerHTML += newTaskBtnHtml;
  } else {
    noCategoryContainer.innerHTML = "";

    noCategoryTasks.forEach((item) => {
      let subtaskHtml = generateSubtaskHtml(item);
      generateTaskHtml(noCategoryContainer, item, subtaskHtml);
    });

    noCategoryContainer.innerHTML += newTaskBtnHtml;
  }

  categories.forEach((category) => {
    let categoryTasks = filterCategory(projectTasks, category);

    categoryTasks.forEach((item) => {
      let subtaskHtml = generateSubtaskHtml(item);
      generateTaskHtml(category, item, subtaskHtml);
    });

    category.innerHTML += newTaskBtnHtml;
  });
}

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

      localStorage.setItem("all-tasks", JSON.stringify(allTasks));
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

      // Making the task progress bar progress

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

      localStorage.setItem("all-tasks", JSON.stringify(allTasks));
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
        document.querySelectorAll(".new-task-form").forEach((item) => {
          item.classList.remove("new-task-form");
          item.innerHTML = "+";
        });

        btn.classList.add("new-task-form");
        document.querySelector(".new-task-form").innerHTML = newTaskFormHtml;

        // Select priority and store the option
        let taskPriority = 4;
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

        // If you click on the flag, 4 options with events will open, and close the flag, else
        // if you click somewhere else, it will close
        document
          .querySelector("#taskform-priority")
          .addEventListener("click", (e) => {
            if (e.target.classList.contains("fa-flag")) {
              e.target.parentElement.classList.add("open");
            }
          });

        document.querySelectorAll(".priority-option").forEach((option) => {
          option.addEventListener("click", () => {
            taskPriority = option.getAttribute("data-priority");

            document.querySelector(".fa-flag").style.color =
              priorityColors[taskPriority - 1];
            option.parentElement.classList.remove("open");
          });
        });

        // Get the values basically
        document
          .querySelector("#taskform-add-btn")
          .addEventListener("click", (e) => {
            let taskName = document.querySelector("#taskform-name").value;
            let taskDescription = document.querySelector(
              "#taskform-description"
            ).value;

            // Something weird happens with the dates, they ended up being a month behind or a day before.
            let taskDuedate = "";

            if (document.querySelector("#taskform-duedate").value == "") {
              taskDuedate = null;
            } else {
              let duedateSplit = document
                .querySelector("#taskform-duedate")
                .value.split("-");

              taskDuedate = new Date(
                parseInt(duedateSplit[0]),
                parseInt(duedateSplit[1]) - 1,
                parseInt(duedateSplit[2])
              );
            }

            if (actualTab == "today-option" || actualTab == "weekly-option") {
              allTasks.push(
                taskFactory(
                  taskName,
                  taskDescription,
                  taskDuedate,
                  taskPriority,
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
                  taskDuedate,
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
            localStorage.setItem("all-tasks", JSON.stringify(allTasks));
            display(actualTab, actualProject);
            showTotalTasks();
          });

        document
          .querySelector("#taskform-cancel-btn")
          .addEventListener("click", (e) => {
            event.stopImmediatePropagation();
            let taskBtn = e.target.parentElement.parentElement;
            taskBtn.classList.remove("new-task-form");
            taskBtn.innerHTML = "+";
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
      localStorage.setItem("all-tasks", JSON.stringify(allTasks));
      display(actualTab, actualProject);

      // Opens the container, so you see the subtask being added
      document
        .querySelector(`[data-task-id="${taskIndex}"]`)
        .parentElement.classList.add("task-open");
    })
  );
}

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
    localStorage.setItem("all-projects", JSON.stringify(allProjects));
    display(actualTab, actualProject);
  });
}

function assignDeleteTask() {
  const deleteTaskBtns = document.querySelectorAll(
    ".task-options div:nth-child(1)"
  );

  deleteTaskBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (allTasks.length > 1) {
        allTasks.splice(
          btn.parentElement.parentElement.getAttribute("data-task-id"),
          1
        );
      } else {
        allTasks = [];
      }

      localStorage.setItem("all-tasks", JSON.stringify(allTasks));

      assignId();
      display(actualTab, actualProject);
      showTotalTasks();
    });
  });
}

function assignDeleteProject() {
  const deleteProjectBtn = document.querySelector(".delete-project-btn");

  deleteProjectBtn.addEventListener("click", () => {
    allProjects.splice(allProjects.indexOf(actualProject), 1);
    localStorage.setItem("all-projects", JSON.stringify(allProjects));

    allTasks = allTasks.filter((task) => task.project != actualProject.name);
    localStorage.setItem("all-tasks", JSON.stringify(allTasks));

    showTotalTasks();
    display("today-option");
  });
}

function assignDeleteCategory() {
  const deleteCategoryBtns = document.querySelectorAll(".delete-category-btn");

  deleteCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let projectTasks = allTasks.filter(
        (task) => task.project == actualProject.name
      );

      allTasks = projectTasks.filter(
        (task) =>
          task.category != btn.previousSibling.previousSibling.textContent
      );

      actualProject.categories.splice(
        actualProject.categories.indexOf(
          btn.previousSibling.previousSibling.textContent
        ),
        1
      );

      localStorage.setItem("all-projects", JSON.stringify(allProjects));
      localStorage.setItem("all-tasks", JSON.stringify(allTasks));

      showTotalTasks();
      display(actualTab, actualProject);
    });
  });
}

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

function display(actualTab, actualProject) {
  if (localStorage.getItem("all-tasks") == null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem("all-tasks"));
  }

  // if (localStorage.getItem("all-projects") == null) {
  //   allProjects = [];
  // } else {
  //   allProjects = JSON.parse(localStorage.getItem("all-projects"));
  // }

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
    assignDeleteProject();
    assignDeleteCategory();
  }

  assignDropSubtasks();
  assignNewTaskFunction();
  assignNewSubtaskFunction();
  checkOnClick();
  assignDeleteTask();
  showProjectsOnMenu();
  projectOptionEvent();
}

addProjectBtn.addEventListener("click", () => {
  projectsContainer.innerHTML += projectCreatorHtml;

  document.querySelector("#add-new-project").addEventListener("click", () => {
    let a = document.querySelector(".new-project-name").value;
    let b = document.querySelector(".new-project-color").value;

    let count = 0;
    allProjects.forEach((project) => {
      if (project.name == document.querySelector(".new-project-name").value) {
        count += 1;
      }
    });

    if (count == 0) {
      allProjects.push(projectFactory(a, b, []));
      localStorage.setItem("all-projects", JSON.stringify(allProjects));
      showProjectsOnMenu();
      projectOptionEvent();
    } else if (document.querySelector(".warning").textContent == "") {
      document.querySelector(".warning").textContent =
        "Cannot leave this space empty";
      document.querySelector(".warning").style.display = "flex";
    } else {
      document.querySelector(".warning").style.display = "flex";
      document.querySelector(".warning").textContent =
        "Project names cannot be repeated";
    }
  });
});

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

todayOption.addEventListener("click", () => {
  actualTab = "today-option";
  display(actualTab, actualProject);
});

weeklyOption.addEventListener("click", () => {
  actualTab = "weekly-option";
  display(actualTab, actualProject);
});

//Function calls when you open the app
assignId();
showProjectsOnMenu();
projectOptionEvent();
showTotalTasks();
display(actualTab, actualProject);
