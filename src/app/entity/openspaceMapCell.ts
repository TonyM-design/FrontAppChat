import { User } from './user';

export class OpenspaceMapCell {
  id: number | undefined;
  indexWidth: number;
  indexHeight: number;
  isDeadCell: boolean;
  isDeskCell: boolean;
  assignedUser: User | undefined;

  constructor(
    id: number | undefined,
    indexWidth: number,
    indexHeight: number,
    isDeadCell: boolean,
    isDeskCell: boolean,
    assignedUser: User | undefined
  ) {
    this.id = id;
    this.indexWidth = indexWidth;
    this.indexHeight = indexHeight;
    this.isDeadCell = isDeadCell;
    this.isDeskCell = isDeskCell;
    this.assignedUser = assignedUser;
  }

}
