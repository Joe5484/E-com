import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressUserComponent } from './address-user.component';

describe('AddressUserComponent', () => {
  let component: AddressUserComponent;
  let fixture: ComponentFixture<AddressUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressUserComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
