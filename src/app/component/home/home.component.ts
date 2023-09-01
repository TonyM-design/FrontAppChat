import { Component, Input } from '@angular/core';
import { CanalService } from 'src/app/service/canal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private userService :UserService,
    private canalService : CanalService){
    }

    @Input() userlogged = this.userService.userlogged;
    @Input() canalused = this.canalService.canalusedId;

}
