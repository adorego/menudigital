import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHelperComponent } from './question-helper.component';

describe('QuestionHelperComponent', () => {
  let component: QuestionHelperComponent;
  let fixture: ComponentFixture<QuestionHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
