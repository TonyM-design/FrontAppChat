import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenspaceCellMapComponent } from './openspace-cell-map.component';

describe('OpenspaceCellMapComponent', () => {
  let component: OpenspaceCellMapComponent;
  let fixture: ComponentFixture<OpenspaceCellMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OpenspaceCellMapComponent]
});
    fixture = TestBed.createComponent(OpenspaceCellMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
