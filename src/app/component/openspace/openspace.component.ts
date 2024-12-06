import { CommonModule } from '@angular/common';
import { OpenspaceService } from './../../service/openspace.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/entity/user';
import { NavigationService } from 'src/app/service/navigation.service';
import { OpenspaceParametersToolsComponent } from '../openspace-parameters-tools/openspace-parameters-tools.component';
import { OpenspaceLoadSettingsComponent } from '../openspace-load-settings/openspace-load-settings.component';

@Component({
    selector: 'app-openspace',
    templateUrl: './openspace.component.html',
    styleUrls: ['./openspace.component.css'],
    imports: [CommonModule, OpenspaceParametersToolsComponent, OpenspaceLoadSettingsComponent]
})
export class OpenspaceComponent {
   maxPeople! : number
   registeredUsers : User[] = []
   date : Date = new Date()

constructor(private openspaceService :OpenspaceService, private navigationService : NavigationService){}

mapSettings =
{
    height: new BehaviorSubject(0),
    width: new BehaviorSubject(0),
    initialMap: new BehaviorSubject(Array()),
    deskCells: [],
    userToDispatch: new BehaviorSubject(new Array()),

}

onClickNewOpenspace(){
this.navigationService.onClickNewOpenspace()

}

onClickLoadOpenspace(){
  this.navigationService.onClickLoadOpenspace()
}




}
