const projects = [
  {
    name: "Writting",
    color: "#0f8cfa",
    total() {
      allTasks.filter((task) => (task.project = `${this.name}`)).length;
    },
  },
];

export { projects };
