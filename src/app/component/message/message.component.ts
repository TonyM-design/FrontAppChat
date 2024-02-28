import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, map, take } from 'rxjs';
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
  //plus besoin de le passer en input
  messageList: Observable<Message[]> = this.messageService.subjectMessageToDisplay;
  sameDatePrev!: boolean;
  today = new Date();
  hovered = false;

  constructor(public authService: AuthService, public messageService: MessageService, public userService: UserService, public router: Router, public storageService: StorageService) {
  }

  async ngOnInit() {
    this.modifyIfSerializedId(this.message);
    await this.isSameDate()
  }

  onMouseEnter(): void {
    this.hovered = !this.hovered;
  }

  respondTo() {
    this.messageService.subjectMessageToRespond.next(this.message)
    this.router.navigate(['/' + this.message.canal.id], { fragment: 'addMessage' })
    // link work but no scroll to anchor -> manual scroll
    const elementToScroll = document.getElementById("addMessage")
    elementToScroll?.scrollIntoView({ behavior: "smooth" })
  }

  async selectPrevMessage() {
    const messageList = this.messageService.subjectMessageToDisplay.getValue()
    const currentElementInMessageListIndex: number = this.messageService.subjectMessageToDisplay.getValue().findIndex((element) => element === this.message);
    const prevMessage = messageList[currentElementInMessageListIndex - 1];

    return prevMessage;
  }

  async isSameDate() {
    const prevMessage = await this.selectPrevMessage()
    if (prevMessage !== undefined && prevMessage !== null) {
      const date1 = new Date(this.message.date);
      const date2 = new Date(prevMessage.date);

      const date1Day = date1.getDate();
      const date1Month = date1.getMonth();
      const date1Year = date1.getFullYear();

      const date2Day = date2.getDate();
      const date2Month = date2.getMonth();
      const date2Year = date2.getFullYear();

      if (date1Day === date2Day
        && date1Month === date2Month
        && date1Year === date2Year) {
        this.sameDatePrev = true
      } else {
        this.sameDatePrev = false
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
    if (message.responseQuote !== null && message.responseQuote.user.id !== undefined) {
      console.log(this.message.responseQuote.user)
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
