(()=>{"use strict";class t{constructor({title:t,objectId:e}){this.title=t,this.objectId=e,this.todoList=[],this.nextObjectId=0,this.soonestDueDate=void 0}set title(t){this._title=t||"Nameless Project"}get title(){return this._title}set soonestDueDate(t){this._soonestDueDate=t,this.priority=t?-t:-1/0}get soonestDueDate(){return this._soonestDueDate}set priority(t){this._priority=t}get priority(){return this._priority}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}}const e=new class{constructor(){this.projectList=[],this.nextObjectId=0}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}add(t){this.projectList.push(t),this.sortByPriority()}sortByPriority(){this.projectList.sort(((t,e)=>t.priority-e.priority))}getIndex(t){return this.projectList.findIndex((e=>e.objectId===t))}remove(t){this.projectList.splice(t,1)}};new class{constructor(e){this.allProjects=e,this.newProjectButton=document.querySelector("#new-project-button"),this.newProjectForm=document.querySelector("#new-project-form"),this.allProjectsDiv=document.querySelector("#all-projects"),this.newProjectButton.addEventListener("click",(()=>{this.newProjectForm.classList.toggle("hidden")})),this.newProjectForm.querySelector("button").addEventListener("click",(e=>{const s=(()=>{const e=document.querySelector("#new-project-title").value;return new t({title:e,objectId:this.allProjects.nextObjectId})})();this.allProjects.add(s),((t,e)=>{const s=this.allProjectsDiv;0===s.childElementCount?s.appendChild(t):s.insertBefore(t,s.childNodes[e])})((t=>{const e=document.createElement("form");e.setAttribute("data-object-id",t.objectId);const s=((t,e)=>{const s=document.createElement("input");s.value=t,s.disabled=!0;const o=`project-${e}-input`;return s.name=o,s.id=o,s})(t.title,t.objectId),o=(t=>{const e=document.createElement("label");return e.textContent="Project Title: ",e.setAttribute("for",t.id),e})(s),n=(()=>{const t=document.createElement("div");return t.textContent="Soonest Due Date: N/A",t.classList.add("soonest-due-date"),t})(),r=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Edit Project",t.classList.add("edit-project"),t})(),i=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Delete Project",t.classList.add("delete-project"),t})(),c=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Open/Close Todo List",t.classList.add("toggle-todo-list"),t})(),d=(()=>{const t=document.createElement("button");return t.type="button",t.textContent="Create Todo",t.classList.add("create-todo"),t.classList.add("hidden"),t})(),a=(()=>{const t=document.createElement("div");return t.classList.add("todo-list"),t.classList.add("hidden"),t})();return e.appendChild(o),e.appendChild(s),e.appendChild(n),e.appendChild(r),e.appendChild(i),e.appendChild(c),e.appendChild(d),e.appendChild(a),e})(s),this.allProjects.getIndex(s.objectId)),(()=>{this.newProjectForm.reset(),this.newProjectForm.classList.add("hidden")})()})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("edit-project")){const e=()=>{const t=document.createElement("button");return t.type="button",t.textContent="Submit",t.classList.add("submit-edit"),t},s=()=>{const s=e();t.target.parentNode.appendChild(s)};t.target.parentNode.querySelector("input").disabled=!1,s()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("submit-edit")){(e=>{const s=t.target.parentNode.querySelector("input");e.title=s.value,s.disabled=!0})((t=>{const e=this.allProjects.getIndex(t);return this.allProjects.projectList[e]})((()=>{const e=t.target.parentNode;return parseInt(e.getAttribute("data-object-id"))})()))}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("delete-project")){const s=t=>{const s=parseInt(t.getAttribute("data-object-id"));e.remove(s)},o=t=>{t.remove()};(()=>{const e=t.target.parentNode;s(e),o(e)})()}})),this.allProjectsDiv.addEventListener("click",(t=>{if(t.target&&t.target.classList.contains("toggle-todo-list")){const e=()=>{t.target.parentNode.querySelector(".todo-list").classList.toggle("hidden")};t.target.parentNode.querySelector(".create-todo").classList.toggle("hidden"),e()}})),this.allProjectsDiv.addEventListener("click",(t=>{t.target&&t.target.classList.contains("create-todo")&&(()=>{const e=document.querySelector("#new-todo-form");t.target.parentNode.insertBefore(e,t.target.nextSibling)})()}))}}(e)})();