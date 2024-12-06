import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceParametersToolsComponent } from './openspace-parameters-tools.component';

describe('OpenspaceParametersToolsComponent', () => {
  let component: OpenspaceParametersToolsComponent;
  let fixture: ComponentFixture<OpenspaceParametersToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceParametersToolsComponent]
});
    fixture = TestBed.createComponent(OpenspaceParametersToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
