function generateToday() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `
    <div class="section-title"><h2>Overdue</h2></div>

    <div id="overdue-tasks" class="big-container"></div>
      
    <div class="section-title date-heading">
      <h2>Today</h2>
      <h4>21 October</h4>
    </div>
    <div id="today-tasks" class="big-container">
     
    </div>

    <div class="new-task-project">pending</div>`;
}

function generateWeekly() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title date-heading">
  <h2>Weekly</h2>
  <h4 id="actual-week">Oct 30 to Nov 5</h4>
  </div>
  <div id="weekly-tasks" class="big-container">
  

  </div>
  </div>`;
}

function generateProject(project, actualProject) {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title project-heading">
  <div class="square"></div>
  <h2>${actualProject.name}</h2>
  </div>`;

  //Generate a subtitle and a container for each with a distinct id
  for (let i = 0; i < actualProject.categories.length; i++) {
    container.innerHTML += `<div class="subtitle"><h3>${actualProject.categories[i]}</h3></div>
    <div data-project="${actualProject.name}" data-category="${actualProject.categories[i]}" class="big-container">`;
  }

  // container.innerHTML +=
  console.log(actualProject);
}

export { generateToday, generateWeekly, generateProject };
