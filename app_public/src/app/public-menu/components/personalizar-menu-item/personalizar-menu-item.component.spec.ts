import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizarMenuItemComponent } from './personalizar-menu-item.component';

describe('PersonalizarMenuItemComponent', () => {
  let component: PersonalizarMenuItemComponent;
  let fixture: ComponentFixture<PersonalizarMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizarMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizarMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
