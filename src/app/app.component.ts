import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chathttp';

  constructor(private userService: UserService, private storageService: StorageService, private authService: AuthService) { }
  ngOnInit() {
    console.log(this.storageService.get("userLogged"));

  }



}
