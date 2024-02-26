import { Component, Input } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { Message } from 'src/app/entity/message';
import { User } from 'src/app/entity/user';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

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

  constructor(private messageService: MessageService, private userService: UserService) {
  }

  async ngOnInit() {
    this.usersInCanal = await lastValueFrom(this.userService.getUsersByCanalId(this.canal.id))
    this.lastMessage = await this.messageService.getLastMessageByCanalId(this.canal.id)
    this.messageListLength = (await lastValueFrom(this.messageService.getMessagesByCanalId(this.canal.id))).length

  }

  openCanal(canalId: number) {

  }


}
