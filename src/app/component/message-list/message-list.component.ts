import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { UserService } from 'src/app/service/user.service';
import { Observable, Subscriber, lastValueFrom, take } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';
import { ModalService } from 'src/app/service/modal.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  canalUsed!: Canal;
  messagesToDisplay: any = [];
  toDisplay: Observable<Message[]> = this.messageService.subjectMessageToDisplay
  lastMessage!: Message;
  pageCounter: number = 0;
  massagesLoaded: Boolean = false;
  @ViewChild('list', { static: false }) list!: ElementRef;

  constructor(private globalService: GlobalService, private detectorRef: ChangeDetectorRef, public webSocketService: WebSocketService, public modalService: ModalService, public messageService: MessageService, private canalService: CanalService, private userService: UserService, private router: Router, public navigationService: NavigationService) {
  }

  onScroll(event: Event) {
    const scrollPosition = (event.target as HTMLElement).scrollTop;
    this.globalService.scrollEvent.emit(scrollPosition);
  }

  async ngOnInit() {
    this.listenerMessage();
    this.initialize().then(() => {
    })
    setTimeout(() => {
      const elementToScroll = document.getElementById("artificialEnd");
      elementToScroll?.scrollIntoView({ behavior: "smooth" });
    }, 100)
  }

  ngAfterViewInit() {
    this.list.nativeElement.addEventListener('scroll', (event: Event) => {
      this.onScroll(event)
      const scrollTop = (event.target as HTMLElement).scrollTop;
      const messagesLoadedList = this.messageService.subjectMessageToDisplay.getValue()
      const currentLastMessageInView = messagesLoadedList[0]
      if (scrollTop < 1) {
        this.messageService.initializeMessageToDisplay(this.canalUsed.id).then(() => {
          const elementToScroll = document.getElementById((currentLastMessageInView.id.toString()));
          elementToScroll?.scrollIntoView();
        })
      }
    });
  }

  async initialize() {
    this.canalUsed = this.canalService.canalUsed;
    if (this.canalUsed === undefined) {
      const url = new URL(window.location.href);
      const path = url.pathname;
      const segments = path.split('/');
      const lastSegment = segments[segments.length - 1];
      const idCanal = parseInt(lastSegment);
      this.canalService.getCanalById(idCanal).pipe(take(1)).subscribe(elem => {
        this.canalUsed = elem
        this.canalService.canalUsed = elem
      })
    }
    this.webSocketService.joinRoom(this.canalUsed.id)
    for (const message of await this.messageService.initializeMessageToDisplay(this.canalUsed.id)) {
      this.messagesToDisplay.push(message)
    }
  }

  async listenerMessage() {
    this.webSocketService.getMessageSubject().subscribe((messages: any) => {
      messages.map(async (mess: any) => {
        mess.user = await lastValueFrom(this.userService.getUserById(mess.user.id))
        if (this.messageService.subjectMessageToDisplay.getValue().includes(mess) === false) {
          this.messageService.subjectMessageToDisplay.next([...this.messageService.subjectMessageToDisplay.getValue(), mess])
        }
      })
      const elementToScroll = document.getElementById("artificalEnd")
      elementToScroll?.scrollIntoView({ behavior: "smooth" })
    });
  }

  onClickPrevPage() {
    this.messageService.subjectMessageToDisplay.next([]);
    let toRemove = this.modalService.modals.find(modal => modal.id === "createCanalModal");
    if (toRemove) {
      this.modalService.remove(toRemove);
    }
    this.navigationService.onClickHome();
  }

  getCanalId(message: Message) {
    return message.canal;
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    this.router.navigate(['/' + canal.id])

  }

  ngOnDestroy() {
  }

}
