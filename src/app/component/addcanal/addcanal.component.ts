
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { GlobalService } from 'src/app/service/global.service';
import { ModalService } from 'src/app/service/modal.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { StorageService } from 'src/app/service/storage.service';
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


  eligibleUsersObservable = this.userService.subjectUserList.pipe(
    map(users => users.filter(user => !this.isAlreadySelected(user)))
  );
  eligibleFilteredUsers: User[] = [];


  constructor(

    public globalService: GlobalService,
    private router: Router,
    private storageService: StorageService,
    private navigationService: NavigationService,
    private authService: AuthService,

    private fb: FormBuilder,
    private cs: CanalService,
    private userService: UserService,
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
    this.form.value.isPublic = this.isPublic


  }

  /** OK
   */
  isAlreadySelected(user: User) {
    if (this.assignedUsers.size === 0) {
      return false
    }
    for (const assignedUser of this.assignedUsers) {
      if (assignedUser.name == user.name) {
        return true;
      }
    }
    return false;
  }


  assignUser(user: User) {
    console.log(this.isAlreadySelected(user))
    if (!this.assignedUsers.has(user)) {
      this.assignedUsers.add(user);
      console.log(this.assignedUsers);
      this.userService.subjectUserList.next([...this.userService.subjectUserList.value]);
    }

  }

  unassignUser(user: User) {
    if (this.assignedUsers.has(user)) {
      this.assignedUsers.delete(user)
      this.userService.subjectUserList.next([...this.userService.subjectUserList.value]);

    }
  }



  switchVisibility() {
    this.isPublic = !this.isPublic

  }

  onClick() {
    console.log(this.form.value)
    let newCanal: CanalToCreate;
    const UsersList = Array.from(this.assignedUsers)
    console.log(this.assignedUsers)
    console.log(UsersList)

    if (this.form.value.isPublic == "true") {
      console.log("création canal sans utilisateur");
      newCanal = new CanalToCreate(this.form.value.canalname, UsersList, true, this.form.value.description, 0)
    }
    else {
      console.log("création canal avec utilisateur");
      console.log(this.form.value.isPublic)


      newCanal = new CanalToCreate(this.form.value.canalname, UsersList, false, this.form.value.description, 0)
      console.log(newCanal)
    }
    console.log(newCanal)
    this.cs.createCanal(newCanal).subscribe(
      (response) => {
        console.log(response)
        console.log('Canal created successfully:', response);
        this.showAlert = true;
        setTimeout(() => { this.globalService.reloadPage() }, 2000)
        /* setTimeout(() => {
           this.modalService.close();
           this.navigationService.onClickHome();
         }, 2000)*/
      },
      (error) => {
        console.error('Error creating canal:', error);
      }
    );

  }

}
