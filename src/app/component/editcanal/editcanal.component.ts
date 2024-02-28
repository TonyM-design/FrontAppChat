import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-editcanal',
  templateUrl: './editcanal.component.html',
  styleUrls: ['./editcanal.component.css']
})
export class EditcanalComponent {
  canals = this.canalService.subjectCanalList.asObservable();
  assignedUser: Set<User> | undefined;


  constructor(private canalService: CanalService, private userService: UserService, private messageService: MessageService, public modalService: ModalService) {

  }
  ngOnInit(): void {
  }

  onClickDelete(id: number) {
    this.canalService.deleteCanal(id)
  }

  getUserByCanal(i: number) {
    let usersInCurrentCanal: Set<any> = new Set();
    let messagesInCurrentCanal = this.messageService.getMessagesByCanalId(i);

    messagesInCurrentCanal.forEach((data) => {
      data.forEach((elem) => {
        usersInCurrentCanal.add(elem.user);
      });
    });
    return usersInCurrentCanal;
  }

  switchCanalIsPublic(canal: Canal) {
    canal.isPublic = !canal.isPublic
  }

  saveCanalChanges(canalToSave: Canal) {
    this.canalService.updateCanal(canalToSave).pipe(take(1)).subscribe(updatedCanal => {
      alert("mise a jour canal")
    })
  }







}
