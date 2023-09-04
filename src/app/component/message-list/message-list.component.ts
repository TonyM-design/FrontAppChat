import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesToDisplay: Message[] = [];
  connectedUser: User = this.userService.userlogged;
  canalUsed: Canal = this.canalService.canalUsed;

  messageList!: Message[] | null;



  constructor(private messageService: MessageService, private canalService: CanalService, private userService: UserService) {

    let id: number = this.canalUsed.id; // on récupère le canal used pour filtre les messages
    this.canalUsed = this.canalService.canalUsed
    this.messageService.getMessagesByCanalId(this.canalUsed.id).subscribe((data) =>

      this.messagesToDisplay = data
      // console.log(this.displayFullMessage(this.messagesToDisplay));

    )
  }



  ngOnInit() {

  }


  getCanalId(message: Message) {
    return message.canal;
  }


  displayFullMessage(messagelist: Message[]) {
    for (let message of messagelist) {
      console.log(message.date + " - " + message.content + " - " + message.user.id)
    }
  }



}
