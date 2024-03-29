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
    add(project) {
        this.projectList.push(project);
        this.sortByPriority();
        // console.log(this.projectList);
        project.parentAllProjects = this;
    }
    sortByPriority() {
        this.projectList.sort((p1, p2) => p2.priority - p1.priority);
        // console.log(this.projectList);
    }
    getIndex(projectID) {
        const index = this.projectList.findIndex(project => {
            return project.objectId === projectID;
        });
        return index;
    }
    remove(index) {
        this.projectList.splice(index, 1);
    }
}