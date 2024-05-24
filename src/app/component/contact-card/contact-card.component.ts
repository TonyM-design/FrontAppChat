import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { StorageService } from 'src/app/service/storage.service';
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
  userLogged: User = this.storageService.get("userLogged")

  constructor(private userService: UserService, private canalService: CanalService, private storageService: StorageService, private navigationService: NavigationService) {

  }

  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  cancelDeleteContact() {
    this.openIsToDelete = false
  }

  deleteContact() {
    this.openIsToDelete = false;
    this.userService.removeContact(this.contact)
  }

  async sendMessage() {
    const existingCanalBetween = await lastValueFrom(this.canalService.searchExistingCanal(this.userLogged.id, this.contact.id))
    console.log(existingCanalBetween)
    if (existingCanalBetween) {
      this.canalService.setCanalUsed(existingCanalBetween.id)
      this.navigationService.openCanal(existingCanalBetween.id)
    }
    else {
      const newCanal = new CanalToCreate(this.contact.name, [this.userLogged, this.contact], false, "", 0)
      console.log(new Date())
      this.canalService.createCanal(newCanal).subscribe(
        (canal) => {
          this.navigationService.openCanal(canal.id)
        },
        (error) => {
          console.error('Error creating canal:', error);
        }
      );

    }
  }

}
