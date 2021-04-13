import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionHelperComponent } from './expansion-helper.component';

describe('ExpansionHelperComponent', () => {
  let component: ExpansionHelperComponent;
  let fixture: ComponentFixture<ExpansionHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
