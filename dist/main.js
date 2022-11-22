(()=>{"use strict";class t{constructor({title:t,objectId:e}){this.title=t,this.objectId=e,this.todoList=[],this.nextObjectId=0,this.soonestDueDate=void 0}set title(t){this._title=t||"Nameless Project"}get title(){return this._title}set soonestDueDate(t){this._soonestDueDate=t,this.priority=t?-t:-1/0}get soonestDueDate(){return this._soonestDueDate}set priority(t){this._priority=t}get priority(){return this._priority}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}}const e=new class{constructor(){this.projectList=[],this.nextObjectId=0}set nextObjectId(t){this._nextObjectId=t}get nextObjectId(){const t=this._nextObjectId;return this.nextObjectId=t+1,t}add(t){this.projectList.push(t),this.sortByPriority()}sortByPriority(){this.projectList.sort(((t,e)=>t.priority-e.priority))}getIndex(t){this.projectList.findIndex((e=>e===t))}};new class{constructor(e){this.allProjects=e,this.newProjectButton=document.querySelector("#new-project-button"),this.newProjectForm=document.querySelector("#new-project-form"),this.allProjectsDiv=document.querySelector("#all-projects"),this.newProjectButton.addEventListener("click",(()=>{this.newProjectForm.classList.toggle("hidden")})),this.newProjectForm.querySelector("button").addEventListener("click",(e=>{const o=(()=>{const e=document.querySelector("#new-project-title").value;return new t({title:e,objectId:this.allProjects.nextObjectId})})();this.allProjects.add(o),((t,e)=>{const o=this.allProjectsDiv;0===o.childElementCount?o.appendChild(t):o.insertBefore(t,o.childNodes[e])})((t=>{const e=document.createElement("form");e.setAttribute("data-object-id",t.objectId);const o=((t,e)=>{const o=document.createElement("input");o.value=t;const s=`project-${e}-input`;return o.name=s,o.id=s,o})(t.title,t.objectId),s=(t=>{const e=document.createElement("label");return e.textContent="Project Name: ",e.setAttribute("for",t.id),e})(o),n=(()=>{const t=document.createElement("div");return t.textContent="Soonest Due Date: N/A",t.classList.add("soonest-due-date"),t})(),r=(()=>{const t=document.createElement("button");return t.textContent="Edit Project",t.classList.add("edit-project"),t})(),c=(()=>{const t=document.createElement("button");return t.textContent="Delete Project",t.classList.add("delete-project"),t})();return e.appendChild(s),e.appendChild(o),e.appendChild(n),e.appendChild(r),e.appendChild(c),e})(o),this.allProjects.getIndex(o)),e.preventDefault()}))}}(e)})();