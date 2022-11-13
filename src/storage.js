const allTasks = [
  {
    title: "Do laundry",
    description: "Wash, dry, and fold clothes",
    dueDate: new Date("2022-10-2"),
    priority: 1,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: true,

    project: "Study chess",
    category: "Piece development",
  },
  {
    title: "Do laundry on nov3",
    description: "Wash, dry, and fold clothes",
    dueDate: new Date("2022-10-2"),
    priority: 2,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: true },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: false,
    project: "Study chess",
    category: "Piece development",
  },

  {
    title: "Noviembre 6 test",
    description: "Wash, dry, and fold clothes",
    dueDate: new Date("2022-11-12"),
    priority: 4,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: true },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: false,
    project: "Study chess",
    category: "Piece development",
  },
  {
    title: "Clean your room, itsumo today",
    description: "get real",
    dueDate: new Date(),
    priority: 4,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: true },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: false,
    project: "Household chores",
    category: "Development",
  },
  {
    title: "Clean your room, itsumo today",
    description: "get real",
    dueDate: new Date(),
    priority: 4,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: true },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: false,
    project: "Household chores",
    category: "Development",
  },
  {
    title: "Clean your room, itsumo today",
    description: "get real",
    dueDate: new Date(),
    priority: 4,
    subtasks: [
      { title: "Wash clothes", isChecked: true },
      { title: "Dry clothes", isChecked: false },
      { title: "Fold clothes", isChecked: true },
      { title: "Wash clothes", isChecked: false },
      { title: "Dry clothes", isChecked: true },
      { title: "Fold clothes", isChecked: true },
    ],
    isChecked: false,
    project: "Household chores",
    category: "Development",
  },
];

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

export { allTasks, allProjects };
