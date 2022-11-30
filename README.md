# Suggestions from TOP

- TODOs will be objects made dynamically via classes

1. Brainstorm what kind of properties TODO-items will have.

- TODO-items MUST include:
- i) title
- ii) description
- iii) dueDate
- iv) priority
- v) Possible extras:
-- a) notes
-- b) checklist

-> OK, so as for priority, my first instinct was to give items with the nearest dueDate the highest priority. This will only be a simple application so this should be sufficient. Besides, ideally, you'd have the ability to do everything on the TODO-list, so you might as well start with the thing that must be completed soonest. This works for an MVP.
-> Later, possibly add functionality to allow the user to select priority... maybe simply the dragging of one thing above another would be best. Although it would give a little less freedom to the user, maybe one could settle for "High", "Medium" and "Low" priority buttons.
-> Maybe leave "notes" and "checklist" until later

2. TODO-list should have PROJECTS or separate listS of TODOs.

-> I like the idea of having separate, nameable lists of TODOs, since this would give the user more freedom over what the TODOs constitute.

- There should be a 'default' list to which all TODOs are put when a user first opens the app, but then onwards users should be able to create new lists and choose which projects their TODOs go into.

-> When the user has multiple lists, how do we decide which shows up by default? Well, as well as arranging TODOs by priority within each individual list, maybe we can assign each list a priority that is equal to that of its highest-priority TODO-item and automatically show that to the user when the app is opened. The logic should work when there is only one TODO list and when there are multiple.
-> However, rather than having just one TODO list show up, I think it would be great if multiple TODO lists were present equally upon opening the app, in a list of their own.
-> Might be more intelligible to refer to call the TODO-lists as projects in code--don't want to say TODO-list-list for example if listing TODO-lists, project-list sounds better.

3. Separate pieces of application logic from DOM-related logic and each other in different modules to best satisfy SOLID principles, for code maintainability etc.

- Application logic may contain:
- i) Creating new TODOs
- ii) Setting TODOs as complete
-> In a more advanced application, one might have a TODO history. In our case, we 
will simply delete a TODO when it is market as complete
- iii) Changing TODO priority
-> For now this is based on changing due date
- iv) Deleting project

4. User interface should give the user the ability to:
i) View all projects
-> Arrange by priority and show soonest dueDate in each
ii) In a high-level view of a single project, view all TODOs (each of which probably shows just title and dueDate)
iii) Expand a TODO to see/edit details
-> Details include title, description, dueDate, notes, checklist and, if using advanced logic for priority, priority too in some way--see above
iv) Delete a TODO

5. Useful for formatting and manipulating dates and times is the date-fns library (https://github.com/date-fns/date-fns), which can be accessed via npm and applied using webpack.

6. localStorage (whose docs are at https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) permits the saving of data on a user's computer.
i) Set up a function that saves projects (and TODOs) to localStorage every time a new project (or TODO) is made
ii) Write a function that looks for data in localStorage when your app is first loaded
- localStorage stores data in JSON, so may have to add methods back to your object properties once fetching them.
iii) Make sure trying to retrieve data from localStorage that isn't there doesn't crash the app


# My workflow

For now, the application logic will be split into 3 main objects:

1. For TODO-item objects (called todoItem)
- Properties:
- i) title
ADDED TO CLASS CONSTRUCTOR
- ii) description
ADDED TO CLASS CONSTRUCTOR
- iii) dueDate
ADDED TO CLASS CONSTRUCTOR
- iv) priority
ADDED TO CLASS CONSTRUCTOR
- v) objectId
ADDED TO CLASS CONSTRUCTOR

2. For project objects (called project)
- Stores TODOs
- Properties:
- i) DONE todoList (a list of references to todoItem objects in this project)
-- LATER, consider using a binary search for efficiently adding to the list.
-- References to todoItem objects with higher priorities come earlier in the list
- ii) DONE nextObjectId
- iii) DONE title
- iv) soonestDueDate (equal to soonest dueDate of objects in todoList)
- v) DONE priority (equal to priority of highest priority of objects in todoList)
- vi) DONE objectId

3. For project list object (called allProjects)
- Stores projects
- Properties:
- i) DONE projectList (a list of references to project objects)
-- LATER, consider using a binary search for efficiently adding to the list.
-- References to project objects with higher priorities come earlier in the list
- ii) DONE nextObjectId

4. For controlling the DOM (called domController)
- Properties:
-- DONE contentDiv


# DOM Layout

1. Upon opening, you just see a list of projects, laid out just as in allProjects.projectList, with a button (button#create-project) at the top for adding a new project. Within each project, unless expanded, you see only:
- i) DONE project.title
- ii) DONE project.soonestDueDate
- iii) DONE button.edit-project
- iv) DONE button.delete-project

DONE button#new-project-button
- Clicking this should:
-- i) DONE Bring up a form that allows the setting of project title
-- ii) Bring up a button.submit-project which: 
--- a) DONE Creates a project object (with a soonestDueDate of "undefined" and a priority of negative infinity) and 
DONE Puts it into its correct position in allProject.projectList, then 
DONE Puts it in the position of the DOM corresponding to that index position as a form, making sure the inputs are frozen until button.edit-project is clicked then 
DONE Resets the #new-project-form

DONE button.delete-project
- Clicking this should:
-- i) DONE Remove this project from allProjects.projectList
-- ii) DONE Remove this div.project or whatever from the DOM

DONE button.edit-project
- Clicking this should:
-- i) DONE Make the inputs editable
-- ii) DONE Bring up a button.submit-project
-- iii) DONE Edit the project object itself in allProjects.projectList
- iv) Disable the inputs again
-- LATER: allow user to click "cancel" if they don't want to save their changes

DONE button.toggle-todo-list
- Clicking this should:
-- i) DONE Toggle whether a project's todo list is expanded (unhidden) or not, by toggling class of "hidden" accordingly


2. If a project is expanded by clicking on it, you see a list of TODOs, with a button (button.createTodo) at the top for adding a new TODO. This should be made dynamically. Within each TODO you see:
- i) DONE todoObject.title
- ii) DONE todoObject.description
- iii) DONE todoObject.dueDate
- iv) DONE button.edit-todo
- v) DONE button.delete-todo

button.create-todo
- Clicking this should:
-- i) DONE Bring up a form that allows the setting of todo's title, description, dueDate
-- ii) Bring up the '#new-todo-form button' which: 
<!-- --- a) Freezes the inputs until this todo's button.edit-todo is clicked
--- b) Creates a todo object (with a priority equal to negative of dueDate in seconds, or negative infinity if a dueDate isn't selected) and puts it into its correct position in project.todoList -->
--- a) DONE Creates a TodoItem object using the values of the inputs in #new-todo-form (title, description and dueDate) and an objectId yielded by the parent Project item
--- b) DONE Puts the TodoItem object in its correct place in Project.todoList, afterwards sorting said list by priority (will have to draw inspiration from 
the methods in AllProjects and recreate them in Project)
--- c) DONE Finds the new index of said TodoItem (look up via todoID, will have to put a method in Project that allows this like in AllProjects)
--- d) DONE Creates a todoItemForm (containing with title, dueDate, description, button.edit-todo and button.delete-todo) with data-object-id as the string of the TodoItem's objectId
--- e) DONE Puts the todoItemForm into the correct position in the DOM
--- f) DONE Resets #new-todo-form (like in the reset() in the 'newProjectForm button' event listener)

button.delete-todo
- Clicking this should:
-- i) DONE Remove this TODO from project.todoList
-- ii) DONE Remove this div.todo or whatever from the DOM

button.edit-todo
- DONE Clicking this should:
-- i) DONE Make the inputs editable
-- ii) DONE Bring up the same button.submit-todo as is mentioned above
-- iii) DONE Edit the todo object itself in project.todoList
-- iv) If a todo's priority changes such that the following is necessitated then:
--- a) DONE Move it to its correct new position in project.todoList
--- b) DONE Move it to its correct new position in the DOM
-- LATER: allow user to click "cancel" if they don't want to save their changes

# Notes

- DONE DOM items (specifically for project objects and todoItem objects) should be linked to their objects by giving the DOM item and object a unique ID that can be looked for when iterating through allProjects.projectList or project.todoList; can store value in data-object-id in DOM and simply as a property of the project object or TODO object
- DONE If a TODO is created or deleted, may have to change project.soonestDueDate, which may impact project.priority. May also have to change appearance of displayed list of TODOs.
- DONE If a project.priority changes, the order of projects in the DOM may have to change (for now, just reset or something)
- DONE Creating new project might alter order of projects in DOM
- DONE Will use classes for practice
- DONE Consider adding getters and setter to classes, but only if security requires
- LATER Try to make as many class properties private as possible
- LATER Stop class methods and properties from polluting global namespace so much


# Step-By-Step Plan

1. DONE FOR NOW Write application logic for todoItem
2. DONE FOR NOW Write application logic for project
3. DONE FOR NOW Write application logic for allProjects
4. Write DOM logic
- DONE FOR NOW Give functionality to button#new-project-button
- DONE Give functionality to button.delete-project
- DONE Give functionality to button.edit-project
- DONE Make the creation of a project form result also in the creation of a 
div.todo-list which will house individual todos; div.todo-list should have class 
'hidden' by default
- DONE Make a button that will expand and close the above div.todo-list by toggling whether or not is hidden
- DONE Give functionality to the above button
- DONE Create a button for adding todos in the div.todo-list
- Give functionality to the above button
5. DONE Add a couple of projects to the DOM
6. DONE Add a couple of TODOs to each project
7. DONE Test everything
...
Last. Persistence