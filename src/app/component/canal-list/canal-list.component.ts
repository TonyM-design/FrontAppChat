import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanalService } from 'src/app/service/canal.service';
import { Canal } from 'src/app/entity/canal';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { ModalService } from 'src/app/service/modal.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { LoginComponent } from '../login/login.component';
import { ModalComponent } from '../modal/modal.component';
import { CanalCardComponent } from '../canal-card/canal-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-canal-list',
    templateUrl: './canal-list.component.html',
    styleUrls: ['./canal-list.component.css'],
    imports: [CommonModule, LoginComponent, ModalComponent, CanalCardComponent]
})
export class CanalListComponent implements OnInit {
  openedCanalPropertiesId: number | null = null;
  @Output() canalEvent = new EventEmitter<number>();
  canals: Observable<Canal[]> = this.canalService.canals;

  constructor(
    public storageService: StorageService,
    private canalService: CanalService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,
    public modalService: ModalService,
    private webSocketService: WebSocketService
  ) {}

  toggleCanal(id: number) {
    this.openedCanalPropertiesId = this.openedCanalPropertiesId === id ? null : id; // Ouvre ou ferme le canal
  }

  ngOnInit(): void {
    this.canalService.setCanalList();
    console.log(this.storageService.get('userLogged'));
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    this.router.navigate(['/' + canal.id]);
    this.webSocketService.joinRoom(canal.id);
    this.messageService.subjectMessageToDisplay.next([]);
    this.messageService.messagePagesCounter = 0;
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([''], {
      relativeTo: this.route,
    });
  }
}
