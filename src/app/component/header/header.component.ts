import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private canalService: CanalService, private router: Router) {

  }

}
