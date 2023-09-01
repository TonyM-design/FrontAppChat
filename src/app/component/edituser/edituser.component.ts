import { Component } from '@angular/core';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  user: User = { id: 0, name: '', nickname: '', email: '', password: '' };

  traiterValeur(valeur: any) {
    this.user = valeur;
  }

}
