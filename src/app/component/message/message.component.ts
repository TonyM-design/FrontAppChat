import { Component, Input } from '@angular/core';
import { Message } from 'src/app/entity/message';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() messageList!: Message[];
  today = new Date();


  constructor(public us: UserService) {
  }


  selectPrevMessage() {
    const currentElementInMessageListIndex = this.messageList.findIndex((element) => element === this.message);
    let prevMessage;
    if (this.messageList[currentElementInMessageListIndex] === this.message) {
      for (let i = currentElementInMessageListIndex - 1; i >= 0; i--) {
        if (this.messageList[i]) {
          prevMessage = this.messageList[i];
        }
      }
    }
    return prevMessage;
  }

  isSameDate(): any {
    const currentElementInMessageListIndex = this.messageList.findIndex((element) => element === this.message);
    let prevMessage;
    if (this.messageList[currentElementInMessageListIndex] === this.message) {
      for (let i = currentElementInMessageListIndex - 1; i >= 0; i--) {
        if (this.messageList[i]) {
          prevMessage = this.messageList[i];
          let date1 = new Date(this.message.date)
          let date2 = new Date(prevMessage.date)

          const date1Day = date1.getDate()
          const date1Month = date1.getMonth()
          const date1Year = date1.getFullYear()

          const date2Day = date2.getDate()
          const date2Month = date2.getMonth()
          const date2Year = date2.getFullYear()

          if (date1Day === date2Day
            && date1Month === date2Month
            && date1Year === date2Year) {
            return true;
          }
          else return false;
        }
      }
    }
  }




  ngOnInit() {
  }

}
