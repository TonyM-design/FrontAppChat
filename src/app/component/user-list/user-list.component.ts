import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class UserListComponent implements OnInit {
users : any[] = []

constructor(private userService : UserService){}

  ngOnInit(): void {
// this.userService.getAllMessages().subscribe(
//   (data)=>{
//     this.users=data;
//   },
//   (error) =>{
//     console.error("il y a eu une erreur", error);
//   }

// )
  }

}
