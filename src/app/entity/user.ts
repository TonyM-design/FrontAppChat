export class User {
    constructor(
        public id: number,
        public name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public isLogged: boolean
    ) {
    }

}