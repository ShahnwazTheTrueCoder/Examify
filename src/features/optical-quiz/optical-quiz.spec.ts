import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpticalQuiz } from './optical-quiz';

describe('OpticalQuiz', () => {
  let component: OpticalQuiz;
  let fixture: ComponentFixture<OpticalQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpticalQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpticalQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
