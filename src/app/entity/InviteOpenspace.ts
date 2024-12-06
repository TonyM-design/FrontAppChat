import { TmplAstBoundAttribute } from '@angular/compiler';
import { Openspace } from './openspace';
import { User } from './user';

export class InviteOpenspace {
  id: string;
  status: boolean;
  viewed: boolean;
  sendBy: User;
  sendTo: User;
  openspaceToJoin: Openspace;
  date: Date;

  constructor(
    id: string,
    status: boolean,
    viewed: boolean,
    sendBy: User,
    sendTo: User,
    openspaceToJoin: Openspace,
    date: Date
  ) {
    this.id = id;
    (this.status = status), (this.viewed = viewed);
    this.sendBy = sendBy;
    this.sendTo = sendTo;
    this.openspaceToJoin = openspaceToJoin;
    this.date = new Date();
  }
}
