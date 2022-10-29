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

const allTasks = [];

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

// const newSubtitle = document.querySelectorAll(".new-subtitle");

// newSubtitle.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     btn.setAttribute("contenteditable", true);
//   });
// });
