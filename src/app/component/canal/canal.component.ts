import { Component, Input } from '@angular/core';
import { Canal } from 'src/app/entity/canal';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent {

  @Input() canal !: Canal;
}
