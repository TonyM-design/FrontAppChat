export class Message {
    newMessage: any;
    constructor(public id: number,
        public user: {
            id: number,
            name: string,
            nickname: string,
            email: string,
            password: string,
            badgeColor: string
        },
        public canal: { id: number, name: string },
        public content: string,
        public date: Date,
        public responseQuote: Message) {

    }

}
