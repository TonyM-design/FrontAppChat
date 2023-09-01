export interface Message {
    id: number,
    user : {
        id: number,
        name : string,
        nickname : string,
        email: string,
        password : string
    },
    canal : {id:number, name:string},
    content: string,
    date : Date
}
