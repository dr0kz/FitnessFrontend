import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkoutProgramsComponent } from './profile-workout-programs.component';

describe('ProfileWorkoutProgramsComponent', () => {
  let component: ProfileWorkoutProgramsComponent;
  let fixture: ComponentFixture<ProfileWorkoutProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileWorkoutProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkoutProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
