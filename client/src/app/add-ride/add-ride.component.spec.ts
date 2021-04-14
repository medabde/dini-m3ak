import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRideComponent } from './add-ride.component';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
