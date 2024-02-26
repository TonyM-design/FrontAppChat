import { User } from './user';

export class Canal {
    id: number;
    name: string;
    users!: User[];
    isPublic: boolean;
    description: string;

    constructor(id: number, name: string, users: User[], isPublic: boolean, description: string) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.isPublic = isPublic;
        this.description = description;
    }

    static createCanalNoUser(id: number, name: string, isPublic: boolean, description: string) {
        return new Canal(id, name, [], isPublic, description);

    }
}