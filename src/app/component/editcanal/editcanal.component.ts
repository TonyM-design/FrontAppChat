import { Component, OnInit } from '@angular/core';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-editcanal',
  templateUrl: './editcanal.component.html',
  styleUrls: ['./editcanal.component.css']
})
export class EditcanalComponent implements OnInit {

  canals: any[] = [];

  constructor(private canalService :CanalService){}

  ngOnInit(): void {
    this.canalService.getAllCanals().subscribe(
      (data)=>{
        this.canals = data
      },
      (error)=>{
        console.error('Erreur : ', error)
      }
    )
  }


  deleteCanal(canal: Canal) {
    console.log("delete canal"+canal.name);
    this.canalService.deleteCanal(canal.id);
  
  }
    

}
