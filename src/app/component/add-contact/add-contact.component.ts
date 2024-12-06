import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError, combineLatest, filter, from, lastValueFrom, map, of, startWith, switchMap, take, tap, throwError, toArray } from 'rxjs';
import { InviteContact } from 'src/app/entity/InviteContact';
import { User } from 'src/app/entity/user';
import { InviteService } from 'src/app/service/invite.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    animations: [
        trigger('fadeInDownAnimation', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(-10px)'
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('void => *', animate('0.3s ease-in-out'))
        ]),
        trigger('fadeInTopAnimation', [
            state('void', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('*', style({
                opacity: 0,
                transform: 'translateY(-10px)'
            })),
            transition('void => *', animate('0.2s ease-in-out'))
        ]),
    ]
})
export class AddContactComponent {
  @Input() user!: User;
  @Input() hideListDropdown: boolean = true;
  @Output() hideListDropdownChange = new EventEmitter<boolean>();
  // observable du behavior subject contient tout les utilisateurs dispo
  contactListObservable: Observable<User[]> = this.userService.subjectUserList.pipe();
  rawUserList: Observable<User[]> = this.userService.getAllUSers().pipe()

  // gestion du input
  searchControl!: FormControl

  // combined observable -> link bwn
  contactsSuggests: any



  hideAddOptionDropdown!: boolean[]

  constructor(private formBuilder: FormBuilder, private userService: UserService, private storageService: StorageService, private inviteService: InviteService, private webSocketService: WebSocketService) {

  }

  ngOnInit() {
    this.initFormSearch();
    this.initObservable();
    this.closeAddOptionDropdown();
  }

  async sendInvite(sendTo: User) {
    console.log("declenchement sendInvite")
    let newInvite = new InviteContact(NaN, false, false, this.user, sendTo);

    this.inviteService.createInvite(newInvite);

  }

  addNewContact(newContact: User) {
    const RawContact = lastValueFrom(this.rawUserList).then(
      rawList => {
        rawList.find((rawUser: { id?: number; }) => this.compareSerializedUser(rawUser, newContact))
      }
    )
    this.user.contacts?.push(newContact)
    if (this.user) {
      this.userService.updateUser(this.user)
        .pipe(
          take(1),
          switchMap((updatedUser: User) => {
            this.user = updatedUser;
            this.storageService.set("userLogged", updatedUser)
            alert('CONTACT AJOUTE : ' + newContact.name);
            return of(updatedUser);
          }),
          catchError(error => {
            alert('Il y a eu une erreur pendant la mise à jour.');
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  openAddOptionDropdown(index: number) {
    this.hideAddOptionDropdown = new Array(this.contactsSuggests.length).fill(false);
    this.hideAddOptionDropdown[index] = true;
  }
  closeAddOptionDropdown() {
    this.hideAddOptionDropdown = new Array(this.contactsSuggests.length).fill(false);
  }

  openListDropdown() {
    console.log("TEST openListDropdown")
    this.hideListDropdown = false
    this.hideListDropdownChange.emit(this.hideListDropdown);
    console.log(this.hideListDropdown)
  }


  compareSerializedUser(serializedUser: { id?: number; }, user: User): boolean {
    return serializedUser.id === user.id;
  }

  private initFormSearch() {
    this.searchControl = this.formBuilder.control('')
  }

  private initObservable() {
    // test ok
    const searchControlObservable = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      map(value => (value as String).toLowerCase()),
    );
    console.log("init observable " + lastValueFrom(searchControlObservable))
    const userContactListObservable: Observable<User[]> = this.userService.getContactsById(this.user.id).pipe()

    this.contactsSuggests = combineLatest([
      searchControlObservable,
      this.contactListObservable,
      userContactListObservable
    ]).pipe(
      map(([search, usersList, userContactList]) => {
        const searchFilteredUsers = usersList.filter((user: { name?: String; }) => user?.name?.toLowerCase().includes(search as string));
        const prefilteredUsers = searchFilteredUsers.filter((user: { name?: String; id?: number }) => !userContactList.some(contact => contact.id === user.id));
        const filteredUsers = prefilteredUsers.filter((user: { id?: number }) => user.id !== this.user.id);
        return filteredUsers;
      }), tap(filteredUsers => console.log('Liste d\'utilisateurs après filtrage par recherche : ', filteredUsers)),
    )
  }
}
