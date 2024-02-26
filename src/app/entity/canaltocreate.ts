import { User } from "./user";

export class CanalToCreate {
    name: string;
    users: User[] | undefined;
    isPublic: boolean;
    description: string;
    version: number = 0;

    constructor(name: string, users: User[] | undefined, isPublic: boolean, description: string, version: number) {
        this.name = name;
        this.users = users;
        this.isPublic = isPublic;
        this.description = description;
        this.version = version
    }


}