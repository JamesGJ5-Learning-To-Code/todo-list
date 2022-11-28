export class Project {
    constructor({ title, objectId }) {
        this.title = title;
        this.objectId = objectId;
        this.todoList = [];
        this.nextObjectId = 0;
        this.soonestDueDate = undefined;
    }
    set title(value) {
        this._title = (value) ? value : "Nameless Project";
    }
    get title() {
        return this._title;
    }
    set soonestDueDate(value) {
        this._soonestDueDate = value;
        this.priority = (value) ? -value : -Infinity;
    }
    get soonestDueDate() {
        return this._soonestDueDate;
    }
    set priority(value) {
        this._priority = value;
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
    }
    getIndex(todoItemID) {
        const index = this.todoList.findIndex(todoItem => {
            return todoItem.objectId === todoItemID;
        });
        return index;
    }
}