export class TodoItem {
    // TODO: give default values to some of the below maybe
    constructor({ title, description, dueDate, objectId }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.objectId = objectId;
    }
    set dueDate(value) {
        this._dueDate = value;
        this.priority = -value;
    }
    get dueDate() {
        return this._dueDate;
    }
    set priority(value) {
        this._priority = value;
    }
    get priority() {
        return this._priority;
    }
}
