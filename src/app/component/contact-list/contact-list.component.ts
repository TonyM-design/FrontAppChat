import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, concatMap, lastValueFrom, map, withLatestFrom } from 'rxjs';
import { InviteContact } from 'src/app/entity/InviteContact';
import { User } from 'src/app/entity/user';
import { InviteService } from 'src/app/service/invite.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { ContactInvitationComponent } from '../contact-invitation/contact-invitation.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
    imports: [AddContactComponent,ContactCardComponent,ContactInvitationComponent,CommonModule],

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
            transition('void => *', animate('0.3s ease-in-out'))
        ]),

    ],
    standalone: true
})
export class ContactListComponent {
  user!: User;
  contactList!: User[];

  subjectUserContactToDisplay = new BehaviorSubject<User[]>([])
  subjectUserInviteToDisplay = new BehaviorSubject<InviteContact[][]>([])

  userListCombined!: any;
  hideSearchDropdown: boolean = true;
  hideContactDropdown!: boolean;
  hideInvitDropdown!: boolean;


  constructor(private storageService: StorageService, private userService: UserService, private inviteService: InviteService, private webSocketService: WebSocketService) {
  }

  onClickHideContact() {
    this.hideContactDropdown = false;
    this.hideInvitDropdown = true
  }
  onClickHideInvit() {
    this.hideInvitDropdown = true;
  }
  onClickHideInvitAndContact(){
    this.hideInvitDropdown = !this.hideInvitDropdown;
    this.hideContactDropdown = !this.hideContactDropdown;

  }


  onClickSwitchInvit() {
    this.hideInvitDropdown = !this.hideInvitDropdown;
    this.onClickHide()

  }

  switchHideContact() {
    this.hideContactDropdown = !this.hideContactDropdown
  }
  switchHideInvit() {
    this.hideInvitDropdown = !this.hideInvitDropdown
  }

  onHideListDropdownChange(newHideListDropdownValue: boolean) {
    this.hideSearchDropdown = false
  }

  onClickHide() {
    this.hideSearchDropdown = true
  }

  //au rechargement de la page le listener re ajoute le contact alors qu'il est deja present ( se produit une seule fois )
  async listenerContact() {
    this.webSocketService.getContactSubject().subscribe((contacts: any) => {
      console.log(contacts)
      console.log('DECLENCHEMENT LISTENER CONTACT ')
      contacts.map(async (contact: any) => {
        if (this.subjectUserContactToDisplay.getValue().includes(contact) === false) {
          console.log("contact non present, rajout du contact")
          this.subjectUserContactToDisplay.next([...this.subjectUserContactToDisplay.getValue(), contact])
          console.log(this.subjectUserContactToDisplay.getValue())
          this.webSocketService.clearContactListSubject()
        }
      });
    })
  }


  // rajouter une verification de la présence de id pour eviter un null a l'initialisation
  // sinon peux etre un probleme d'initialisation, la methode est initialisé avant que le subjectToDelte soit defini et donc
  // recupere un changement d'état du a l'initialisation du subject to delete a null
  listenerContactToDelete() {
    this.webSocketService.getContactToDeleteSubject().subscribe((contactToDelete: any) => {
      console.log("declenchement Listener DELETE CONTACT")
      let newContactsList = this.subjectUserContactToDisplay.getValue()
      console.log(newContactsList)
      const toDelete: number = this.subjectUserContactToDisplay.getValue().findIndex(contact => contact.id == contactToDelete.id)
      newContactsList.splice(toDelete, 1)
      this.subjectUserContactToDisplay.next(newContactsList)
    })

  }


  listenerInvite() {
    this.webSocketService.getInviteSubject().subscribe(async (invites: any) => {
      console.log("declenchement Listener Invite")
      const receivedInvites = await lastValueFrom(this.inviteService.getReceivedInvites(this.user.id))
      const sendedInvites = await lastValueFrom(this.inviteService.getSendedInvites(this.user.id))
      this.hideInvitDropdown = false
      this.hideSearchDropdown = true
      return this.subjectUserInviteToDisplay.next([[...receivedInvites], [...sendedInvites]])
    })
  }
  listenerInviteToDelete() {
    this.webSocketService.getInviteToDeleteSubject().subscribe(async (inviteToDelete: any) => {
      console.log("declenchement Listener DELETE Invite")
      let receivedInvites = await lastValueFrom(this.inviteService.getReceivedInvites(this.user.id))
      const sendedInvites = await lastValueFrom(this.inviteService.getSendedInvites(this.user.id))
      const toDelete: number = receivedInvites.findIndex(invite => invite.id == inviteToDelete.id)
      receivedInvites.splice(toDelete, 1)
      this.hideInvitDropdown = false
      this.hideSearchDropdown = true
      return this.subjectUserInviteToDisplay.next([[...receivedInvites], [...sendedInvites]])
    })

  }

  async ngOnInit() {

    this.user = this.storageService.get("userLogged");
    this.webSocketService.joinContactRoom(this.user.id)
    this.webSocketService.joinInviteRoom(this.user.id)
    this.userListCombined = this.userService.getContactsById(this.user.id).pipe(
      withLatestFrom(this.userService.getContactOfById(this.user.id))
    ).pipe(
      map(([contacts1, contact2]) => contacts1.concat(contact2))
    ).subscribe(list => {
      this.subjectUserContactToDisplay.next(list)
    });

    const receivedInvites = await lastValueFrom(this.inviteService.getReceivedInvites(this.user.id))
    const sendedInvites = await lastValueFrom(this.inviteService.getSendedInvites(this.user.id))
    this.subjectUserInviteToDisplay.next([[...receivedInvites], [...sendedInvites]])

    this.listenerContact()
    this.listenerContactToDelete()
    this.listenerInvite()
    this.listenerInviteToDelete()
    this.hideContactDropdown = false;
    this.hideInvitDropdown = true
  }

}
