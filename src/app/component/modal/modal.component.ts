import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Input } from '@angular/core';
import { forkJoin, lastValueFrom, map, of, switchMap } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { ModalService } from 'src/app/service/modal.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('testAnimation', [
      state('void', style({

        transform: 'translateY(-10px)' // Initial position off-screen
      })),
      state('*', style({
        transform: 'translateY(100)' // Final position on-screen
      })),
      transition('void => *', animate('1s ease-in-out')) // Transition duration and easing
    ]),

  ]
})
export class ModalComponent {
  @Input() id?: string;
  @Input() title?: string;
  canalTarget?: Canal;
  isOpen = false;
  private element: any;
  modalContainer = document.getElementById("modalContainer");
  availableUserForAssign: User[] = [];
  assignUserCheckboxStatus: boolean[] = [];
  userToAssign: User[] = [];
  canalToAdd!: Canal


  constructor(public modalService: ModalService, private el: ElementRef, private userService: UserService, private authService: AuthService, private storageService: StorageService) {
    this.element = el.nativeElement;
  }

  // GLOBAL PART FOR EACH MODAL
  ngOnInit() {
    this.element.setAttribute("hidden", true)
    if (this.modalService.modals.some(x => x.id === this.id) === false) {
      this.modalService.add(this);
      this.modalContainer?.appendChild(this.element);
    }

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    const modalIndex = this.modalService.modals.findIndex(x => x.id === this.id);
    if (modalIndex !== -1) {
      this.modalService.remove(this.modalService.modals[modalIndex]);
    }
    this.element.remove();
  }

  async open() {
    this.element.style.display = 'block';
    this.element.removeAttribute("hidden")
    this.modalContainer?.classList.add('modal-open');
    document.body.style.overflow = "hidden";
    this.isOpen = true;
    await this.initializeAssignUsersModal()
    this.modalService.modals[this.modalService.modals.indexOf(this)] = this
  }

  close() {
    this.element.style.display = 'none';
    this.modalContainer?.classList.remove('modal-open');
    this.isOpen = false;
    document.body.style.overflow = "scroll";
  }

  private modifyIfSerializedId(user: any) {
    if (user.id === undefined) {
      const id: unknown = user;
      this.userService.getUserById(id as number).subscribe((userDeserialised) => {
        user = userDeserialised;
      });
    }
  }


  // SPECIFIC PART : ASSIGN USER TO CANAL MODAL
  // filter user to assign 
  async initializeAssignUsersModal() {
    let alreadyAssignedUsers: User[] = [];
    if (this.canalTarget?.users.length !== 0) {
      this.canalTarget?.users.forEach(user => {
        alreadyAssignedUsers.push(user)
      })
    }
    let userList = await lastValueFrom(this.userService.getAllUSers());
    let deserializedUserList: User[] = [];

    for (let user of userList) {
      if (user.email === undefined) {
        let id = user as unknown
        let userDeserialised = await lastValueFrom(this.userService.getUserById(id as number))
        deserializedUserList.push(userDeserialised)
      }
      else deserializedUserList.push(user)

    }


    const filteredUserList = deserializedUserList.filter((user: { id: number; }) => {
      return !alreadyAssignedUsers.some(assignedUser => assignedUser.id === user.id);
    })
    return this.availableUserForAssign = filteredUserList
  }

  getUsersToAssign() {
    this.userToAssign.length = 0
    for (let i = 0; i < this.assignUserCheckboxStatus.length; i++) {
      if (this.assignUserCheckboxStatus[i] && this.availableUserForAssign[i] !== undefined) {
        this.userToAssign.push(this.availableUserForAssign[i])
      }

    }
    this.userToAssign.forEach(user => {
      this.canalTarget?.users.push(user)
    })
    this.modalService.close();
  }




  // SPECIFIC PART : SHOW USER LIST MODAL



}
