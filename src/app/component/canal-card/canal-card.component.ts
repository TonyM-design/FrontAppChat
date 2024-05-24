import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { Message } from 'src/app/entity/message';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-canal-card',
  templateUrl: './canal-card.component.html',
  styleUrls: ['./canal-card.component.css']
})
export class CanalCardComponent {
  @Input() canal!: Canal;
  lastMessage!: Message | undefined;
  messageListLength!: number;
  usersInCanal!: User[];
  subscription!: Subscription;
  canalPropertiesIsOpen: boolean = false;
  @ViewChild('infoBloc', { static: false }) infoBloc!: ElementRef;
  @ViewChild('lastMessageBloc', { static: false }) lastMessageBloc!: ElementRef;
  canalPropertiesHeight!: number
  constructor(private messageService: MessageService, private userService: UserService, private canalService: CanalService, private navigationService: NavigationService, private webSocketService: WebSocketService) {
  }

  async ngOnInit() {
    this.usersInCanal = await lastValueFrom(this.userService.getUsersByCanalId(this.canal.id))
    this.lastMessage = await this.messageService.getLastMessageByCanalId(this.canal.id)
    this.messageListLength = (await lastValueFrom(this.messageService.getMessagesByCanalId(this.canal.id))).length

    if (typeof (this.lastMessage?.user) == "number") {
      const deserializedUser = await lastValueFrom(this.userService.getUserById(this.lastMessage?.user))
      this.lastMessage.user = deserializedUser
    }
  }

  openCanalProperties() {
    this.canalPropertiesIsOpen = !this.canalPropertiesIsOpen
    console.log(this.infoBloc.nativeElement.clientHeight)
    console.log(this.lastMessageBloc.nativeElement.clientHeight)
    console.log(this.canalPropertiesHeight)
    this.canalPropertiesHeight = this.infoBloc.nativeElement.clientHeight

    //recuperer dimension infobloc
    // créer une va
  }

  messageStyle(message: Message): { [key: string]: string } {
    // "+33" -> opacity 20% for hex color values 
    const backgroundColor: string = message.user.badgeColor + "33";
    return {
      backgroundColor
    };
  }
  canalPropertieStyle(): { [key: string]: string } {
    const height: string = this.canalPropertiesHeight + "px";
    return {
      height
    };
  }


  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    this.navigationService.openCanal(canal.id)
    this.messageService.subjectMessageToDisplay.next([])
    this.messageService.messagePagesCounter = 0;
  }
}
