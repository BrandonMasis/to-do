function generateToday() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title"><h2>Overdue</h2></div>
    <div id="overdue-tasks" class="big-container">
      <div class="task-container">
        <div class="task">
          <div>
            <div class="task-check">
              <div class="round checkp1">
                <input type="checkbox" checked id="checkbox1" />
                <label for="checkbox1"></label>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">5 pomodoros Odin</div>
              <div class="task-info">
                <div>
                  <div class="task-duedate">December 24</div>
                  <div>
                    <div class="progress-container">
                      <progress value="75" max="100">75%</progress>
                    </div>
                    <div class="progress-subtask">1/5 Subtasks</div>
                  </div>
                </div>
                <p class="task-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Modi similique molestiae quam at quos vero
                  voluptatum nisi quidem deserunt harum.
                </p>
              </div>
            </div>
          </div>
          <div class="task-options">
            <div><i class="fa-solid fa-xmark deleteTask"></i></div>
            <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-title date-heading">
      <h2>Today</h2>
      <h4>21 October</h4>
    </div>
    <div id="today-tasks" class="big-container">
      <div class="task-container">
        <div class="task">
          <div>
            <div class="task-check">
              <div class="round checkp1">
                <input type="checkbox" checked id="checkbox1" />
                <label for="checkbox1"></label>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">5 pomodoros Odin</div>
              <div class="task-info">
                <div>
                  <div class="task-duedate">December 24</div>
                  <div>
                    <div class="progress-container">
                      <progress value="75" max="100">75%</progress>
                    </div>
                    <div class="progress-subtask">1/5 Subtasks</div>
                  </div>
                </div>
                <p class="task-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Modi similique molestiae quam at quos vero
                  voluptatum nisi quidem deserunt harum.
                </p>
              </div>
            </div>
          </div>
          <div class="task-options">
            <div><i class="fa-solid fa-ellipsis dropOptions"></i></div>
            <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
          </div>
        </div>
      </div>
      <div class="task-container">
        <div class="task">
          <div>
            <div class="task-check">
              <div class="round checkp1">
                <input type="checkbox" checked id="checkbox1" />
                <label for="checkbox1"></label>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">5 pomodoros Odin</div>
              <div class="task-info">
                <div>
                  <div class="task-duedate">December 24</div>
                  <div>
                    <div class="progress-container">
                      <progress value="75" max="100">75%</progress>
                    </div>
                    <div class="progress-subtask">1/5 Subtasks</div>
                  </div>
                </div>
                <p class="task-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Modi similique molestiae quam at quos vero
                  voluptatum nisi quidem deserunt harum.
                </p>
              </div>
            </div>
          </div>
          <div class="task-options">
            <div><i class="fa-solid fa-ellipsis dropOptions"></i></div>
            <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
          </div>
        </div>
      </div>

      <div class="task-container">
        <div class="task">
          <div>
            <div class="task-check">
              <div class="round checkp4">
                <input type="checkbox" checked id="checkbox4" />
                <label for="checkbox4"></label>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <div class="task-duedate">December 24</div>
            </div>
          </div>
          <div class="task-options">
            <div><i class="fa-solid fa-ellipsis dropOptions"></i></div>
            <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
          </div>
        </div>
      </div>

      <div class="task-container">
        <div class="task">
          <div>
            <div class="task-check">
              <div class="round checkp4">
                <input type="checkbox" checked id="checkbox4" />
                <label for="checkbox4"></label>
              </div>
            </div>
            <div class="task-content">
              <div class="task-title">Lorem ipsum dolor sit amet.</div>
              <div class="task-duedate">December 24</div>
            </div>
          </div>
          <div class="task-options">
            <div><i class="fa-solid fa-ellipsis dropOptions"></i></div>
            <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>
          </div>
        </div>

        <div class="subtask">
          <div class="task-check">
            <div class="round checkp4">
              <input type="checkbox" checked id="checkbox4" />
              <label for="checkbox4"></label>
            </div>
          </div>
          <div class="task-content">
            <div class="task-title">
              Loremsit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
        <div class="subtask">
          <div class="task-check">
            <div class="round checkp4">
              <input type="checkbox" checked id="checkbox4" />
              <label for="checkbox4"></label>
            </div>
          </div>
          <div class="task-content">
            <div class="task-title">Loremsicing elit.</div>
          </div>
        </div>
        <div class="new-subtask">+</div>
      </div>

      <div class="task-container">
        <div class="new-task">+</div>
      </div>
    </div>

    <div class="new-task-project">pending</div>`;
}

function generateWeekly() {
  const container = document.querySelector(".display-container");
  container.innerHTML = `<div class="section-title date-heading">
  <h2>Weekly</h2>
  <h4>Oct 30 to Nov 5</h4>
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
