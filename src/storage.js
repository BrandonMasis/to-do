const allTasks = [
  {
    title: `Watch EGGS 101 by adam ragusea`,
    description: "Starting with the basics",
    dueDate: new Date("2022-11-10"),
    priority: 2,
    subtasks: [
      { title: "Become an omelette master", isChecked: false },
      { title: "Try using butter", isChecked: true },
    ],
    isChecked: true,

    project: "Learning to cook",
    category: "Tutorials",
  },
  {
    title: `Watch Steak 101`,
    description: "Starting with the basics",
    dueDate: new Date(2022, 12 - 1, 14),
    priority: 1,
    subtasks: [
      { title: "Cook a Sirloin", isChecked: false },
      {
        title: "Prime, grass-fed, choice... what was the difference?",
        isChecked: true,
      },
    ],
    isChecked: false,

    project: "Learning to cook",
    category: "Tutorials",
  },
  {
    title: `Spend 85$ on different cuts, and take notes about all the process, when preparing them`,
    description: "Starting with the basics",
    dueDate: new Date(2022, 1 - 1, 18),
    priority: 3,
    subtasks: [],
    isChecked: false,

    project: "Learning to cook",
    category: "Equipment",
  },
  {
    title: `Finish the contact me section`,
    description: "",
    dueDate: new Date(2022, 1 - 1, 10),
    priority: 1,
    subtasks: [],
    isChecked: false,

    project: "Portfolio",
    category: "Design",
  },
  {
    title: `Real estate site`,
    description: "",
    dueDate: new Date("2022-12-5"),
    priority: 1,
    subtasks: [],
    isChecked: false,

    project: "Portfolio",
    category: "Projects",
  },
  {
    title: `Productivity tracker`,
    description: "",
    dueDate: new Date(2021, 1, 12),
    priority: 1,
    subtasks: [],
    isChecked: true,

    project: "Portfolio",
    category: "Projects",
  },
  {
    title: `Finish the about me section`,
    description: "",
    dueDate: new Date("2022-10-5"),
    priority: 2,
    subtasks: [],
    isChecked: true,

    project: "Portfolio",
    category: "Design",
  },
  {
    title: `Exercise today`,
    description: "",
    dueDate: new Date(),
    priority: 1,
    subtasks: [],
    isChecked: false,

    project: "",
    category: "",
  },
  {
    title: `Read something`,
    description: "",
    dueDate: new Date(),
    priority: 3,
    subtasks: [],
    isChecked: false,

    project: "",
    category: "",
  },
  {
    title: `RegEx practice`,
    description: "",
    dueDate: new Date("2022-10-10"),
    priority: 1,
    subtasks: [],
    isChecked: false,

    project: "",
    category: "",
  },
  {
    title: `Check the subtasks bellow, fast`,
    description: "",
    dueDate: new Date(),
    priority: 1,
    subtasks: [
      { title: "Do it", isChecked: false },
      { title: "Go faster", isChecked: false },
      { title: "Keep checking them", isChecked: false },
      { title: "Almost there", isChecked: false },
      { title: "Just one more", isChecked: false },
      { title: "the last one", isChecked: false },
    ],
    isChecked: false,

    project: "",
    category: "",
  },
];

const allProjects = [
  {
    name: "Learning to cook",
    color: "#fcc203",
    total() {
      return allTasks.filter((task) => task.project == `${this.name}`).length;
    },
    categories: ["Tutorials", "Recipes", "Equipment"],
  },
  {
    name: "Portfolio",
    color: "#24f06b",
    total() {
      return allTasks.filter((task) => task.project == `${this.name}`).length;
    },
    categories: ["Design", "Projects", "SEO"],
  },
];

export { allTasks, allProjects };
