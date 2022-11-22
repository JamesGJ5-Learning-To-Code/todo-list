import { Project } from "./project"

export class DOMController {
    constructor(allProjects) {
        this.allProjects = allProjects;

        this.newProjectButton = document.querySelector('#new-project-button');
        this.newProjectForm = document.querySelector('#new-project-form');
        this.allProjectsDiv = document.querySelector('#all-projects');

        this.newProjectButton.addEventListener('click', () => {
            this.newProjectForm.classList.toggle('hidden');
        });
        this.newProjectForm.querySelector('button').addEventListener('click', (e) => {
            const createNewProject = () => {
                const newProjectTitle = document.querySelector('#new-project-title').value;
                const newProject = new Project({
                    title: newProjectTitle,
                    objectId: this.allProjects.nextObjectId
                });
                return newProject;
            };
            const makeTitleInput = (title, projectID) => {
                const titleInput = document.createElement('input');
                titleInput.value = title;
                const name = `project-${projectID}-input`;
                titleInput.name = name;
                titleInput.id = name;
                // TODO: freeze input before returning it
                return titleInput;
            };
            const makeTitleLabel = (titleInput) => {
                const titleLabel = document.createElement('label');
                titleLabel.textContent = 'Project Name: ';
                titleLabel.setAttribute('for', titleInput.id);
                return titleLabel;
            };
            const makeSoonestDueDateDiv = () => {
                const soonestDueDateDiv = document.createElement('div');
                soonestDueDateDiv.textContent = 'Soonest Due Date: N/A';
                soonestDueDateDiv.classList.add('soonest-due-date');
                return soonestDueDateDiv;
            };
            const makeEditProjectButton = () => {
                const editProjectButton = document.createElement('button');
                editProjectButton.type = 'button';
                editProjectButton.textContent = 'Edit Project';
                editProjectButton.classList.add('edit-project');
                return editProjectButton;
            };
            const makeDeleteProjectButton = () => {
                const deleteProjectButton = document.createElement('button');
                deleteProjectButton.type = 'button';
                deleteProjectButton.textContent = 'Delete Project';
                deleteProjectButton.classList.add('delete-project');
                return deleteProjectButton;
            };
            const makeProjectForm = (project) => {
                const projectForm = document.createElement('form');
                projectForm.setAttribute('data-object-id', project.objectId);

                const titleInput = makeTitleInput(project.title, project.objectId);
                const titleLabel = makeTitleLabel(titleInput);
                const soonestDueDateDiv = makeSoonestDueDateDiv();
                const editProjectButton = makeEditProjectButton();
                const deleteProjectButton = makeDeleteProjectButton();

                projectForm.appendChild(titleLabel);
                projectForm.appendChild(titleInput);
                projectForm.appendChild(soonestDueDateDiv);
                projectForm.appendChild(editProjectButton);
                projectForm.appendChild(deleteProjectButton);

                return projectForm;
            };
            const displayProject = (projectForm, index) => {
                const parent = this.allProjectsDiv
                if (parent.childElementCount === 0) {
                    parent.appendChild(projectForm);
                } else {
                    parent.insertBefore(
                        projectForm,
                        parent.childNodes[index]
                    );
                };
            };
            const newProject = createNewProject();
            this.allProjects.add(newProject);
            const projectForm = makeProjectForm(newProject);
            displayProject(projectForm, this.allProjects.getIndex(newProject));
        });
        // TODO: add event listener for button.edit-project
        // TODO: add event listener for button.delete-project
    }
}