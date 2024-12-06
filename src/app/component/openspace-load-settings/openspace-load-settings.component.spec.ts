import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceLoadSettingsComponent } from './openspace-load-settings.component';

describe('OpenspaceLoadSettingsComponent', () => {
  let component: OpenspaceLoadSettingsComponent;
  let fixture: ComponentFixture<OpenspaceLoadSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceLoadSettingsComponent]
});
    fixture = TestBed.createComponent(OpenspaceLoadSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
