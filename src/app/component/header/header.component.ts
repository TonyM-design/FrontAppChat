import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { GlobalService } from 'src/app/service/global.service';
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
export class HeaderComponent {
  canals: any[] = [];
  dropdownOpen: boolean = false;
  hideHeader: boolean = false;
  lastScrollPosition!: number;
  @ViewChild('list', { static: false }) list!: ElementRef;

  constructor(private globalService: GlobalService, public authService: AuthService, private canalService: CanalService, private router: Router, public storageService: StorageService, private navigationService: NavigationService) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.globalService.scrollEvent.subscribe((scrollPosition) => {
      if (scrollPosition === 0) {
        this.hideHeader = false;
      }
      if (!this.hideHeader && scrollPosition > (this.lastScrollPosition || 0)) {
        this.hideHeader = true;
      } else if (this.hideHeader && scrollPosition < (this.lastScrollPosition || 0)) {
        this.hideHeader = false;
      }
      this.lastScrollPosition = scrollPosition;
    });
  }

  logout() {
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
