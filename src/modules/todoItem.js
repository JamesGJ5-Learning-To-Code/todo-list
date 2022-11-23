export class TodoItem {
    // TODO: give default values to some of the below maybe
    constructor({ title, dueDate, description, objectId }) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.objectId = objectId;
    }
    set dueDate(value) {
        this._dueDate = value;
        this.priority = (value) ? -value: -Infinity;
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
