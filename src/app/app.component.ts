import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'chathttp';

  constructor(private userService: UserService, private storageService: StorageService, private authService: AuthService) { }
  ngOnInit() {

  }



}
