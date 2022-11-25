import { Project } from "./project"
import { TodoItem } from "./todoItem";

export class DOMController {
    constructor(allProjects) {
        this.allProjects = allProjects;

        this.newProjectButton = document.querySelector('#new-project-button');
        this.newProjectForm = document.querySelector('#new-project-form');
        this.allProjectsDiv = document.querySelector('#all-projects');
        this.newTodoForm = document.querySelector('#new-todo-form');

        this.newProjectButton.addEventListener('click', () => {
            this.newProjectForm.classList.toggle('hidden');
        });
        // Event listener for the button with textContent 'Submit'
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
                titleInput.disabled = true;
                const name = `project-${projectID}-input`;
                titleInput.name = name;
                titleInput.id = name;
                return titleInput;
            };
            const makeTitleLabel = (titleInput) => {
                const titleLabel = document.createElement('label');
                titleLabel.textContent = 'Project Title: ';
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
            const makeToggleTodoListButton = () => {
                const toggleTodoListButton = document.createElement('button');
                toggleTodoListButton.type = 'button';
                toggleTodoListButton.textContent = 'Open/Close Todo List';
                toggleTodoListButton.classList.add('toggle-todo-list');
                return toggleTodoListButton;
            };
            const makeCreateTodoButton = () => {
                const createTodoButton = document.createElement('button');
                createTodoButton.type = 'button';
                createTodoButton.textContent = 'Create Todo';
                createTodoButton.classList.add('create-todo');
                createTodoButton.classList.add('hidden');
                return createTodoButton;
            };
            const makeTodoListDiv = () => {
                const todoListDiv = document.createElement('div');
                todoListDiv.classList.add('todo-list');
                todoListDiv.classList.add('hidden');
                return todoListDiv;
            };
            const makeProjectForm = (project) => {
                const projectForm = document.createElement('form');
                projectForm.setAttribute('data-object-id', project.objectId);

                const titleInput = makeTitleInput(project.title, project.objectId);
                const titleLabel = makeTitleLabel(titleInput);
                const soonestDueDateDiv = makeSoonestDueDateDiv();
                const editProjectButton = makeEditProjectButton();
                const deleteProjectButton = makeDeleteProjectButton();
                const toggleTodoListButton = makeToggleTodoListButton();
                const createTodoButton = makeCreateTodoButton();
                const todoListDiv = makeTodoListDiv();

                projectForm.appendChild(titleLabel);
                projectForm.appendChild(titleInput);
                projectForm.appendChild(soonestDueDateDiv);
                projectForm.appendChild(editProjectButton);
                projectForm.appendChild(deleteProjectButton);
                projectForm.appendChild(toggleTodoListButton);
                projectForm.appendChild(createTodoButton);
                projectForm.appendChild(todoListDiv);

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
            const reset = () => {
                this.newProjectForm.reset();
                this.newProjectForm.classList.add('hidden');
            };
            const newProject = createNewProject();
            this.allProjects.add(newProject);
            const projectForm = makeProjectForm(newProject);
            displayProject(
                projectForm, 
                this.allProjects.getIndex(newProject.objectId)
            );
            reset();
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('edit-project')) {
                const enableTitleInput = () => {
                    // TODO: select the below via its ID
                    const titleInput = e.target.parentNode.querySelector('input');
                    titleInput.disabled = false;
                };
                const makeSubmitEditButton = () => {
                    const submitEditButton = document.createElement('button');
                    submitEditButton.type = 'button';
                    submitEditButton.textContent = 'Submit';
                    submitEditButton.classList.add('submit-edit');
                    return submitEditButton;
                };
                const displaySubmitEditButton = () => {
                    const submitEditButton = makeSubmitEditButton();
                    const projectForm = e.target.parentNode;
                    projectForm.appendChild(submitEditButton);
                };
                enableTitleInput();
                displaySubmitEditButton();
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('submit-edit')) {
                // Find project in allProjects.projectList using data-object-id
                // Use value of titleInput and set it as new title of project
                // Disable titleInput
                const getProjectID = () => {
                    const projectForm = e.target.parentNode;
                    const projectID = parseInt(projectForm.getAttribute('data-object-id'));
                    return projectID;
                };
                const getProject = (projectID) => {
                    const index = this.allProjects.getIndex(projectID);

                    const project = this.allProjects.projectList[index];
                    return project;
                };
                const editProject = (project) => {
                    // TODO: select the below via its ID
                    const titleInput = e.target.parentNode.querySelector('input');
                    project.title = titleInput.value;
                    titleInput.disabled = true;
                };
                const projectID = getProjectID();
                const project = getProject(projectID);
                editProject(project);
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('delete-project')) {
                const removeInternally = (projectForm) => {
                    const projectID = parseInt(projectForm.getAttribute('data-object-id'));
                    allProjects.remove(projectID);
                };
                const removeFromDOM = (projectForm) => {
                    projectForm.remove();
                };
                const removeProject = () => {
                    const projectForm = e.target.parentNode
                    removeInternally(projectForm);
                    removeFromDOM(projectForm);
                };
                removeProject();
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('toggle-todo-list')) {
                const toggleCreateTodoButton = () => {
                    const createTodoButton = e.target.parentNode.querySelector('.create-todo');
                    createTodoButton.classList.toggle('hidden');
                };
                const toggleTodoListDiv = () => {
                    const todoListDiv = e.target.parentNode.querySelector('.todo-list');
                    todoListDiv.classList.toggle('hidden');
                };
                toggleCreateTodoButton();
                toggleTodoListDiv();
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('create-todo')) {
                const relocateNewTodoForm = () => {
                    const newTodoForm = document.querySelector('#new-todo-form');
                    const createTodoButtonParent = e.target.parentNode;
                    createTodoButtonParent.insertBefore(newTodoForm, e.target.nextSibling);
                };
                const toggleNewTodoForm = () => {
                    // const newTodoForm = document.querySelector('#new-todo-form');
                    this.newTodoForm.classList.toggle('hidden');
                };
                relocateNewTodoForm();
                toggleNewTodoForm();
            };
        });
        // Submit button in #new-todo-form
        this.newTodoForm.querySelector('button').addEventListener('click', (e) => {
            const getParentProject = () => {
                const projectID = parseInt(this.newTodoForm.parentNode.getAttribute('data-object-id'));
                const projectIndex = this.allProjects.getIndex(projectID);
                const projectObject = this.allProjects.projectList[projectIndex];
                return projectObject;
            };
            const makeTodoItem = (parentProject) => {
                const newTodoTitle = document.querySelector('#new-todo-title').value;
                const newTodoDueDate = document.querySelector('#new-todo-due-date').value;
                const newTodoDescription = document.querySelector('#new-todo-description').value;
                const newTodoObjectId = parentProject.nextObjectId;
                
                const newTodoItem = new TodoItem({
                    title: newTodoTitle,
                    dueDate: newTodoDueDate,
                    description: newTodoDescription,
                    objectId: newTodoObjectId
                });
                return newTodoItem;
            };
            const makeLabel = (input, text) => {
                const label = document.createElement('label');
                label.textContent = text;
                label.setAttribute('for', input.id);
                return label;
            };
            const makeTitleInput = (title, todoItemID) => {
                const titleInput = document.createElement('input');
                titleInput.value = title;
                titleInput.disabled = true;
                const name = `todo-${todoItemID}-title-input`;
                titleInput.name = name;
                titleInput.id = name;
                return titleInput;
            };
            const makeDescriptionInput = (description, todoItemID) => {
                const descriptionInput = document.createElement('input');
                descriptionInput.value = description;
                descriptionInput.disabled = true;
                const name = `todo-${todoItemID}-description-input`;
                descriptionInput.name = name;
                descriptionInput.id = name;
                return descriptionInput;
            };
            const makeTodoItemForm = (todoItem) => {
                const todoItemForm = document.createElement('form');
                todoItemForm.setAttribute('data-object-id', todoItem.objectId);

                const titleInput = makeTitleInput(todoItem.title, todoItem.objectId);
                const titleLabel = makeLabel(titleInput, 'Todo Item Title: ');
                // TODO: enable dueDateInput and dueDateLabel
                // const dueDateInput = makeDueDateInput(todoItem.dueDate, todoItem.objectId);
                // const dueDateLabel = makeLabel(dueDateInput, 'Due Date: ');
                // TODO: hide by default the below
                // TODO: make a toggle button to change whether the below is shown
                const descriptionInput = makeDescriptionInput(todoItem.description, todoItem.objectId);
                const descriptionLabel = makeLabel(descriptionInput, 'Description: ');
                // const editTodoButton = makeEditTodoButton();
                // const deleteTodoButton = makeDeleteTodoButton();

                todoItemForm.appendChild(titleLabel);
                todoItemForm.appendChild(titleInput);
                // todoItemForm.appendChild(dueDateLabel);
                // todoItemForm.appendChild(dueDateInput);
                todoItemForm.appendChild(descriptionLabel);
                todoItemForm.appendChild(descriptionInput);
                // todoItemForm.appendChild(editTodoButton);
                // todoItemForm.appendChild(deleteTodoButton);

                return todoItemForm;
            };
            const displayTodo = (todoItemForm, index) => {
                const todoListDiv = this.newTodoForm.parentNode.querySelector('.todo-list');
                if (todoListDiv.childElementCount === 0) {
                    todoListDiv.appendChild(todoItemForm);
                } else {
                    todoListDiv.insertBefore(
                        todoItemForm,
                        todoListDiv.childNodes[index]
                    );
                };
            };
            const projectObject = getParentProject();
            const newTodoItem = makeTodoItem(projectObject);
            projectObject.add(newTodoItem);
            const todoItemForm = makeTodoItemForm(newTodoItem);
            displayTodo(
                todoItemForm,
                projectObject.getIndex(newTodoItem.objectId)
            );
        });
    }
}