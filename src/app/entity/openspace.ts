import { User } from "./user";

export class Openspace{
  id: string;
  name: string;
  usersGroup!: User[][];
  date: Date;
  password: string;
  constructor(id: string, name: string, users: User[][], date: Date, password: string){
    this.id = id;
    this.name = name;
    this.usersGroup = users;
    this.date = date;
    this.password =  password;
  }
  static createOpenspaceNoUser(id: string, name: string, date: Date, password: string){
    return new Openspace(id, name, [], date, password);
  }
}
