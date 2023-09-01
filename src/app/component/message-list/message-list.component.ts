import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { LoginService } from 'src/app/service/login.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private canalSubscription: Subscription = new Subscription;
messages : Message[] = [];
messagesToDisplay : Message[] = [];
loggedinUser: number=0;
canalused : number= this.canalService.canalusedId;

constructor(private messageService : MessageService,
            private loginService : LoginService,
            private canalService : CanalService
  ){}

  ngOnInit(){
   
    let id: number =this.canalused; // on récupère le canal used pour filtre les messages
    return this.messageService.getMessagesByCanalId(id).subscribe(
      (data)=>{
        this.messagesToDisplay=data;
        console.log(this.displayFullMessage(this.messagesToDisplay));
      },
      (error)=>{
              console.error('Erreur de bdd', error);
      }
    )
  }


  getCanalId(message :Message){
    return message.canal;
  }


  displayFullMessage(messagelist : Message[]){
    for (let message of messagelist){
      console.log(message.date+" - "+message.content+" - "+message.user.id)
    }
  }



}
