import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/entity/user';
import { OpenspaceService } from 'src/app/service/openspace.service';

@Component({
    selector: 'app-openspace-cell-map',
    templateUrl: './openspace-cell-map.component.html',
    imports: [CommonModule],
    styleUrls: ['./openspace-cell-map.component.css']
})
export class OpenspaceCellMapComponent {
  @Input() id: number | undefined;
  @Input() indexWidth!: number;
  @Input() indexHeight!: number;
  @Input() isDeadCell: boolean = false;
  @Input() isDeskCell: boolean = false;
  @Input() assignedUser: User | undefined;
  constructor(private openSpaceService: OpenspaceService) {}

  disableCell() {
    if (this.openSpaceService.assignDeadCellIsActive) {
      this.isDeadCell = !this.isDeadCell;
      this.openSpaceService.changeCellData(this);
    }
  }
  transformToDeskCell() {
    if (this.openSpaceService.assignDeskCellIsActive) {
      this.isDeadCell = !this.isDeadCell;
      this.openSpaceService.changeCellData(this);
    }
  }

  onClickCell(){
    if (this.openSpaceService.assignDeadCellIsActive) {
      this.isDeskCell = false;
      this.isDeadCell = !this.isDeadCell;
      this.openSpaceService.changeCellData(this);
    }
    else  if (this.openSpaceService.assignDeskCellIsActive) {
      this.isDeadCell = false;
      this.isDeskCell = !this.isDeskCell;
      this.openSpaceService.changeCellData(this);
    }
  }

  clearAssignedUser() {
    this.assignedUser = undefined;
    this.openSpaceService.changeCellData(this);
  }

   returnAdjacentCellContent() {
    let adjacentCells: Array<any> = this.openSpaceService.getAdjacentCells(this.indexHeight, this.indexWidth)
    return adjacentCells
  }

}
