(()=>{"use strict";class t{constructor({title:t,objectId:e}){this.title=t,this.objectId=e,this.todoList=[],this.nextObjectId=0,this.soonestDueDate=void 0}set title(t){this._title=t||"Nameless Project"}get title(){return this._title}set soonestDueDate(t){this._soonestDueDate=t,this.priority=t?-t:-1/0}get soonestDueDate(){return this._soonestDueDate}set priority(t){this._priority=t}get priority(){return this._priority}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}add(t){this.todoList.push(t),this.sortByPriority()}sortByPriority(){this.todoList.sort(((t,e)=>e.priority-t.priority))}getIndex(t){return this.todoList.findIndex((e=>e.objectId===t))}}class e{constructor({title:t,dueDate:e,description:o,objectId:r}){this.title=t,this.dueDate=e,this.description=o,this.objectId=r}set dueDate(t){this._dueDate=t,this.priority=t||-1/0}get dueDate(){return this._dueDate}set priority(t){const e=parseInt(t.replace("-","").replace("-",""));this._priority=-e}get priority(){return this._priority}}const o=new class{constructor(){this.projectList=[],this.nextObjectId=0}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}add(t){this.projectList.push(t),this.sortByPriority()}sortByPriority(){this.projectList.sort(((t,e)=>e.priority-t.priority))}getIndex(t){return this.projectList.findIndex((e=>e.objectId===t))}remove(t){this.projectList.splice(t,1)}};new class{constructor(o){this.allProjects=o,this.newProjectButton=document.querySelector("#new-project-button"),this.newProjectForm=document.querySelector("#new-project-form"),this.allProjectsDiv=document.querySelector("#all-projects"),this.newTodoForm=document.querySelector("#new-todo-form"),this.newProjectButton.addEventListener("click",(()=>{this.newProjectForm.classList.toggle("hidden")})),this.newProjectForm.querySelector("button").addEventListener("click",(e=>{const o=(()=>{const e=document.querySelector("#new-project-title").value;return new t({title:e,objectId:this.allProjects.nextObjectId})})();this.allProjects.add(o),((t,e)=>{const o=this.allProjectsDiv;0===o.childElementCount?o.appendChild(t):o.insertBefore(t,o.childNodes[e])})((t=>{const e=document.createElement("form");e.setAttribute("data-object-id",t.objectId);const o=((t,e)=>{const o=document.createElement("input");o.value=t,o.disabled=!0;const r=`project-${e}-input`;return o.name=r,o.id=r,o})(t.title,t.objectId),r=(t=>{const e=document.createElement("label");return e.textContent="Project Title: ",e.setAttribute("for",t.id),e})(o),n=(()=>{const t=document.createElement("div");return t.textContent="Soonest Due Date: N/A",t.classList.add("soonest-due-date"),t})(),s=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Edit Project",t.classList.add("edit-project"),t})(),i=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Delete Project",t.classList.add("delete-project"),t})(),d=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Open/Close Todo List",t.classList.add("toggle-todo-list"),t})(),c=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Create Todo",t.classList.add("create-todo"),t.classList.add("hidden"),t})(),a=(()=>{const t=document.createElement("div");return t.classList.add("todo-list"),t.classList.add("hidden"),t})();return e.appendChild(r),e.appendChild(o),e.appendChild(n),e.appendChild(s),e.appendChild(i),e.appendChild(d),e.appendChild(c),e.appendChild(a),e})(o),this.allProjects.getIndex(o.objectId)),(()=>{this.newProjectForm.reset(),this.newProjectForm.classList.add("hidden")})()})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("edit-project")){const e=()=>{t.target.parentNode.querySelector("input").disabled=!1},o=()=>{const t=document.createElement("button");return t.type="button",t.textContent="Submit",t.classList.add("submit-edit-project"),t},r=()=>{const e=o();t.target.parentNode.appendChild(e)};if(t.target.parentNode.querySelector(".submit-edit-project"))return;e(),r()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("submit-edit-project")){const e=()=>{t.target.remove()};(e=>{const o=t.target.parentNode.querySelector("input");e.title=o.value,o.disabled=!0})((t=>{const e=this.allProjects.getIndex(t);return this.allProjects.projectList[e]})((()=>{const e=t.target.parentNode;return parseInt(e.getAttribute("data-object-id"))})())),e()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("delete-project")){const e=t=>{const e=parseInt(t.getAttribute("data-object-id"));o.remove(e)},r=t=>{t.remove()};(()=>{const o=t.target.parentNode;e(o),r(o)})()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("toggle-todo-list")){const e=()=>{t.target.parentNode.querySelector(".todo-list").classList.toggle("hidden")};t.target.parentNode.querySelector(".create-todo").classList.toggle("hidden"),e()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("create-todo")){const e=()=>{this.newTodoForm.classList.toggle("hidden")};(()=>{const e=document.querySelector("#new-todo-form");t.target.parentNode.insertBefore(e,t.target.nextSibling)})(),e()}})),this.newTodoForm.querySelector("button").addEventListener("click",(t=>{const o=(t,e,o,r)=>{const n=document.createElement("input");n.type=t,n.value=o,n.disabled=!0;const s=`todo-${r}-${e}-input`;return n.name=s,n.id=s,n.setAttribute("data-attribute",e),n},r=(t,e)=>{const o=document.createElement("label");return o.textContent=e,o.setAttribute("for",t.id),o},n=(()=>{const t=parseInt(this.newTodoForm.parentNode.getAttribute("data-object-id")),e=this.allProjects.getIndex(t);return this.allProjects.projectList[e]})(),s=(t=>{const o=document.querySelector("#new-todo-title").value,r=document.querySelector("#new-todo-due-date").value,n=document.querySelector("#new-todo-description").value,s=t.nextObjectId;return new e({title:o,dueDate:r,description:n,objectId:s})})(n);n.add(s),((t,e)=>{const o=this.newTodoForm.parentNode.querySelector(".todo-list");0===o.childElementCount?o.appendChild(t):o.insertBefore(t,o.childNodes[e])})((t=>{const e=document.createElement("form");e.setAttribute("data-object-id",t.objectId);const n=o("text","title",t.title,t.objectId),s=r(n,"Todo Item Title: "),i=o("date","dueDate",t.dueDate,t.objectId),d=r(i,"Due Date: "),c=o("text","description",t.description,t.objectId),a=r(c,"Description: "),l=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Edit Todo",t.classList.add("edit-todo"),t})(),u=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Delete Todo",t.classList.add("delete-todo"),t})();return e.appendChild(s),e.appendChild(n),e.appendChild(d),e.appendChild(i),e.appendChild(a),e.appendChild(c),e.appendChild(l),e.appendChild(u),e})(s),n.getIndex(s.objectId))})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("edit-todo")){const e=()=>{const t=document.createElement("button");return t.type="button",t.textContent="Submit",t.classList.add("submit-edit-todo"),t},o=()=>{const o=e();t.target.parentNode.appendChild(o)};t.target.parentNode.querySelectorAll("input").forEach((t=>{t.disabled=!1})),o()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("submit-edit-todo")){const e=()=>{const e=t.target.parentNode.parentNode.parentNode,o=parseInt(e.getAttribute("data-object-id")),r=this.allProjects.getIndex(o);return this.allProjects.projectList[r]};(e=>{t.target.parentNode.querySelectorAll("input").forEach((t=>{const o=t.getAttribute("data-attribute");e[o]=t.value,t.disabled=!0}))})((t=>{const o=e(),r=o.getIndex(t);return o.todoList[r]})((()=>{const e=t.target.parentNode;return parseInt(e.getAttribute("data-object-id"))})()))}}))}}(o)})();