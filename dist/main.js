(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(n){e(1,arguments);var i=Object.prototype.toString.call(n);return n instanceof Date||"object"===t(n)&&"[object Date]"===i?new Date(n.getTime()):"number"==typeof n||"[object Number]"===i?new Date(n):("string"!=typeof n&&"[object String]"!==i||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}const i=[{title:"Watch EGGS 101 by adam ragusea",description:"Starting with the basics",dueDate:new Date("2022-11-10"),priority:2,subtasks:[{title:"Become an omelette master",isChecked:!1},{title:"Try using butter",isChecked:!0}],isChecked:!0,project:"Learning to cook",category:"Tutorials"},{title:"Watch Steak 101",description:"Starting with the basics",dueDate:new Date("2022-11-18"),priority:1,subtasks:[{title:"Cook a Sirloin",isChecked:!1},{title:"Prime, grass-fed, choice... what was the difference?",isChecked:!0}],isChecked:!1,project:"Learning to cook",category:"Tutorials"},{title:"Spend 85$ on different cuts, and take notes about all the process, when preparing them",description:"Starting with the basics",dueDate:new Date("2022-11-18"),priority:3,subtasks:[],isChecked:!1,project:"Learning to cook",category:"Equipment"},{title:"Finish the contact me section",description:"",dueDate:new Date("2022-11-20"),priority:1,subtasks:[],isChecked:!1,project:"Portfolio",category:"Design ideas"},{title:"Real estate site",description:"",dueDate:new Date("2022-12-5"),priority:1,subtasks:[],isChecked:!1,project:"Portfolio",category:"Projects"},{title:"Productivity tracker",description:"",dueDate:new Date("2022-8-12"),priority:1,subtasks:[],isChecked:!0,project:"Portfolio",category:"Projects"},{title:"Finish the about me section",description:"",dueDate:new Date("2022-10-5"),priority:2,subtasks:[],isChecked:!0,project:"Portfolio",category:"Design"},{title:"Exercise today",description:"",dueDate:new Date,priority:1,subtasks:[],isChecked:!1,project:"",category:""},{title:"Read something",description:"",dueDate:new Date,priority:3,subtasks:[],isChecked:!1,project:"",category:""},{title:"RegEx practice",description:"",dueDate:new Date("2022-10-10"),priority:1,subtasks:[],isChecked:!1,project:"",category:""},{title:"Check the subtasks bellow, fast",description:"",dueDate:new Date,priority:1,subtasks:[{title:"Do it",isChecked:!1},{title:"Go faster",isChecked:!1},{title:"Keep checking them",isChecked:!1},{title:"Almost there",isChecked:!1},{title:"Just one more",isChecked:!1},{title:"the last one",isChecked:!1}],isChecked:!1,project:"",category:""}],a=[{name:"Learning to cook",color:"#fcc203",total(){return i.filter((e=>e.project==`${this.name}`)).length},categories:["Tutorials","Recipes","Equipment"]},{name:"Portfolio",color:"#24f06b",total(){return i.filter((e=>e.project==`${this.name}`)).length},categories:["Design","Projects","SEO"]}];function o(t){e(1,arguments);var i=n(t);return i.setHours(0,0,0,0),i}function r(t,n){e(2,arguments);var i=o(t),a=o(n);return i.getTime()===a.getTime()}function s(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}var c={};function l(){return c}function d(t,i){var a,o,r,c,d,u,p,k;e(1,arguments);var v=l(),y=s(null!==(a=null!==(o=null!==(r=null!==(c=null==i?void 0:i.weekStartsOn)&&void 0!==c?c:null==i||null===(d=i.locale)||void 0===d||null===(u=d.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==r?r:v.weekStartsOn)&&void 0!==o?o:null===(p=v.locale)||void 0===p||null===(k=p.options)||void 0===k?void 0:k.weekStartsOn)&&void 0!==a?a:0);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=n(t),h=m.getDay(),f=(h<y?7:0)+h-y;return m.setDate(m.getDate()-f),m.setHours(0,0,0,0),m}function u(t,i){var a,o,r,c,d,u,p,k;e(1,arguments);var v=l(),y=s(null!==(a=null!==(o=null!==(r=null!==(c=null==i?void 0:i.weekStartsOn)&&void 0!==c?c:null==i||null===(d=i.locale)||void 0===d||null===(u=d.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==r?r:v.weekStartsOn)&&void 0!==o?o:null===(p=v.locale)||void 0===p||null===(k=p.options)||void 0===k?void 0:k.weekStartsOn)&&void 0!==a?a:0);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=n(t),h=m.getDay(),f=6+(h<y?-7:0)-(h-y);return m.setDate(m.getDate()+f),m.setHours(23,59,59,999),m}const p=new Date;function k(e,t){return e.priority<t.priority?-1:e.priority>t.priority?1:0}function v(){return i.filter((t=>function(t){return e(1,arguments),r(t,Date.now())}(t.dueDate))).sort(k)}function y(){return i.filter((e=>e.dueDate>=d(p)&&e.dueDate<=u(p))).sort(k)}function m(e){return e.subtasks.filter((e=>1==e.isChecked)).length}const h=["January","February","March","April","May","June","July","August","September","October","November","December"];function f(e){return e.isChecked?"checked":""}function g(t,i,a){t.innerHTML+=`\n  <div class="task-container">\n  <div class="task" data-task-id="${i.id}">\n    <div>\n      <div class="task-check">\n        <div class="round checkp${i.priority}">\n          <input type="checkbox" class="checkbox" ${f(i)}  />\n          <label class="task-label"></label>\n        </div>\n      </div>\n      <div class="task-content">\n        <div class="task-title ${function(e){return e.isChecked?"marked-task":""}(i)}">${i.title}</div>\n        <div class="task-info">\n          <div>\n            <div class="task-duedate">${h[i.dueDate.getMonth()]} ${function(t){return e(1,arguments),n(t).getDate()}(i.dueDate)}</div>\n            <div>\n              <div class="progress-container">\n              <div class="progress-bar" style="width:${100/i.subtasks.length*m(i)}%;"></div>\n                <progress></progress>\n              </div>\n              <div class="progress-subtask">${m(i)}/${i.subtasks.length} Subtasks</div>\n            </div>\n          </div>\n          <p class="task-description">\n          ${i.description}\n          </p>\n        </div>\n      </div>\n    </div>\n    <div class="task-options">\n      <div><i class="fa-solid fa-xmark deleteTask"></i></div>\n      <div><i class="fa-solid fa-angle-down dropSubtasks"></i></div>\n    </div>\n  </div>\n\n  ${a}\n  <div class="new-subtask">+</div>\n  </div>`}function b(e){let t="";return null!=e.subtasks&&e.subtasks.forEach((n=>{t+=`\n    <div class="subtask" data-subtask-id="${n.id}">\n    <div class="task-check">\n      <div class="round checkp4">\n        <input type="checkbox" ${f(n)} class="checkbox" data-task-id="${e.id}"/>\n        <label class="subtask-label"></label>\n      </div>\n    </div>\n    <div class="task-content">\n      <div class="task-title">\n       ${n.title}\n      </div>\n    </div>\n    </div>\n  `})),t}const w='<div class="task-container">\n<div class="new-task">+</div>\n</div>\n</div>',S=["#F95050","#F9AB50","#9BB5F9","#4C4D5C"],E=document.querySelector("#today-option"),D=document.querySelector("#weekly-option"),q=document.querySelector("#projects-container");let L="today-option",$=[];function C(){q.innerHTML="",a.forEach((e=>q.innerHTML+=`<div class="project" data-project="${e.name}"><div><span class="project-tag" style="background-color:${e.color}"></span> <h5>${e.name}</h5></div> <div class="optionTotal">${e.total()}</div></div>`))}function j(){document.querySelectorAll(".project").forEach((e=>{e.addEventListener("click",(()=>{$=a.filter((t=>t.name==`${e.getAttribute("data-project")}`))[0],L=`${e.getAttribute("data-project")}`,H(L,$)}))}))}function T(){let e=-1;i.forEach((t=>{let n=-1;e+=1,t.id=e,t.subtasks.forEach((e=>{n+=1,e.id=n}))}))}function x(){const e=document.querySelector("#today-option .optionTotal"),t=document.querySelector("#weekly-option .optionTotal");e.textContent=`${v().length}`,t.textContent=`${y().length}`}function A(){document.querySelectorAll(".new-subtask").forEach((e=>e.addEventListener("click",(()=>{let t=prompt("title"),n=e.parentElement.querySelector(".task").getAttribute("data-task-id");i[n].subtasks.push({title:t,isChecked:!1}),T(),H(L,$),document.querySelector(`[data-task-id="${n}"]`).parentElement.classList.add("task-open"),console.log(i)}))))}function M(){document.querySelectorAll(".task-options div:nth-child(1)").forEach((e=>{e.addEventListener("click",(()=>{i.splice(e.parentElement.parentElement.getAttribute("data-task-id"),1),T(),H(L,$),x()}))}))}function H(e,t){"today-option"==e?(document.querySelector(".display-container").innerHTML='\n    <div class="section-title"><h2>Overdue</h2></div>\n\n    <div id="overdue-tasks" class="big-container"></div>\n      \n    <div class="section-title date-heading">\n      <h2>Today</h2>\n      <h4 id="actual-day">If you are reading, this something went wrong</h4>\n    </div>\n    <div id="today-tasks" class="big-container">\n     \n    </div>\n\n    ',function(){const e=document.querySelector("#today-tasks"),t=document.querySelector("#overdue-tasks");v().forEach((t=>{let n=b(t);g(e,t,n)})),e.innerHTML+=w,i.filter((e=>e.dueDate<p&&0==e.isChecked)).forEach((e=>{let n=b(e);g(t,e,n)}))}(),document.querySelector("#actual-day").textContent=`${h[d(new Date).getMonth()]} ${(new Date).getDate()}`):"weekly-option"==e?(document.querySelector(".display-container").innerHTML='<div class="section-title date-heading">\n  <h2>Weekly</h2>\n  <h4 id="actual-week">If you are reading, this something went wrong</h4>\n  </div>\n  <div id="weekly-tasks" class="big-container">\n  \n\n  </div>\n  </div>',function(){const e=document.querySelector("#weekly-tasks");y().forEach((t=>{let n=b(t);g(e,t,n)})),e.innerHTML+=w}(),document.querySelector("#actual-week").textContent=`${h[d(new Date).getMonth()]} ${d(new Date).getDate()} to ${h[u(new Date).getMonth()]} ${u(new Date).getDate()}`):(function(e,t){const n=document.querySelector(".display-container");n.innerHTML=`<div class="section-title project-heading">\n  <div class="square" style=background-color:${t.color}></div>\n  <h2>${t.name}</h2>\n  </div>`,n.innerHTML+='\n  \n  <div id="no-category" class="big-container"></div>\n',0==t.categories.length&&(n.innerHTML+='<div class="task-container">\n    <div class="new-task">+</div>\n    </div>\n    </div>');for(let e=0;e<t.categories.length;e++)n.innerHTML+=`<div class="subtitle"><h3>${t.categories[e]}</h3></div>\n    <div data-project="${t.name}" data-category="${t.categories[e]}" class="big-container category">`;n.innerHTML+='<div class="subtitle new-subtitle">\n<div>\n<input type="text" id="new-subtitle-btn" placeholder="Add a subtitle +" maxlength="50"/><i class="fa-solid fa-check"></i>\n</div>\n<div class="subtitle-character-count">\n<h4><span class="actual-count">0</span>/<span class="max-count">50</span></h4>\n</div>\n</div>'}(i.filter((t=>t.project==e)),t),function(e){let t=(n=e.name,i.filter((e=>e.project==n)).sort(k));var n;const a=document.querySelectorAll(".big-container.category "),o=document.querySelector("#no-category");t.filter((e=>""==e.category)).forEach((e=>{let t=b(e);g(o,e,t)})),a.forEach((e=>{let n=function(e,t){return e.filter((e=>e.category==`${t.getAttribute("data-category")}`))}(t,e);n.forEach((t=>{let n=b(t);g(e,t,n)})),e.innerHTML+=w}))}(t),O()),document.querySelectorAll(".dropSubtasks").forEach((e=>{e.parentElement.addEventListener("click",(t=>{let n=e.parentElement.parentElement.parentElement.parentElement;n.classList.contains("task-open")?(n.classList.remove("task-open"),e.style.cssText="transform: rotate(0deg)"):(n.classList.add("task-open"),e.style.cssText="transform: rotate(180deg)")}))})),document.querySelectorAll(".new-task").forEach((e=>e.addEventListener("click",(()=>{if(0==e.classList.contains("new-task-form")){e.classList.add("new-task-form");let t=4;document.querySelector(".new-task-form").innerHTML='<div class="form">\n<div class="top">\n  <input type="text" id="taskform-name"\n    placeholder="Task name">\n  <input type="text" id="taskform-description"\n    placeholder="Description">\n</div>\n<div class="bottom">\n  <input type="date" id="taskform-duedate"\n    placeholder="Due date">\n  <div id="taskform-priority"><i class="fa-solid fa-flag"></i><div class="priority-option" data-priority="1"></div><div class="priority-option" data-priority="2"></div><div class="priority-option" data-priority="3"></div><div class="priority-option" data-priority="4"></div></div>\n</div>\n</div>\n<div class="form-btns">\n<div id="taskform-cancel-btn">Cancel</div>\n<div id="taskform-add-btn">Add Task</div>\n\n</div>',document.querySelectorAll(".priority-option").forEach((e=>{e.addEventListener("click",(()=>{t=e.getAttribute("data-priority"),document.querySelector(".fa-flag").style.color=S[t-1],e.parentElement.classList.remove("open")}))})),document.querySelector(".new-task-form").addEventListener("click",(e=>{0==e.target.classList.contains("priority-option")&&document.querySelector("#taskform-priority").classList.contains("open")&&0==e.target.classList.contains("fa-flag")&&document.querySelector("#taskform-priority").classList.remove("open")})),document.querySelector("#taskform-priority").addEventListener("click",(e=>{e.target.classList.contains("fa-flag")&&e.target.parentElement.classList.add("open")})),document.querySelector("#taskform-add-btn").addEventListener("click",(()=>{console.log(`${document.querySelector("#taskform-name").value}${document.querySelector("#taskform-description").value}${document.querySelector("#taskform-duedate").value}`)}))}})))),A(),function(){const e=document.querySelectorAll(".task-label"),t=document.querySelectorAll(".subtask-label");e.forEach((e=>{e.addEventListener("click",(()=>{const t=e.parentElement.querySelector(".checkbox");let n=t.parentElement.parentElement.parentElement.parentElement,a=parseInt(n.getAttribute("data-task-id"));1==i[a].isChecked?(t.checked=!1,i[a].isChecked=!1,n.querySelector(".task-title").classList.remove("marked-task")):(t.checked=!0,i[a].isChecked=!0,n.querySelector(".task-title").classList.add("marked-task"))}))})),t.forEach((e=>{e.addEventListener("click",(()=>{const t=e.parentElement.querySelector(".checkbox");let n=parseInt(t.getAttribute("data-task-id")),a=parseInt(t.parentElement.parentElement.parentElement.getAttribute("data-subtask-id"));1==i[n].subtasks[a].isChecked?(t.checked=!1,i[n].subtasks[a].isChecked=!1):(t.checked=!0,i[n].subtasks[a].isChecked=!0);let o=t.parentElement.parentElement.parentElement.parentElement.querySelector(".progress-subtask"),r=t.parentElement.parentElement.parentElement.parentElement.querySelector(".progress-bar");o.textContent=`${m(i[n])}/${i[n].subtasks.length} Subtasks`,r.style.width=100/i[n].subtasks.length*m(i[n])+"%"}))}))}(),M()}function O(){let e=document.querySelector(".new-subtitle"),t=document.querySelector("#new-subtitle-btn"),n=document.querySelector(".new-subtitle .actual-count"),i=e.querySelector("i");t.addEventListener("click",(()=>{e.classList.add("new-subtitle-open")})),t.addEventListener("input",(()=>{n.textContent=t.value.length})),i.addEventListener("click",(()=>{$.categories.push(document.querySelector("#new-subtitle-btn").value),H(L,$)}))}E.addEventListener("click",(()=>{L="today-option",H(L,$)})),D.addEventListener("click",(()=>{L="weekly-option",H(L,$)})),T(),C(),j(),x(),H(L,$),document.querySelector("#add-projects").addEventListener("click",(()=>{let e=prompt("Project name"),t=prompt("hex color");var n;a.push({name:n=e,color:t,categories:[],total:()=>i.filter((e=>e.project==`${n}`)).length}),C(),j()})),window.addEventListener("click",(e=>{if(null!=document.querySelector(".new-subtitle-open")){if(e.target.classList.contains("fa-check"))return;if("new-subtitle-btn"==e.target.id)return;document.querySelector("#new-subtitle-btn").value="",document.querySelector(".actual-count").textContent="0",document.querySelector(".new-subtitle-open").classList.remove("new-subtitle-open")}}))})();