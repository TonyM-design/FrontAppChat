import { Component } from '@angular/core';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-header-sub-info',
  templateUrl: './header-sub-info.component.html',
  styleUrls: ['./header-sub-info.component.css']
})
export class HeaderSubInfoComponent {

  constructor(public navigationService: NavigationService) {

  }
}
