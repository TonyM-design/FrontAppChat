import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanalService } from 'src/app/service/canal.service';
import { Canal } from 'src/app/entity/canal';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-canal-list',
  templateUrl: './canal-list.component.html',
  styleUrls: ['./canal-list.component.css']
})
export class CanalListComponent implements OnInit{

canals: any[] = [];
@Output() canalEvent = new EventEmitter<number>();

constructor(
  private canalService: CanalService,
  private router : Router,
  ){

}

  ngOnInit(): void {
    interval(1000).subscribe(()=>
    this.canalService.getAllCanals().subscribe(
      (data)=>{
        this.canals = data
      },
      (error)=>{
        console.error('Erreur : ', error)
      }
    ))
  }

  changeCanal(canal: Canal) {
    console.log("ah");
    this.canalService.canalUsed=canal; // on change bien de canal, mais pas d'impact sur chat
    this.canalEvent.emit(canal.id);
    this.router.navigate(['/'+canal.id]);
 
  }
}
