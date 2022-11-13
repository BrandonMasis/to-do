import { allTasks } from "./storage";
import { startOfWeek, endOfWeek, isToday } from "date-fns";

const today = new Date();
function comparePriority(a, b) {
  if (a.priority < b.priority) {
    return -1;
  }
  if (a.priority > b.priority) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

function filterTasksByProject(query) {
  return allTasks.filter((task) => task.project == query).sort(comparePriority);
}

function filterToday() {
  return allTasks.filter((task) => isToday(task.dueDate)).sort(comparePriority);
}

function filterWeekly() {
  return allTasks
    .filter(
      (task) =>
        task.dueDate >= startOfWeek(today) && task.dueDate <= endOfWeek(today)
    )
    .sort(comparePriority);
}

function filterCheckedSubtasks(task) {
  return task.subtasks.filter((subtask) => subtask.isChecked == true).length;
}

function filterCategory(list, category) {
  return list.filter(
    (task) => task.category == `${category.getAttribute("data-category")}`
  );
}

function filterOverdue() {
  return allTasks.filter((task) => task.dueDate < today);
}

export {
  filterToday,
  filterWeekly,
  filterTasksByProject,
  filterCheckedSubtasks,
  filterCategory,
  filterOverdue,
};
