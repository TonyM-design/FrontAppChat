import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { CanalService } from './canal.service';
import { Canal } from '../entity/canal';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private storageService: StorageService, private router: Router, private canalService: CanalService, private webSocketService: WebSocketService) {
    console.log("NAVIGATION")
  }
  onClickProfil() {
    if (this.storageService.get("userLogged") !== undefined) {
      this.router.navigate(['/userProfil/' + this.storageService.get("userLogged").id]);
    }
  }
  onClickSignIn() {
    this.router.navigate(['/register']);
  }
  onClickLogin() {
    this.router.navigate(['/login']);

  }
  onClickLogOut() {
    this.router.navigate(['']);
  }

  onClickHome() {
    this.webSocketService.closeConnection()
    this.router.navigate(['']);
  }
  onClickEditAllCanal() {
    this.router.navigate(['/edit']);
  }
  onClickEditCanal() {
    this.router.navigate(['']);
  }
  onClickAddCanal() {
    this.router.navigate(['/add']);
  }

  changeCanal(canal: Canal) {
    console.log("changeCANAL")
    this.canalService.canalUsed = canal;
    // this.webSocketService.clearChatMessageSubject()

    this.router.navigate(['/' + canal.id]);

  }
}
