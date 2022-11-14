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
- iii) Changing TODO priority

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


# Step-by-step plan:
