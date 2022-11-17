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
}