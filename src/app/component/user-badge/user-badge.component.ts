import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})
export class UserBadgeComponent {
  @Input() user!: User;
  @Input() index!: number;
  userInitials!: string

  constructor(private userService: UserService) {

  }

  async ngOnInit() {
    if (this.user.id === undefined) {
      const userToSearch = this.user as unknown
      this.user = await lastValueFrom(this.userService.getUserById(userToSearch as number))
    }
    this.userInitials = this.getUserInitials().toUpperCase()
  }

  getUserInitials() {
    const emailParts = this.user.email.split('@')
    const prefixParts = emailParts[0].split('.')
    let initials = ""
    prefixParts.forEach(str => {
      initials += str[0]
    })
    return initials
  }

  badgeStyle(): { [key: string]: string } {

    const backgroundColor: string = this.user.badgeColor;

    return {
      zIndex: this.index.toString(),
      width: '25px',
      height: '25px',
      backgroundColor,
      marginLeft: this.index > 0 ? '-12px' : '0px'
    };
  }

}
