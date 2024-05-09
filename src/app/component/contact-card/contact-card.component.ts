import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
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

  ]
})
export class ContactCardComponent {
  @Input() contact!: User;
  dropdownOpen: boolean = false;
  openIsToDelete: boolean = false;

  constructor(private userService: UserService) {

  }

  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  cancelDeleteContact() {
    this.openIsToDelete = false
  }

  deleteContact() {
    this.openIsToDelete = true;
    //this.userService.removeContact(this.contact)
  }

}
