import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenspaceMapCell } from '../entity/openspaceMapCell';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpenspaceService {
  private url = 'http://localhost:8888/openspace';

  assignDeskCellIsActive: boolean = false;
  assignDeadCellIsActive: boolean = false;

  mapSettings = {
    name: String,
    height: new BehaviorSubject(0),
    width: new BehaviorSubject(0),
    initialMap: new BehaviorSubject(Array()),
    deskCells: [],
    deadCells: [],
  };

 constructor(private http: HttpClient) {

 }

  changeCellData(newData: any) {
    console.log(newData);
    let addCell = this.mapSettings.initialMap.getValue();
    addCell[newData.indexHeight][newData.indexWidth].indexHeight = newData.indexHeight;
    addCell[newData.indexHeight][newData.indexWidth].indexWidth = newData.indexWidth;
    addCell[newData.indexHeight][newData.indexWidth].assignedUser = newData.assignedUser;
    addCell[newData.indexHeight][newData.indexWidth].isDeadCell = newData.isDeadCell;
    addCell[newData.indexHeight][newData.indexWidth].isDeskCell = newData.isDeskCell;

    this.mapSettings.initialMap.next(addCell);
  }

  saveOpenspace() {}

  dispatchDataOnMap(addCells: OpenspaceMapCell) {
    console.log('DECLENCHEMENT DISPATCHDATAONMAP() ');
    const currentValue = this.mapSettings.initialMap.getValue();
    const updatedValue = currentValue.concat(addCells);
    this.mapSettings.initialMap.next(updatedValue);
  }

  deleteDataOnMap() {
    console.log('DECLENCHEMENT DELETEONMAP() ');
    const currentValue = this.mapSettings.initialMap.getValue();
    const updatedValue = currentValue.pop();
    // this.mapSettings.initialMap.next(updatedValue);
  }


  getAdjacentCells(i: number, j: number) {
    let adjacentCells: OpenspaceMapCell[] = [];
    let currentMap = this.mapSettings.initialMap.getValue();
    currentMap[i][j - 1] === undefined ? null :  adjacentCells.push(currentMap[i][j - 1])
    currentMap[i][j + 1] === undefined ? null :  adjacentCells.push(currentMap[i][j + 1])
    currentMap[i + 1][j] === undefined ? null :  adjacentCells.push(currentMap[i + 1][j])
    currentMap[i - 1][j] === undefined ? null :  adjacentCells.push(currentMap[i - 1][j])
    currentMap[i + 1][j + 1] === undefined ? null :  adjacentCells.push(currentMap[i + 1][j + 1])
    currentMap[i - 1][j + 1] === undefined ? null :  adjacentCells.push(currentMap[i - 1][j + 1])
    currentMap[i + 1][j - 1] === undefined ? null :  adjacentCells.push(currentMap[i + 1][j - 1])
    currentMap[i - 1][j - 1] === undefined ? null :  adjacentCells.push(currentMap[i - 1][j - 1])
    return adjacentCells;
  }

  generateMap(width: number, height: number) {
    console.log('generateMap height : ' + height + 'width :' + width);
    let addCells: Array<OpenspaceMapCell[]> = [];

    for (let i = 0; i < height; i++) {
      addCells[i] = new Array(width);
      console.log(addCells[i]);
      for (let j = 0; j < width; j++) {
        addCells[i][j] = new OpenspaceMapCell(
          undefined,
          j,
          i,
          false,
          false,
          undefined
        );
      }
      console.log(addCells);
    }
    this.mapSettings.initialMap.next(addCells);
  }
}
