export class Project {
    constructor({ title, objectId }) {
        this.title = title;
        this.objectId = objectId;
        this.todoList = [];
        this.nextObjectId = 0;
        this.soonestDueDate = undefined;
        this.parentAllProjects = undefined;
    }
    set title(value) {
        this._title = (value) ? value : "Nameless Project";
    }
    get title() {
        return this._title;
    }
    set soonestDueDate(value) {
        this._soonestDueDate = value;
        // console.log(this.soonestDueDate);
        this.priority = (value) ? value : -Infinity;
    }
    get soonestDueDate() {
        return this._soonestDueDate;
    }
    set priority(value) {
        const toNumber = (dateString) => {
            // dateString should be of the format "YYYY-MM-DD" (A.D., no negative 
            // years)
            const res = parseInt(dateString.replace('-', '').replace('-', ''));
            return res;
        };
        if (value === -Infinity) {
            this._priority = value;
        } else {
            const dateNumber = toNumber(value)
            this._priority = -dateNumber;
        };
        if (this.parentAllProjects) {this.parentAllProjects.sortByPriority();};
    }
    get priority() {
        return this._priority;
    }
    set nextObjectId(value) {
        this._nextObjectId = value;
    }
    get nextObjectId() {
        const res = this._nextObjectId;
        this.nextObjectId = res + 1;
        return res;
    }
    add(todoItem) {
        this.todoList.push(todoItem);
        todoItem.parentProject = this;
        this.sortByPriority();
    }
    sortByPriority() {
        this.todoList.sort((t1, t2) => t2.priority - t1.priority);
        // This method is only called when there is a TodoItem in this.todoList, 
        // so no need to add try/except code for when it is empty (in which 
        // case the below would throw an error)
        this.soonestDueDate = this.todoList[0].dueDate;
    }
    getIndex(todoItemID) {
        const index = this.todoList.findIndex(todoItem => {
            return todoItem.objectId === todoItemID;
        });
        return index;
    }
    // remove(index) {
    //     this.projectList.splice(index, 1);
    // }
    remove(index) {
        this.todoList.splice(index, 1);
        this.soonestDueDate = (this.todoList[0]) ? this.todoList[0].dueDate : undefined;
    }
}