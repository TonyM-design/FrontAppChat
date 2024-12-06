import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceMapComponent } from './openspace-map.component';
import { OpenspaceCellMapComponent } from '../openspace-cell-map/openspace-cell-map.component';

describe('OpenspaceMapComponent', () => {
  let component: OpenspaceMapComponent;
  let fixture: ComponentFixture<OpenspaceMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceMapComponent,OpenspaceCellMapComponent]
});
    fixture = TestBed.createComponent(OpenspaceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
