import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalHomeComponent } from './canal-home.component';

describe('CanalHomeComponent', () => {
  let component: CanalHomeComponent;
  let fixture: ComponentFixture<CanalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanalHomeComponent]
    });
    fixture = TestBed.createComponent(CanalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
