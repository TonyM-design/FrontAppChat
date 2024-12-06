import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceComponent } from './openspace.component';

describe('OpenspaceComponent', () => {
  let component: OpenspaceComponent;
  let fixture: ComponentFixture<OpenspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceComponent]
});
    fixture = TestBed.createComponent(OpenspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
