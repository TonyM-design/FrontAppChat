import { Canal } from "./canal";

export class User {
    constructor(
        public id: number,
        public name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public assignedCanals: Canal[] | undefined,
        public viewMessages: Map<number, number> | undefined = new Map<number, number>(), // A integrer plus tard   pour chaque canalid on recupere le nombre de message préalablement vu 
        public badgeColor: string,
        public contacts?: User[],
        public contactOf?: User[]

    ) {
    }

}