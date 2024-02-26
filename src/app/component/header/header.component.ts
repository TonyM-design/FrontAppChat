import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
export class HeaderComponent {
  canals: any[] = [];
  dropdownOpen: boolean = false
  constructor(public authService: AuthService, private canalService: CanalService, private router: Router, public storageService: StorageService, private navigationService: NavigationService) {
  }

  ngOnInit() {
  }


  logout() {
    console.log("déconnexion")
    this.authService.logout();
    setTimeout(() => { this.router.navigate(['']) }, 2500)
    this.dropdownOpen = false;


  }


  onClickLogin() {
    this.dropdownOpen = false;
    this.navigationService.onClickLogin();


  }
  onClickLogout() {
    this.dropdownOpen = false;
    this.navigationService.onClickLogOut();
    this.storageService.remove("userLogged")


  }
  onClickSignIn() {
    this.dropdownOpen = false;

    this.navigationService.onClickSignIn();

  }

  onClickProfil() {
    this.dropdownOpen = false;

    if (this.storageService.get("userLogged") !== undefined) {
      this.navigationService.onClickProfil();
    }

  }
  onClickHome() {
    this.dropdownOpen = false;

    this.navigationService.onClickHome();

  }

  changeCanal(canal: Canal) {
    this.dropdownOpen = false;

    this.canalService.canalUsed = canal;
    this.router.navigate(['/' + canal.id])

  }

  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

}
