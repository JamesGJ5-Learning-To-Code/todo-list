export class Project {
    constructor({ title, objectId }) {
        this.title = title;
        this.objectId = objectId;
        this.todoList = [];
        this.nextObjectId = 0;
        this.soonestDueDate = undefined;
    }
    set soonestDueDate(value) {
        this._soonestDueDate = value;
        this.priority = (value) ? -value : Infinity;
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
}