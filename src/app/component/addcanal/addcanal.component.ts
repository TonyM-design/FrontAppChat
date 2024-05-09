
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, combineLatest, concatMap, distinctUntilChanged, findIndex, flatMap, forkJoin, from, map, mergeMap, of, shareReplay, switchMap, toArray } from 'rxjs';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { GlobalService } from 'src/app/service/global.service';
import { ModalService } from 'src/app/service/modal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,

  animations: [
    trigger('fadeInDownAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-10px)' // Initial position off-screen
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)' // Final position on-screen
      })),
      transition('void => *', animate('1s ease-in-out')) // Transition duration and easing
    ]),

  ]
})
export class AddcanalComponent {

  form: FormGroup;
  showAlert = false;
  isPublic: Boolean = true;
  assignedUsers: Set<User> = new Set<User>();

  eligibleUsersObservable: Observable<User[]> = this.userService.subjectUserList.pipe(
    map(users => users.filter(user => !this.isAlreadySelected(user)))
  );

  // ----- for  parallel deserialisation
  deserializedAssignedUsers: User[] = new Array()
  deserializedUsersList: User[] = new Array()
  // ------- 

  constructor(

    public globalService: GlobalService,
    private fb: FormBuilder,
    private cs: CanalService,
    public userService: UserService,
    public modalService: ModalService) {

    this.form = this.fb.group({
      canalname: ['', [Validators.required, Validators.maxLength(25)]],
      isPublic: ['true', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      autoAssign: ['', [Validators.required, Validators.minLength(5)]],
      user: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.eligibleUsersObservable.subscribe(user => {
      this.deserializedUsersList.length = 0;
      this.deserializedUsersList = user
      this.deserializedUsersList.forEach(async (user, index) => {
        this.deserializedUsersList[index] = await this.userService.deserializeUser2(user).then()
      })
    })




    this.form.value.isPublic = this.isPublic
  }

  isAlreadySelected(user: User) { // ok
    if (this.assignedUsers.size === 0) {
      return false
    }
    if (this.assignedUsers.has(user) === true) {
      return true
    }
    else if (user.id === undefined) {
      const id = (user as unknown) as number;
      for (const user of this.assignedUsers) {
        return id == user.id ? true : false
      }
    }
    return false;
  }


  async assignUser(user: User) {
    if (!this.assignedUsers.has(user)) {
      this.assignedUsers.add(user);
      const deserializedUser = await this.userService.deserializeUser2(user)
      this.deserializedAssignedUsers.push(deserializedUser)
      this.userService.subjectUserList.next([...this.userService.subjectUserList.value]);
    }

  }

  unassignUser(user: User) {
    if (this.assignedUsers.has(user)) {
      this.assignedUsers.delete(user)
      let index: number = -1;
      for (const item of this.assignedUsers) {
        index++;
        if (item === user) {
          break
        }
      }
      this.deserializedAssignedUsers.splice(index, 1)

      this.userService.subjectUserList.next([...this.userService.subjectUserList.value]);
    }
  }



  switchVisibility() {
    this.isPublic = !this.isPublic

  }

  onClick() {
    let newCanal: CanalToCreate;
    const usersList = Array.from(this.assignedUsers)
    // si user list contient des contact serialisé
    if (this.form.value.isPublic === true) {
      newCanal = new CanalToCreate(this.form.value.canalname, usersList, true, this.form.value.description, 0)
    }
    else {
      newCanal = new CanalToCreate(this.form.value.canalname, usersList, false, this.form.value.description, 0)
    }
    this.cs.createCanal(newCanal).subscribe(
      (response) => {
        this.showAlert = true;
        setTimeout(() => { this.globalService.reloadPage() }, 2000)
      },
      (error) => {
        console.error('Error creating canal:', error);
      }
    );

  }

}
