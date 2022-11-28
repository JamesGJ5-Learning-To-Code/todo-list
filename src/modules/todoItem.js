export class TodoItem {
    // TODO: give default values to some of the below maybe
    constructor({ title, dueDate, description, objectId }) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.objectId = objectId;
        this.parentProject = undefined;
    }
    set dueDate(value) {
        this._dueDate = value;
        // value is a string so priority() setter will turn it into a number so 
        // the negative of it can be calculated
        this.priority = (value) ? value : -Infinity;
    }
    get dueDate() {
        return this._dueDate;
    }
    set priority(value) {
        const toNumber = (dateString) => {
            // dateString should be of the format "YYYY-MM-DD" (A.D., no negative 
            // years)
            const res = parseInt(dateString.replace('-', '').replace('-', ''));
            return res;
        };
        const dateNumber = toNumber(value)
        this._priority = -dateNumber;
        // TODO: later, only do this if the todo is now in the wrong place, and 
        // do this via binary search for the new place, not sorting
        if (this.parentProject) {this.parentProject.sortByPriority();}
    }
    get priority() {
        return this._priority;
    }
}
