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

  constructor(private storageService: StorageService, private router: Router, private webSocketService: WebSocketService) {
  }
  onClickProfil() {
    if (this.storageService.get("userLogged") !== undefined) {
      this.router.navigate(['/userProfil/' + this.storageService.get("userLogged").id]);
    }
  }
  onClickSignIn() {
    this.router.navigate(['/register']);
  }
  onClickContacts() {
    this.router.navigate(['/contacts']);
  }
  onClickLogin() {
    this.router.navigate(['/login']);

  }
  onClickLogOut() {
    this.router.navigate(['']);
  }
  onClickOpenspace() {
    this.router.navigate(['/openspace']);
  }

  openCanal(canalId: number) {
    this.router.navigate(['/' + canalId])
    this.webSocketService.joinRoom(canalId)

  }

  onClickNewOpenspace(){
    this.router.navigate(['newOpenspace'])
  }
  onClickLoadOpenspace(){
    this.router.navigate(['loadOpenspace'])
  }

  onClickHome() {
    this.webSocketService.closeContactConnection()
    this.webSocketService.closeInviteConnection()
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

}
