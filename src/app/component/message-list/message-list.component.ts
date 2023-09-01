import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { LoginService } from 'src/app/service/login.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesToDisplay: Message[] = [];
  connectedUser: User = this.userService.userlogged;
  canalUsed: Canal = this.canalService.canalused;


  constructor(private messageService: MessageService, private loginService: LoginService, private canalService: CanalService, private userService: UserService) {
    console.log(this.canalService.canalused)
    let id: number = this.canalUsed.id; // on récupère le canal used pour filtre les messages
    console.log("CONSTRUCTOR message-list")
    console.log(this.messageService.getMessagesByCanalId(id))
    this.messageService.getMessagesByCanalId(id).subscribe(
      (messages) => { messages.forEach((message: Message) => { this.messagesToDisplay.push(message) }) }
    )
    console.log(this.messagesToDisplay.length)


    console.log(this.messagesToDisplay)
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
