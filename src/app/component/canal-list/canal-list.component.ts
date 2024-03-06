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

@Component({
  selector: 'app-canal-list',
  templateUrl: './canal-list.component.html',
  styleUrls: ['./canal-list.component.css']
})
export class CanalListComponent implements OnInit {


  @Output() canalEvent = new EventEmitter<number>();
  canals: Observable<Canal[]> = this.canalService.canals

  constructor(
    public storageService: StorageService,
    private canalService: CanalService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService,
    public modalService: ModalService,
    private webSocketService: WebSocketService
  ) {

  }

  ngOnInit(): void {
    this.canalService.setCanalList();

  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    this.router.navigate(['/' + canal.id])
    this.webSocketService.joinRoom(canal.id)
    this.messageService.subjectMessageToDisplay.next([])
    this.messageService.messagePagesCounter = 0;


  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload"
    this.router.navigate([''], {
      relativeTo: this.route
    })
  }
}
