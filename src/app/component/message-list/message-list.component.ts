import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { UserService } from 'src/app/service/user.service';
import { lastValueFrom, take } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';
import { ModalService } from 'src/app/service/modal.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  canalUsed!: Canal;
  messagesToDisplay: any = [];
  isLastMessage!: Message;
  pageCounter: number = 0;





  constructor(public webSocketService: WebSocketService, public modalService: ModalService, public messageService: MessageService, private canalService: CanalService, private userService: UserService, private router: Router, public navigationService: NavigationService) {

  }

  async ngOnInit() {
    await this.listenerMessage()
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
    const elementToScroll = document.getElementById("addMessage")
    elementToScroll?.scrollIntoView()
  }



  async listenerMessage() {
    console.log('LISTENER MESSAGE')
    console.log(this.webSocketService.stompClient)
    this.webSocketService.getMessageSubject().subscribe((messages: any) => {
      console.log(messages)
      messages.map(async (mess: any) => {
        if (!this.messagesToDisplay.includes(mess)) {
          mess.user = await lastValueFrom(this.userService.getUserById(mess.user.id))
          console.log(mess)
          this.messagesToDisplay.push(mess)
        }
      })
    });
    if (this.messagesToDisplay.length === undefined) {
      this.isLastMessage = await this.messageService.getLastMessageByCanalId(this.canalService.canalUsed.id)
    }
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

refresh(){
  let id: number = this.canalUsed.id; // on récupère le canal used pour filtre les messages
    this.messageService.getMessagesByCanalId(this.canalUsed.id).subscribe((data) =>

      this.messagesToDisplay = data
      // console.log(this.displayFullMessage(this.messagesToDisplay));

    )
}


}
