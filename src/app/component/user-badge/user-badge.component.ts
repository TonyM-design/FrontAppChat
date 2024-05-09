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
  @Input() user!: any;
  @Input() index!: number;
  @Input() height: number = 25;
  @Input() width: number = 25;

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
    const prefixParts: string[] = emailParts[0].split('.')
    let initials = ""
    prefixParts.forEach(str => {
      initials += str[0]
    })
    return initials
  }

  badgeStyle(): { [key: string]: string } {
    const backgroundColor: string = this.user.badgeColor;
    return {
      zIndex: this.index?.toString(),
      width: this.width + 'px',
      height: this.height + 'px',
      backgroundColor,
      marginLeft: '-12px'
    };
  }
  pillsStyle(): { [key: string]: string } {
    return {
      zIndex: "10",
      width: this.width / 3 + 'px',
      height: this.height / 3 + 'px',
      marginLeft: this.height > 25 ? "18px" : "6px"
    };
  }

}
