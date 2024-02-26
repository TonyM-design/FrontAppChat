import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Message } from 'src/app/entity/message';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message-quote',
  templateUrl: './message-quote.component.html',
  styleUrls: ['./message-quote.component.css']
})
export class MessageQuoteComponent {
  @Input() messageInput: any;
  messageSubject = this.messageService.subjectMessageToRespond.getValue()

  message = this.messageService.subjectMessageToRespond.getValue();


  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
  }

  messageStyle(): { [key: string]: string } {
    // "+33" -> opacity 20% for hex color values 
    const backgroundColor: string = this.messageInput.user.badgeColor + "33";
    return {
      backgroundColor
    };
  }

  messageStyleOriginal(message: Message): { [key: string]: string } {
    // "+33" -> opacity 20% for hex color values 
    const backgroundColor: string = message.user.badgeColor + "33";
    return {
      backgroundColor
    };
  }

}
