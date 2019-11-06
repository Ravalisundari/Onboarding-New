export interface IUserPermissions {
    id: string,
    displayName: string,
    category: string
}

export class UserPermissions implements IUserPermissions {

    constructor(
        public id: string,
        public displayName: string,
        public category: string) {
    }
}