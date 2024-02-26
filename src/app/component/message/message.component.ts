import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { Message } from 'src/app/entity/message';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() messageList!: Message[];
  @Input() isLastMessage!: Message;

  today = new Date();
  hovered = false;

  constructor(public authService: AuthService, public messageService: MessageService, public userService: UserService, public router: Router, public storageService: StorageService) {
  }

  ngOnInit() {
    this.modifyIfSerializedId(this.message)
  }

  onMouseEnter(): void {
    this.hovered = !this.hovered;
  }

  respondTo() {
    this.messageService.subjectMessageToRespond.next(this.message)
    this.router.navigate(['/' + this.message.canal.id], { fragment: 'addMessage' })
    // link work but no scroll to anchor -> manual scroll
    const elementToScroll = document.getElementById("addMessage")
    elementToScroll?.scrollIntoView()
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


  isSameTime() {

  }


  private modifyIfSerializedId(message: Message) {
    if (message.user.id === undefined) {
      const id: unknown = this.message.user;
      this.userService.getUserById(id as number).subscribe((user) => {
        message.user = user;
      });
    }

    if (message.responseQuote !== null) {
      console.log(this.message.responseQuote.user)
      const id: unknown = this.message.responseQuote.user;
      this.userService.getUserById(id as number).subscribe((user) => {
        message.responseQuote.user = user;
      });
    }


    return message
  }

  private modifyIfSerializedId2() {
    if (this.message.user.id === undefined) {
      const id: unknown = this.message.user;
      this.userService.getUserById(id as number).subscribe((user) => {
        this.message.user = user;
      });
    }
  }



  messageStyle(message: Message): { [key: string]: string } {
    // "+33" -> opacity 20% for hex color values 
    const backgroundColor: string = message.user.badgeColor + "33";
    return {
      backgroundColor
    };
  }


}
