import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMenuItemComponent } from './form-menu-item.component';

describe('FormMenuItemComponent', () => {
  let component: FormMenuItemComponent;
  let fixture: ComponentFixture<FormMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
