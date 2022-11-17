export class TodoItem {
    constructor({ title, description, dueDate, objectId }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.objectId = objectId;
        // NOTE: not sure yet if the below will work, will have to load in date-fns  
        // and see. Below assumes that the negative of dueDate in the format it comes 
        // will be sufficient in giving this.priority a metric that is higher for 
        // dates that are closer (and thus smaller)
        this.priority = -dueDate;
    }

    // TODO: write a setter for this.dueDate that ensures that this.priority is 
    // changed accordingly
}
