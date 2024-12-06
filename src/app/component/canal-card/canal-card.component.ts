import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { Message } from 'src/app/entity/message';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { UserService } from 'src/app/service/user.service';
import { UserBadgeComponent } from '../user-badge/user-badge.component';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
    selector: 'app-canal-card',
    templateUrl: './canal-card.component.html',
    styleUrls: ['./canal-card.component.css'],
    imports: [CommonModule, UserBadgeComponent],
    animations: [
        trigger('fadeOutAnimation', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(10px)',
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(0)',
            })),
            transition('* => void', animate('0.3s ease-out')), // Animation lors de la fermeture
            transition('void => *', animate('0.3s ease-in')), // Animation lors de l'apparition
        ]),
        trigger('fadeInTopAnimation', [
            state('void', style({
                opacity: 0,
                transform: 'translateY(0)',
            })),
            state('*', style({
                opacity: 1,
                transform: 'translateY(-10px)',
            })),
            transition('void => *', animate('0.2s ease-in-out')),
        ]),
    ]
})
export class CanalCardComponent {
  @Input() canal!: Canal;
  lastMessage!: Message | undefined;
  messageListLength!: number;
  usersInCanal!: User[];
  subscription!: Subscription;
  // gestion des ouverture/fermeture canalProperties
  canalPropertiesIsOpen: boolean = false;
  @Input() openedCanalPropertiesId: number | null = null;
  @Output() toggleOpen = new EventEmitter<void>();

  @ViewChild('infoBloc', { static: false }) infoBloc!: ElementRef;
  @ViewChild('parameterBtn', { static: false }) parameterBtn!: ElementRef;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private canalService: CanalService,
    private navigationService: NavigationService
  ) {}

  async ngOnInit() {
    this.usersInCanal = await lastValueFrom(
      this.userService.getUsersByCanalId(this.canal.id)
    );
    this.lastMessage = await this.messageService.getLastMessageByCanalId(
      this.canal.id
    );
    this.messageListLength = (
      await lastValueFrom(
        this.messageService.getMessagesByCanalId(this.canal.id)
      )
    ).length;

    if (typeof this.lastMessage?.user == 'number') {
      const deserializedUser = await lastValueFrom(
        this.userService.getUserById(this.lastMessage?.user)
      );
      this.lastMessage.user = deserializedUser;
    }
  }

  openCanalProperties() {
    this.canalPropertiesIsOpen = !this.canalPropertiesIsOpen;
  }

  messageStyle(message: Message): { [key: string]: string } {
    const backgroundColor: string = message.user.badgeColor + '33';
    return {
      backgroundColor,
    };
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    this.navigationService.openCanal(canal.id);
    this.messageService.subjectMessageToDisplay.next([]);
    this.messageService.messagePagesCounter = 0;
  }
}
