import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToCanalComponent } from './add-user-to-canal.component';

describe('AddUserToCanalComponent', () => {
  let component: AddUserToCanalComponent;
  let fixture: ComponentFixture<AddUserToCanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserToCanalComponent]
    });
    fixture = TestBed.createComponent(AddUserToCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
