# Suggestions from TOP

- TODOs will be objects made dynamically via factories or constructors/classes.

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
- ii) description
- iii) dueDate
- iv) priority
- NOT made using a module

2. For project objects (called project)
- Stores TODOs
- Properties:
- i) todoList (a list of references to todoItem objects in this project)
-- LATER, consider using a heap for efficient list reordering when adding etc.
-- References to todoItem objects with higher priorities come earlier in the list
- ii) title
- iii) soonestDueDate (equal to soonest dueDate of objects in todoList)
- iv) priority (equal to priority of highest priority of objects in todoList)
- NOT made using a module

3. For project list object (called allProjects)
- Stores projects
- Properties:
- i) projectList (a list of references to project objects)
-- LATER, consider using a heap for efficient list reordering when adding etc.
- References to project objects with higher priorities come earlier in the list
- IS made using a module

4. For controlling the DOM (called domController)
- Properties:
-- contentDiv


# DOM Layout

1. Upon opening, you just see a list of projects, laid out just as in allProjects.projectList, with a button (button.createProject) at the bottom for adding a new project. Within each project, unless expanded, you see only:
- i) project.title
- ii) project.soonestDueDate
- iii) button.edit-project
- iv) button.delete-project

button#create-project
- Clicking this should:
-- i) Bring up a form that allows the setting of project title
-- ii) Bring up a button.submit-project which: 
--- a) Freezes the inputs until this project's button.edit-project is clicked
--- b) Creates a project object (with a soonestDueDate of "undefined" and a priority of negative infinity) and puts it into its correct position in allProject.projectList, updating data-index values accordingly

button.delete-project
- Clicking this should:
-- i) Remove this project from allProjects.projectList
-- ii) Remove this div.project or whatever from the DOM
-- iii) The data-index values of each div.project should be updated accordingly, so these values still correspond to the position of the represented project object in allProjects.projectList (see the library repo for inspiration)

button.edit-project
- Clicking this should:
-- i) Make the inputs editable
-- ii) Bring up the same button.submit-project as is mentioned above
-- LATER: allow user to click "cancel" if they don't want to save their changes


2. If a project is expanded by clicking on it, you see a list of TODOs, with a button (button.createTodo) at the bottom for adding a new TODO. This should be made dynamically. Within each TODO you see:
- i) todoObject.title
- ii) todoObject.description
- iii) todoObject.dueDate
- iv) button.delete-todo
- iv) button.toggle-display

button#create-todo
- Clicking this should:
-- i) Bring up a form that allows the setting of todo's title, description, dueDate
-- ii) Bring up a button.submit-todo which: 
--- a) Freezes the inputs until this todo's button.edit-todo is clicked
--- b) Creates a todo object (with a priority equal to negative of dueDate in seconds, or negative infinity if a dueDate isn't selected) and puts it into its correct position in project.todoList, updating data-index values accordingly

button.delete-todo
- Clicking this should:
-- i) Remove this TODO from project.todoList
-- ii) Remove this div.todo or whatever from the DOM
-- iii) button.edit-todo
-- iv) The data-index values of each div.todo should be updated accordingly, so these values still correspond to the position of the represented todo object in projects.todoList (see the library repo for inspiration)

button.edit-todo
- Clicking this should:
-- i) Make the inputs editable
-- ii) Bring up the same button.submit-todo as is mentioned above
-- LATER: allow user to click "cancel" if they don't want to save their changes

button.toggle-display
- Clicking this should:
-- i) Toggle whether the TODOs are hidden or not, by toggling class of "hidden" accordingly

# Notes

- Whenever anything is inserted into or removed from a list, data-index values should be updated
- If a TODO is created or deleted, may have to change project.soonestDueDate, which may impact project.priority. May also have to change appearance of displayed list of TODOs.
- If a project.priority changes, the order of projects in the DOM may have to change (for now, just reset or something)
- Creating new project might alter order of projects in DOM
- Any project and TODO creation, edit, delete may result ultimately in change of data-index values
- Will use factory functions and modules