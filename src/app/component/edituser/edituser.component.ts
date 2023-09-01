import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  user?: User;
  constructor(
    public userServ: UserService,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.params['id'];
    this.userServ.getUserById(id).subscribe((data: any) => {
      this.user = data;
      if (this.user) {
        this.user.isLogged = true;
      }
    })
  }

  deconnexion() {
    if (this.user) {
      this.user.isLogged = false;
      // this.user=undefined;
      console.log('vous avez été déconnecté');
    }



  }

}
