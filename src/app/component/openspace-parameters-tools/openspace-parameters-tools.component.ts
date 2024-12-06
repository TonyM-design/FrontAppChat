import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenspaceService } from 'src/app/service/openspace.service';
import { OpenspaceMapComponent } from '../openspace-map/openspace-map.component';

@Component({
    selector: 'app-openspace-parameters-tools',
    templateUrl: './openspace-parameters-tools.component.html',
    styleUrls: ['./openspace-parameters-tools.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, OpenspaceMapComponent]
})
export class OpenspaceParametersToolsComponent {
  form: FormGroup;
  valueHeight: number = 0; // Valeur initiale
  valueWidth: number = 0; // Valeur initiale
  valueDesk: number = 0; // Valeur initiale
  valueName: string = '';
  maskedStatus: boolean = true;
  isOpen!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private openspaceService: OpenspaceService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      Heigth: ['', [Validators.required, Validators.min(1)]],
      Width: ['', [Validators.required, Validators.min(1)]],
      DeskNumber: ['', [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit() {
    this.router.url.includes('newOpenspace') ? (this.isOpen = true) : false;
    this.router.url.includes('newOpenspace')
      ? (this.maskedStatus = false)
      : true;
  }

  onClickName() {
    this.maskedStatus = false;
  }
  onClickAddDesk() {
    this.openspaceService.assignDeadCellIsActive = false;
    this.openspaceService.assignDeskCellIsActive =
      !this.openspaceService.assignDeskCellIsActive;
  }
  onClickAddDeadCell() {
    this.openspaceService.assignDeskCellIsActive = false;
    this.openspaceService.assignDeadCellIsActive =
      !this.openspaceService.assignDeadCellIsActive;
  }

  onNumberInputChanged(newValue: number) {
    this.valueHeight = newValue;
  }

  onChangeBehaviorSubjectHeight(event: number) {
    this.openspaceService.mapSettings.height.next(event);
  }
  onChangeBehaviorSubjectWidth(event: number) {
    this.openspaceService.mapSettings.width.next(event);
  }
}
