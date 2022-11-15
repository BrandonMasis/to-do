import { getDate, parseISO } from "date-fns";
import { filterCheckedSubtasks } from "./filters.js";
import { allTasks } from "./storage.js";

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

function generateToday() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `
    <div class="section-title"><h2>Overdue</h2></div>

    <div id="overdue-tasks" class="big-container"></div>
      
    <div class="section-title date-heading">
      <h2>Today</h2>
      <h4 id="actual-day">If you are reading, this something went wrong</h4>
    </div>
    <div id="today-tasks" class="big-container">
     
    </div>

    `;
}

function generateWeekly() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title date-heading">
  <h2>Weekly</h2>
  <h4 id="actual-week">If you are reading, this something went wrong</h4>
  </div>
  <div id="weekly-tasks" class="big-container">
  

  </div>
  </div>`;
}

function isChecked(task) {
  if (task.isChecked) {
    return "checked";
  } else {
    return "";
  }
}

function isMarked(task) {
  if (task.isChecked) {
    return "marked-task";
  } else {
    return "";
  }
}

function hasDate(dueDate) {
  if (dueDate != null) {
    return `${monthNames[parseISO(dueDate).getMonth()]} ${getDate(
      parseISO(dueDate)
    )}`;
  } else {
    return "Any day";
  }
}

function generateProject(project, actualProject) {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title project-heading">
  <div class="square" style=background-color:${actualProject.color}></div>
  <h2>${actualProject.name}</h2>
  </div>`;

  container.innerHTML += `
  
  <div id="no-category" class="big-container"></div>
`;

  if (actualProject.categories.length == 0) {
    document.querySelector(
      "#no-category"
    ).innerHTML += `<div class="task-container">
    <div class="new-task">+</div>
    </div>
    </div>`;
  }

  for (let i = 0; i < actualProject.categories.length; i++) {
    container.innerHTML += `<div class="subtitle"><h3>${actualProject.categories[i]}</h3></div>
    <div data-project="${actualProject.name}" data-category="${actualProject.categories[i]}" class="big-container category">`;
  }

  //Gotta work on this
  container.innerHTML += `<div class="subtitle new-subtitle">
<div>
<input type="text" id="new-subtitle-btn" placeholder="Add a subtitle +" maxlength="50"/><i class="fa-solid fa-check"></i>
</div>
<div class="subtitle-character-count">
<h4><span class="actual-count">0</span>/<span class="max-count">50</span></h4>
</div>
</div>`;
}

function generateTaskHtml(container, task, subtaskHtml) {
  container.innerHTML += `
  <div class="task-container">
  <div class="task" data-task-id="${task.id}">
    <div>
      <div class="task-check">
        <div class="round checkp${task.priority}">
          <input type="checkbox" class="checkbox" ${isChecked(task)}  />
          <label class="task-label"></label>
        </div>
      </div>
      <div class="task-content">
        <div class="task-title ${isMarked(task)}">${task.title}</div>
        <div class="task-info">
          <div>
            <div class="task-duedate">${hasDate(task.dueDate)}</div>
            <div>
              <div class="progress-container">
              <div class="progress-bar" style="width:${
                (100 / task.subtasks.length) * filterCheckedSubtasks(task)
              }%;"></div>
                <progress></progress>
              </div>
              <div class="progress-subtask">${filterCheckedSubtasks(task)}/${
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

function generateSubtaskHtml(task) {
  let html = "";

  if (task.subtasks != undefined) {
    task.subtasks.forEach((subtask) => {
      html += `
    <div class="subtask" data-subtask-id="${subtask.id}">
    <div class="task-check">
      <div class="round checkp4">
        <input type="checkbox" ${isChecked(
          subtask
        )} class="checkbox" data-task-id="${task.id}"/>
        <label class="subtask-label"></label>
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

export {
  generateToday,
  generateWeekly,
  generateProject,
  generateTaskHtml,
  generateSubtaskHtml,
  monthNames,
};
