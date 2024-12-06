import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInvitationComponent } from './contact-invitation.component';

describe('ContactInvitationComponent', () => {
  let component: ContactInvitationComponent;
  let fixture: ComponentFixture<ContactInvitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ContactInvitationComponent]
});
    fixture = TestBed.createComponent(ContactInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
