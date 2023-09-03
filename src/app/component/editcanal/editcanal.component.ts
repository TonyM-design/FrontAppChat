import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editcanal',
  templateUrl: './editcanal.component.html',
  styleUrls: ['./editcanal.component.css']
})
export class EditcanalComponent {
  canals: any[] = [];


  constructor(private cs: CanalService, private us: UserService, private ms: MessageService) {

    /* this.cs.getAllCanals().subscribe(
       (data) => {
         console.log(data)
         this.canals = data
       },
       (error) => {
         console.error('Erreur : ', error)
       }
     )*/
    /* this.canals.forEach(canal => {
       interval(100).subscribe(() =>
         this.ms.getMessagesByCanalId(canal.id).subscribe(
           (data) => {
             //   this.messagesToDisplay = data;
             // console.log(this.displayFullMessage(this.messagesToDisplay));
           },
           (error) => {
             console.error('Erreur de bdd', error);
           }
         ))
     })*/

  }

  ngOnInit(): void {
    this.cs.getAllCanals().subscribe(
      (data) => {
        console.log(data)
        this.canals = data
      },
      (error) => {
        console.error('Erreur : ', error)
      }
    )
    console.log(this.canals)
  }


}
