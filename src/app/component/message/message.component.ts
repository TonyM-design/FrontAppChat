import { Component, Input } from '@angular/core';
import { Message } from 'src/app/entity/message';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message !: Message;
  @Input() userlogged = this.userService.userlogged;
  constructor(private userService : UserService){

  }

}
