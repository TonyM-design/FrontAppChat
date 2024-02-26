import { Component } from '@angular/core';
import { User } from 'src/app/entity/user';
import { ModalService } from 'src/app/service/modal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user-to-canal',
  templateUrl: './add-user-to-canal.component.html',
  styleUrls: ['./add-user-to-canal.component.css']
})
export class AddUserToCanalComponent {
  assignedUsers: Set<User> = new Set<User>();
  eligibleUsers = this.userService.subjectUserList.asObservable();

  constructor(private userService: UserService, public modalService: ModalService) {

  }

  assignUser(user: User) {
    if (!this.assignedUsers.has(user)) {
      this.assignedUsers.add(user);
      console.log(this.assignedUsers);
    }
  }
  unassignUser(user: User) {
    if (this.assignedUsers.has(user)) {
      this.assignedUsers.delete(user)
    }
  }
  onClick() { }

}
