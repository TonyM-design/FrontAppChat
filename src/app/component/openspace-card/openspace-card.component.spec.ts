import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceCardComponent } from './openspace-card.component';

describe('OpenspaceCardComponent', () => {
  let component: OpenspaceCardComponent;
  let fixture: ComponentFixture<OpenspaceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceCardComponent]
});
    fixture = TestBed.createComponent(OpenspaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
