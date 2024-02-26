import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalParamComponent } from './canal-param.component';

describe('CanalParamComponent', () => {
  let component: CanalParamComponent;
  let fixture: ComponentFixture<CanalParamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanalParamComponent]
    });
    fixture = TestBed.createComponent(CanalParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
