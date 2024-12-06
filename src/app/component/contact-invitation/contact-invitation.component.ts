import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, combineLatest, concatMap, lastValueFrom, take } from 'rxjs';
import { InviteContact } from 'src/app/entity/InviteContact';
import { User } from 'src/app/entity/user';
import { InviteService } from 'src/app/service/invite.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { UserBadgeComponent } from '../user-badge/user-badge.component';

@Component({
    selector: 'app-contact-invitation',
    templateUrl: './contact-invitation.component.html',
    styleUrls: ['./contact-invitation.component.css'],
    imports: [CommonModule, UserBadgeComponent],
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
        trigger('AcceptInvite', [
            state('void', style({
                opacity: 1,
            })),
            state('from-opacity-100', style({
                opacity: 1
            })),
            state('to-opacity-50', style({
                opacity: 0.5,
            })),
            state('to-opacity-0', style({
                opacity: 0,
            })),
            transition('void => from-opacity-100', animate('0.1s ease-in')),
            transition('from-opacity-100 => to-opacity-50', animate('0.2s ease-in-out')),
            transition('to-opacity-50 => to-opacity-0', animate('0.1s ease-out')) // Animate to final state
        ])
    ]
})
export class ContactInvitationComponent {
  @Input() contact!: User;
  @Input() invite!: InviteContact;
  dropdownOpen: boolean = false;
  toDelete: boolean = false
  accepted: boolean = false
  loggedUser: User = this.storageService.get("userLogged")

  constructor(private inviteService: InviteService, private storageService: StorageService, private userService: UserService) {

  }

  async ngOnInit() {
    console.log(this.invite)
    console.log(typeof (this.invite.sendBy))
    if (typeof (this.invite.sendBy) == "number") {
      const deserializedUser = await lastValueFrom(this.userService.getUserById(this.invite.sendBy))
      this.invite.sendBy = deserializedUser
    }
  }

  onClickViewInvite() { // ok
    const inviteUpdated = this.invite
    inviteUpdated.viewed = true;
    this.inviteService.updateInvite(inviteUpdated)
  }

  onClickAcceptInvite() {

    this.inviteService.acceptInvite((this.storageService.get("userLogged")).id, this.contact, this.invite)
    this.inviteService.deleteInvite(this.invite)
    this.toDelete = true


  }
  onClickRejectInvite() {
    this.toDelete = true
    this.inviteService.deleteInvite(this.invite)
  }

  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  calculateCSSClasses() {
    const bgColor = this.toDelete ? 'lime-400' : 'white'

    return `
      bg-${bgColor},
      'btn-primary': true,
      'btn-extra-class': this.stateFlag
    `;
  }


}
