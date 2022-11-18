// TODO: make AllProjects and Project child classes of some parent classes
export class AllProjects {
    constructor() {
        this.projectList = [];
        this.nextObjectId = 0;
    }
    set nextObjectId(value) {
        this._nextObjectId = value;
    }
    get nextObjectId() {
        const res = this._nextObjectId;
        this.nextObjectId = res + 1;
        return res;
    }
    // TODO: write add(project) method
    add(project) {
        this.projectList.push(project);
        // TODO: when list is replaced with heap, the below shouldn't need to 
        // be called so disable it
        this.sortByPriority();
        // console.log(this.projectList);
    }
    sortByPriority() {
        this.projectList.sort((p1, p2) => p1.priority - p2.priority);
    }
}