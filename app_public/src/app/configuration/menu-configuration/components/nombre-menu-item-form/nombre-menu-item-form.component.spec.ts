import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreMenuItemFormComponent } from './nombre-menu-item-form.component';

describe('NombreMenuItemFormComponent', () => {
  let component: NombreMenuItemFormComponent;
  let fixture: ComponentFixture<NombreMenuItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NombreMenuItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreMenuItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
