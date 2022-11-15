import { startOfWeek, endOfWeek, isToday, parseISO } from "date-fns";
import { allTasks } from "./storage";

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
  return allTasks
    .filter((task) => isToday(parseISO(task.dueDate)) || task.dueDate == null)
    .sort(comparePriority);
}

function filterWeekly() {
  return allTasks
    .filter(
      (task) =>
        (parseISO(task.dueDate) >= startOfWeek(today) &&
          parseISO(task.dueDate) <= endOfWeek(today)) ||
        parseISO(task.dueDate) == null
    )
    .sort(comparePriority);
}

function filterCheckedSubtasks(task) {
  return task.subtasks.filter((subtask) => subtask.isChecked == true).length;
}

function filterNoCategory(list) {
  return list.filter((task) => task.category == null);
}

function filterCategory(list, category) {
  return list.filter(
    (task) => task.category == `${category.getAttribute("data-category")}`
  );
}

function filterOverdue() {
  return allTasks.filter(
    (task) =>
      parseISO(task.dueDate) < today &&
      task.isChecked == false &&
      parseISO(task.dueDate) != null &&
      isToday(parseISO(task.dueDate)) == false
  );
}

export {
  filterToday,
  filterWeekly,
  filterTasksByProject,
  filterCheckedSubtasks,
  filterCategory,
  filterOverdue,
  filterNoCategory,
};
