import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubInfoComponent } from './header-sub-info.component';

describe('HeaderSubInfoComponent', () => {
  let component: HeaderSubInfoComponent;
  let fixture: ComponentFixture<HeaderSubInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSubInfoComponent]
    });
    fixture = TestBed.createComponent(HeaderSubInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
