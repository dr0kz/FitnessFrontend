import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkoutProgramComponent } from './edit-workout-program.component';

describe('EditWorkoutProgramComponent', () => {
  let component: EditWorkoutProgramComponent;
  let fixture: ComponentFixture<EditWorkoutProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkoutProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkoutProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
