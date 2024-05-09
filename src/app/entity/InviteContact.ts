import { User } from "./user";

export class InviteContact {
    constructor(
        public id: number,
        public status: boolean,
        public viewed: boolean,
        public sendBy: User,
        public sendTo: User

    ) {
    }
}