import { OpenspaceService } from 'src/app/service/openspace.service';
import { Openspace } from './../../entity/openspace';
import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OpenspaceMapCell } from 'src/app/entity/openspaceMapCell';
import { CommonModule } from '@angular/common';
import { OpenspaceCellMapComponent } from '../openspace-cell-map/openspace-cell-map.component';

@Component({
    selector: 'app-openspace-map',
    templateUrl: './openspace-map.component.html',
    styleUrls: ['./openspace-map.component.css'],
    imports: [CommonModule,OpenspaceCellMapComponent],

    standalone: true
})
export class OpenspaceMapComponent {
  scale: number = 1;
  transform: string = 'scale(1)';
  offsetX: number = 0;
  offsetY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  arrayCells: OpenspaceMapCell[][] = [];
  constructor(private openspaceService : OpenspaceService){

  }
  private heightSubscription: Subscription = new Subscription;

  private widthSubscription: Subscription = new Subscription;
  private initialMapSubscription: Subscription = new Subscription;

  ngOnInit() {
    this.heightSubscription = this.openspaceService.mapSettings.height.subscribe((value) => {
      console.log("activation subscribe")
      console.log("value : "+ value)
      this.openspaceService.generateMap(value, this.openspaceService.mapSettings.width.getValue())
    }
    )
    this.widthSubscription = this.openspaceService.mapSettings.width.subscribe((value) => {
      console.log("activation subscribe")
      console.log("value : "+ value)

      this.openspaceService.generateMap(this.openspaceService.mapSettings.height.getValue(), value)
    })

    this.initialMapSubscription = this.openspaceService.mapSettings.initialMap.subscribe(() => {
      console.log("déclenchement subscribe initialMap")
      this.arrayCells = this.openspaceService.mapSettings.initialMap.getValue()
      console.log(this.arrayCells)
    })

  }

  ngOnDestroy() {
    this.heightSubscription.unsubscribe();
    this.widthSubscription.unsubscribe();
    this.initialMapSubscription.unsubscribe();
  }
}
