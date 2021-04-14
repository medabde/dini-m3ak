import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRideComponent } from './info-ride.component';

describe('InfoRideComponent', () => {
  let component: InfoRideComponent;
  let fixture: ComponentFixture<InfoRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
